const { GoogleGenerativeAI } = require('@google/generative-ai');

// Colors for console output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m'
};

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);

// System prompt with FemTech Weekend knowledge
const SYSTEM_PROMPT = `You are a helpful AI assistant for FemTech Weekend, China's first organization focusing on women's health technology challenges. Your role is to help website visitors understand:

About FemTech Weekend:
- Pioneer organization in China's FemTech ecosystem
- Mission: Bridging the gender gap in women's health technology
- Focus: Innovation challenges, ecosystem building, and research dissemination
- Rooted in China, connecting globally

Key Programs:
1. Competition/Hackathons: Annual FemTech innovation challenges with prizes, mentorship, and global exposure
2. Ecosystem Directory: 200+ members including founders, investors, healthcare professionals, researchers
3. Research Hub: Market reports, investment insights, technology trends in women's health
4. Community Building: Connecting stakeholders across China and internationally

Important Information:
- Languages: Bilingual support (English/Chinese)
- Contact: hello@femtechweekend.com
- Categories: FemTech founders, Investors/VCs, Healthcare professionals, Researchers, Corporate partners

When answering:
- Be concise and informative
- Focus on FemTech Weekend's programs and impact
- Encourage participation and engagement
- Provide specific details when asked
- Be supportive of women's health innovation
- If asked about specific companies or members, mention they can explore the Ecosystem Directory

Remember to be professional, encouraging, and focused on promoting women's health technology innovation.`;

// Helper function to create SSE response
function createSSEResponse(res) {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  // Send initial connection message
  res.write('data: {"type":"connected"}\n\n');
  
  return {
    sendChunk: (text) => {
      const data = JSON.stringify({ type: 'chunk', content: text });
      res.write(`data: ${data}\n\n`);
    },
    sendError: (error) => {
      const data = JSON.stringify({ type: 'error', message: error });
      res.write(`data: ${data}\n\n`);
    },
    sendDone: () => {
      res.write('data: {"type":"done"}\n\n');
      res.end();
    }
  };
}

module.exports = async (req, res) => {
  console.log(`${colors.cyan}[Chat API] Received ${req.method} request${colors.reset}`);
  console.log(`${colors.cyan}[Chat API] Headers:${colors.reset}`, req.headers);
  
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    console.log(`${colors.yellow}[Chat API] Handling OPTIONS preflight${colors.reset}`);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    console.log(`${colors.red}[Chat API] Invalid method: ${req.method}${colors.reset}`);
    res.statusCode = 405;
    res.json({ error: 'Method not allowed' });
    return;
  }

  try {
    console.log(`${colors.blue}[Chat API] Processing chat request${colors.reset}`);
    console.log(`${colors.blue}[Chat API] API Key status: ${process.env.GOOGLE_GENERATIVE_AI_API_KEY ? 'Present' : 'MISSING'}${colors.reset}`);
    
    // Parse request body
    const { messages, stream = true } = req.body || {};
    console.log(`${colors.blue}[Chat API] Request body:${colors.reset}`, JSON.stringify(req.body, null, 2));
    
    if (!messages || !Array.isArray(messages)) {
      console.log(`${colors.red}[Chat API] Invalid messages format${colors.reset}`);
      res.statusCode = 400;
      res.json({ error: 'Messages array is required' });
      return;
    }
    
    console.log(`${colors.green}[Chat API] Processing ${messages.length} messages${colors.reset}`);

    // Initialize the model
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      systemInstruction: SYSTEM_PROMPT
    });

    // Filter messages to exclude system/welcome messages and prepare chat history
    // Gemini requires the first message to be from 'user', not 'model'
    const filteredMessages = messages.filter(msg => {
      // Skip welcome messages or any initial assistant messages
      if (msg.role === 'assistant' && messages.indexOf(msg) === 0) {
        console.log(`${colors.yellow}[Chat API] Skipping initial assistant message${colors.reset}`);
        return false;
      }
      return true;
    });

    // Prepare chat history (excluding the last message which is the current user input)
    const chatHistory = filteredMessages.slice(0, -1).map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    // Ensure chat history starts with a user message or is empty
    const validHistory = chatHistory.filter((msg, index) => {
      if (index === 0 && msg.role === 'model') {
        console.log(`${colors.yellow}[Chat API] Removing model message at start of history${colors.reset}`);
        return false;
      }
      return true;
    });

    console.log(`${colors.blue}[Chat API] Valid history length: ${validHistory.length}${colors.reset}`);

    // Get the latest user message
    const latestMessage = messages[messages.length - 1].content;

    // Start chat session with validated history
    const chat = model.startChat({
      history: validHistory,  // Use the validated history instead
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
        topP: 0.95,
        topK: 40
      }
    });

    if (stream) {
      // Set up SSE response
      const sse = createSSEResponse(res);
      
      try {
        // Send message and stream response
        const result = await chat.sendMessageStream(latestMessage);
        
        for await (const chunk of result.stream) {
          const text = chunk.text();
          if (text) {
            sse.sendChunk(text);
          }
        }
        
        sse.sendDone();
        console.log(`${colors.green}[Chat API] Stream completed successfully${colors.reset}`);
      } catch (streamError) {
        console.error(`${colors.red}[Chat API] Stream error:${colors.reset}`, streamError);
        sse.sendError(streamError.message);
        sse.sendDone();
      }
    } else {
      // Non-streaming response
      const result = await chat.sendMessage(latestMessage);
      const response = result.response.text();
      
      res.statusCode = 200;
      res.json({ 
        content: response,
        role: 'assistant'
      });
      
      console.log(`${colors.green}[Chat API] Response sent successfully${colors.reset}`);
    }
  } catch (error) {
    console.error(`${colors.red}[Chat API] Error:${colors.reset}`, error);
    console.error(`${colors.red}[Chat API] Stack trace:${colors.reset}`, error.stack);
    console.error(`${colors.red}[Chat API] Error details:${colors.reset}`, {
      name: error.name,
      message: error.message,
      code: error.code
    });
    
    res.statusCode = 500;
    res.json({ 
      error: 'Internal server error', 
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};