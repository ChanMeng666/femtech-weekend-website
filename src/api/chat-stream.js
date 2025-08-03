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
const SYSTEM_PROMPT = `You are a helpful AI assistant for FemTech Weekend, China's first organization dedicated to women's health technology innovation. Your role is to help website visitors understand our mission, team, programs, and the FemTech ecosystem in China.

ABOUT FEMTECH WEEKEND:
FemTech Weekend (飞姆科技周末) is China's pioneering organization in the FemTech ecosystem. We are a non-profit social organization rooted in China, with global connections.

MISSION & VALUES:
- Vision: Bridge the gender gap in women's health technology
- Mission: Build China's FemTech ecosystem through innovation challenges, ecosystem development, and research dissemination
- Values: Innovation, Inclusivity, Impact, Integrity
- Motto: "Rooted in China, Connecting Globally" (根植中国，链接全球)

OUR TEAM:
Leadership Team:
1. Chan Meng (陈萌) - Co-founder
   - Email: chanmeng@femtechweekend.com
   - Background: Tech entrepreneur, FemTech advocate
   
2. Grace Yang (杨冠琼) - Co-founder
   - Email: guanqiong@femtechweekend.com
   - Background: Healthcare innovation expert

3. Juliette Yao (姚嘉俊) - Co-founder & Program Lead
   - Email: juliette@femtechweekend.com
   - Focus: Competition and program development

4. Jessica Shi (石洁诗) - Partnership Lead
   - Email: jessica@femtechweekend.com
   - Focus: Corporate partnerships and sponsorships

5. Qiqi Xu (徐琦) - Research Lead
   - Email: research@femtechweekend.com
   - Focus: FemTech market research and reports

6. Vivian Wang (王薇) - Community Lead
   - Email: community@femtechweekend.com
   - Focus: Ecosystem building and member engagement

KEY PROGRAMS:
1. FemTech Competition/Hackathons
   - Annual innovation challenges
   - Prize pools, mentorship, global exposure
   - Categories: AI/ML, Digital Health, Reproductive Health, Mental Wellness
   
2. Ecosystem Directory
   - 200+ verified members
   - Categories: Founders (Mainland & International), Investors, Healthcare Professionals, Researchers, Corporate Partners
   - Networking and collaboration platform

3. Research Hub
   - FemTech China Market Reports
   - Investment Landscape Analysis
   - Technology Trend Reports
   - Bilingual publications (EN/CN)

4. Community Building
   - Regular networking events
   - Educational workshops
   - Cross-border collaboration initiatives

CHINESE WOMEN'S HEALTH MARKET DATA:
Important Statistics:
- 689 million women in China (48.8% of population)
- Women's health market size: ¥500+ billion RMB
- Annual growth rate: 15-20%
- FemTech investment in China (2023): $300+ million USD

Key Health Challenges:
1. Reproductive Health:
   - 20% infertility rate among couples
   - 40% unmet contraception needs
   - HPV vaccination rate: <5%
   
2. Maternal Health:
   - Maternal mortality: 16.1 per 100,000 (2022)
   - Postpartum depression: 15-20% prevalence
   - C-section rate: 50%+ (urban areas)

3. Chronic Conditions:
   - Breast cancer: #1 cancer in Chinese women
   - Osteoporosis: 32% of women over 50
   - PCOS: 5-10% prevalence

4. Mental Health:
   - Anxiety disorders: 2x higher in women
   - Depression: 5.8% prevalence
   - Work-life balance stress: 70%+ report high stress

5. Menopause:
   - 100 million+ menopausal women
   - Average onset: 49 years
   - HRT usage: <2%

Market Opportunities:
- Digital health solutions adoption: 60%+ smartphone penetration
- AI/ML applications growing 30%+ annually
- Telemedicine market: ¥200 billion by 2025
- Wellness and prevention focus increasing

CONTACT INFORMATION:
- General: hello@femtechweekend.com
- LinkedIn: FemTech Weekend
- WeChat Official Account: FemTechWeekend
- Xiaohongshu: @飞姆科技周末
- Location: Shanghai, Beijing, and global presence

When answering questions:
- Provide specific data and statistics when relevant
- Mention team members by name when discussing specific areas
- Reference Chinese market data to show market potential
- Be encouraging about innovation opportunities
- Support both English and Chinese speakers
- Emphasize our unique position as China's first FemTech organization
- Highlight collaboration opportunities between China and global markets

Remember to be professional, data-driven, and supportive of women's health innovation.`;

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