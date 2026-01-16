/**
 * Cloudflare Pages Function for AI chat streaming
 * Uses native fetch API to call Google Gemini API
 */

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// System prompt with FemTech Weekend knowledge
const SYSTEM_PROMPT = `You are the AI assistant for FemTech Weekend (女性健康科技周末), China's pioneering women's health technology innovation organization. You provide helpful, accurate information about our organization, mission, and the women's health innovation ecosystem in China.

## Core Identity & Mission

**FemTech Weekend** - Rooted in China, Connecting Globally
We are China's first and leading women's health innovation platform, pioneering FemTech development to drive worldwide impact.

### Our Three Pillars:
1. **🌍 Drive Women's Health Innovation**: We pioneer cutting-edge technology in women's health, breaking barriers and improving care to empower women from China
2. **💡 Amplify Women in Tech Entrepreneurship**: We create an inclusive ecosystem where every woman from China can access knowledge, capital, and support needed to succeed
3. **🚀 Ecosystem Building**: We build a thriving homegrown innovation hub while fostering cross-border collaboration, strengthening local industry-academia-investment-research ties while opening doors for worldwide knowledge exchange

## Organization Details

### Leadership Team:
- **Zhu Yihan (朱依涵)**: Founder & CEO - Expert in data, balance sheet management, and global citizenship
- **Michelle Li**: Head of Partnerships - Private equity investment and due diligence specialist
- **Leaf He**: Chief Operating Officer - Financial advisory and community building expert
- **Joji Lee**: Chief Marketing Officer - PR, consumer marketing, and events specialist
- **Chan Meng (陈萌)**: Chief Technology Officer - Senior AI/ML Infrastructure Engineer, passionate about inclusive AI for women's health
- **Lingxi Zhang**: Chief Design Officer - Animation, video editing, and storytelling specialist

### Contact Information:
- 📧 Email: hello@femtechweekend.com
- 🌐 Website: www.femtechweekend.com
- 💼 LinkedIn: linkedin.com/company/femtech-weekend
- 📱 WeChat Official Account: FemTechWeekend
- 📕 Xiaohongshu (Red): femtechweekend

## Key Programs & Initiatives

### 1. FemTech Innovation Competition
Annual competition supporting women's health startups and innovations in China, connecting entrepreneurs with investors and industry leaders.

### 2. Ecosystem Directory
Comprehensive database of FemTech companies, investors, researchers, and healthcare providers in China, facilitating connections and collaborations.

### 3. Research & Insights
Publishing reports and analysis on women's health innovation trends, market opportunities, and impact in the Chinese market.

### 4. Global Community Building
Connecting Chinese FemTech innovators with international partners, facilitating knowledge exchange and cross-border collaboration.

## Chinese Women's Health Context

### Key Statistics:
- **320 million** women employed in China (43.2% of workforce, 2022)
- **688 million** women in China (48.76% of population)
- **15-25%** of new mothers experience postpartum depression
- **40%** of Chinese women suffer from reproductive tract infections
- **70%** married women prevalence rate for gynecological conditions
- **18%** infertility rate in China (increased from 12% in 2007)
- Women control **10 trillion RMB** in annual consumer spending
- **400 million** women aged 20-60 are primary family decision-makers

## Market Insights

### FemTech Market Opportunity:
- Women's health market size: **¥500+ billion RMB**
- Annual growth rate: **15-20%**
- Digital health adoption: **60%+ smartphone penetration**
- AI/ML applications growing **30%+ annually**

### Investment Landscape:
- FemTech investment in China (2023): **$300+ million USD**
- Growing interest from both domestic and international VCs
- Government support for women's health innovation increasing

## Response Guidelines

1. **Be Informative**: Provide accurate, detailed information with specific statistics
2. **Be Inclusive**: Welcome all backgrounds and expertise levels
3. **Be Bilingual**: Respond fluently in English or Chinese based on user preference
4. **Be Professional**: Maintain knowledgeable yet approachable tone
5. **Be Action-Oriented**: Guide toward relevant resources and opportunities
6. **Be Sensitive**: Handle health topics with care and respect
7. **Be Empowering**: Emphasize opportunities and solutions

## Important Context:
- Always emphasize our dual focus: local impact in China with global connections
- Highlight the massive market opportunity (688M women, ¥500B+ market)
- Mention our role as China's FIRST FemTech organization
- Direct business inquiries to hello@femtechweekend.com

When answering questions, draw from this comprehensive knowledge base while maintaining a conversational, helpful tone that reflects FemTech Weekend's mission to empower and innovate in women's health.`;

/**
 * Create SSE formatted message
 */
function createSSEMessage(data) {
  return `data: ${JSON.stringify(data)}\n\n`;
}

/**
 * Main request handler
 */
export async function onRequest(context) {
  const { request, env } = context;

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Only allow POST
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  try {
    const body = await request.json();
    const { messages, stream = true } = body;

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Messages array is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Check for API key
    if (!env.GOOGLE_GENERATIVE_AI_API_KEY) {
      console.error('[Chat API] Missing GOOGLE_GENERATIVE_AI_API_KEY');
      return new Response(JSON.stringify({ error: 'Chat service not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Filter messages - skip initial assistant/welcome messages
    const filteredMessages = messages.filter((msg, index) => {
      if (msg.role === 'assistant' && index === 0) {
        return false;
      }
      return true;
    });

    // Convert to Gemini format
    const contents = filteredMessages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    // Ensure first message is from user
    if (contents.length > 0 && contents[0].role === 'model') {
      contents.shift();
    }

    const geminiRequestBody = {
      contents: contents,
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }]
      },
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
        topP: 0.95,
        topK: 40
      }
    };

    if (stream) {
      // Streaming response - use gemini-2.5-flash for better stability
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse&key=${env.GOOGLE_GENERATIVE_AI_API_KEY}`;

      const geminiResponse = await fetch(geminiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(geminiRequestBody),
      });

      if (!geminiResponse.ok) {
        const errorText = await geminiResponse.text();
        console.error('[Chat API] Gemini API error:', errorText);
        return new Response(JSON.stringify({
          error: 'AI service error',
          message: `Gemini API returned ${geminiResponse.status}`
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      // Create a TransformStream to convert Gemini SSE to our format
      const { readable, writable } = new TransformStream();
      const writer = writable.getWriter();
      const encoder = new TextEncoder();

      // Process the stream in the background
      (async () => {
        try {
          // Send initial connection message
          await writer.write(encoder.encode(createSSEMessage({ type: 'connected' })));

          const reader = geminiResponse.body.getReader();
          const decoder = new TextDecoder();
          let buffer = '';

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const jsonStr = line.slice(6).trim();
                if (jsonStr && jsonStr !== '[DONE]') {
                  try {
                    const data = JSON.parse(jsonStr);
                    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
                    if (text) {
                      await writer.write(encoder.encode(createSSEMessage({ type: 'chunk', content: text })));
                    }
                  } catch (e) {
                    // Skip malformed JSON
                  }
                }
              }
            }
          }

          // Send done message
          await writer.write(encoder.encode(createSSEMessage({ type: 'done' })));
        } catch (error) {
          console.error('[Chat API] Stream processing error:', error);
          await writer.write(encoder.encode(createSSEMessage({ type: 'error', message: error.message })));
        } finally {
          await writer.close();
        }
      })();

      return new Response(readable, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
          ...corsHeaders,
        },
      });

    } else {
      // Non-streaming response
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${env.GOOGLE_GENERATIVE_AI_API_KEY}`;

      const geminiResponse = await fetch(geminiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(geminiRequestBody),
      });

      if (!geminiResponse.ok) {
        const errorText = await geminiResponse.text();
        console.error('[Chat API] Gemini API error:', errorText);
        return new Response(JSON.stringify({
          error: 'AI service error',
          message: `Gemini API returned ${geminiResponse.status}`
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      const result = await geminiResponse.json();
      const responseText = result.candidates?.[0]?.content?.parts?.[0]?.text || '';

      return new Response(JSON.stringify({
        content: responseText,
        role: 'assistant'
      }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

  } catch (error) {
    console.error('[Chat API] Error:', error);
    return new Response(JSON.stringify({
      error: 'Internal server error',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}
