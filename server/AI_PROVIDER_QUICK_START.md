# AI Provider System - Quick Start Guide

## 🚀 For Developers

### Using AI in Your Service

#### Step 1: Import the Factory
```javascript
const AIProviderFactory = require("../ai/AIProviderFactory");
```

#### Step 2: Get the Orchestrator
```javascript
class MyService {
  constructor() {
    this.aiProvider = AIProviderFactory.getOrchestrator();
  }
}
```

#### Step 3: Generate Responses
```javascript
async myMethod() {
  const prompt = "Your prompt here...";
  const response = await this.aiProvider.generateStructuredResponse(prompt);
  return response; // Already parsed JSON object
}
```

That's it! The orchestrator handles everything:
- Provider selection
- Automatic fallback
- Retry logic
- JSON parsing
- Error handling

---

## 📝 Prompt Guidelines

### ✅ Good Prompts
```javascript
const prompt = `
Analyze this code and return JSON with this exact structure:
{
  "quality": "Good|Fair|Poor",
  "issues": ["issue1", "issue2"],
  "suggestions": ["suggestion1"]
}

Code:
${codeToAnalyze}
`;
```

### ❌ Bad Prompts
```javascript
const prompt = "Analyze this code"; // Too vague, no structure
```

**Key Points:**
- Always specify the expected JSON structure
- Be explicit about the format
- Keep prompts under 50,000 characters
- Use clear, unambiguous language

---

## 🔧 Adding a New Provider

### Example: Adding Claude

#### 1. Create Provider Class
```javascript
// server/src/services/ai/providers/claude.provider.js
const AIProvider = require("./aiProvider");
const Anthropic = require("@anthropic-ai/sdk");
const env = require("../../../config/env");
const logger = require("../../../config/logger");
const ApiError = require("../../../utils/ApiError");
const JSONValidator = require("../utils/jsonValidator");

const MAX_RETRIES = 2;

class ClaudeProvider extends AIProvider {
  constructor() {
    super();
    this.client = new Anthropic({
      apiKey: env.CLAUDE_API_KEY,
    });
    this.model = env.CLAUDE_MODEL || "claude-3-5-sonnet-20241022";
    this.providerName = "Claude";
  }

  async generateStructuredResponse(prompt) {
    // Validation
    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      throw new ApiError(400, "Prompt cannot be empty.");
    }

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        logger.info(
          `Claude Request | Model: ${this.model} | Attempt: ${attempt}/${MAX_RETRIES}`
        );

        const response = await this.client.messages.create({
          model: this.model,
          max_tokens: 8192,
          temperature: 0.2,
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        });

        const content = response.content[0].text;

        logger.info(`Claude Finish Reason: ${response.stop_reason} | Model: ${this.model}`);

        if (!content) {
          throw new Error("Claude returned an empty response.");
        }

        // Parse and validate JSON
        const parsedResponse = JSONValidator.parseAndValidate(content);

        logger.info(`Claude JSON parsed successfully | Model: ${this.model}`);

        return parsedResponse;
      } catch (error) {
        if (error instanceof ApiError) {
          throw error;
        }

        logger.warn(
          `Claude request failed (attempt ${attempt}/${MAX_RETRIES}) | Model: ${this.model}`
        );
        logger.warn(error.message);

        if (attempt === MAX_RETRIES) {
          throw new ApiError(
            502,
            "Claude service is temporarily unavailable."
          );
        }

        await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
      }
    }
  }
}

module.exports = ClaudeProvider;
```

#### 2. Add to Orchestrator
```javascript
// server/src/services/ai/AIOrchestrator.js

const ClaudeProvider = require("./providers/claude.provider");

// In _initializeProviders() method, add:
if (env.CLAUDE_API_KEY) {
  try {
    providers.push({
      name: "Claude",
      model: env.CLAUDE_MODEL || "claude-3-5-sonnet-20241022",
      instance: new ClaudeProvider(),
      priority: 4, // After OpenRouter providers
    });
    logger.info(
      `✓ Claude Provider initialized | Model: ${env.CLAUDE_MODEL}`
    );
  } catch (error) {
    logger.warn(`✗ Claude Provider initialization failed: ${error.message}`);
  }
}
```

#### 3. Add to Environment Config
```javascript
// server/src/config/env.js

const envSchema = z.object({
  // ... existing config
  
  CLAUDE_API_KEY: z.string().optional(),
  CLAUDE_MODEL: z.string().default("claude-3-5-sonnet-20241022"),
});
```

#### 4. Update .env.example
```env
# Claude Configuration (Optional)
CLAUDE_API_KEY=your-claude-api-key
CLAUDE_MODEL=claude-3-5-sonnet-20241022
```

Done! No other changes needed. 🎉

---

## 🐛 Debugging

### Check Available Providers
```javascript
const orchestrator = AIProviderFactory.getOrchestrator();
const providers = orchestrator.getAvailableProviders();
console.log(providers);
// [
//   { name: 'Gemini', model: 'gemini-2.5-flash', priority: 1 },
//   { name: 'OpenRouter', model: 'qwen/qwen-2.5-coder-32b-instruct:free', priority: 2 },
//   ...
// ]
```

### Monitor Logs
Look for these patterns:
- `→ Attempting Provider:` - Which provider is being tried
- `✓ Success` - Successful response
- `✗ Failed` - Provider failed, moving to next
- `All AI providers failed` - Complete failure

### Common Issues

**Issue:** "No AI providers available"  
**Solution:** Check that GEMINI_API_KEY is set in .env

**Issue:** "All AI providers are currently unavailable"  
**Solution:** Check API keys are valid and have quota remaining

**Issue:** "Invalid JSON received"  
**Solution:** Review prompt format, ensure JSON structure is clear

---

## 📊 Monitoring

### Key Metrics to Track

1. **Provider Success Rate**
   ```sql
   SELECT 
     provider_name,
     COUNT(*) as total_requests,
     SUM(CASE WHEN success = true THEN 1 ELSE 0 END) as successful,
     AVG(latency_ms) as avg_latency
   FROM ai_requests
   GROUP BY provider_name
   ```

2. **Fallback Frequency**
   - How often does Gemini fail?
   - How often do we use OpenRouter?
   - What's the most common failure reason?

3. **Response Times**
   - Average latency per provider
   - P95 and P99 latencies
   - Timeout frequency

4. **Cost Analysis**
   - Requests per provider
   - Estimated cost per provider
   - Cost savings from free models

---

## 🔐 Security Notes

### API Keys
- Never commit API keys to version control
- Use environment variables only
- Rotate keys regularly
- Use different keys for development and production

### Rate Limiting
- Gemini: 15 requests per minute (free tier)
- OpenRouter: Varies by model
- Implement rate limiting at application level if needed

### Data Privacy
- Don't send PII to AI providers
- Sanitize prompts before sending
- Be aware of data retention policies

---

## 💰 Cost Optimization

### Provider Costs (Approximate)

| Provider | Model | Input | Output | Notes |
|----------|-------|-------|--------|-------|
| Gemini | gemini-2.5-flash | Free* | Free* | 15 RPM limit |
| OpenRouter | qwen/qwen-2.5-coder | Free | Free | Rate limited |
| OpenRouter | llama-3.3-70b | Free | Free | Rate limited |
| Claude | claude-3-5-sonnet | $3/MTok | $15/MTok | Paid only |
| OpenAI | gpt-4o | $2.50/MTok | $10/MTok | Paid only |

*Free tier with limits

### Optimization Tips
1. Use Gemini as primary (free)
2. Use free OpenRouter models as fallback
3. Cache responses when possible
4. Implement request deduplication
5. Monitor usage regularly

---

## 📚 References

- **Full Documentation**: `AI_PROVIDER_SYSTEM.md`
- **Implementation Guide**: `IMPLEMENTATION_SUMMARY.md`
- **Test Script**: `testAIOrchestrator.js`

---

## 🆘 Support

### Getting Help
1. Check logs for error messages
2. Review prompt format
3. Verify API keys are valid
4. Test with `testAIOrchestrator.js`
5. Check provider status pages

### Common Questions

**Q: Can I use only OpenRouter without Gemini?**  
A: No, Gemini is required as the primary provider. OpenRouter is for fallback only.

**Q: How do I add a custom model?**  
A: Follow the "Adding a New Provider" guide above.

**Q: What happens if all providers fail?**  
A: The system returns a 502 error with message: "All AI providers are currently unavailable."

**Q: Can I change the fallback order?**  
A: Yes, modify the `priority` field in `AIOrchestrator.js`.

**Q: How do I disable fallback?**  
A: Remove `OPENROUTER_API_KEY` from your `.env` file.

---

## ✅ Best Practices

1. **Always specify JSON structure in prompts**
2. **Keep prompts under 50K characters**
3. **Handle errors gracefully in your service**
4. **Log important information**
5. **Monitor provider success rates**
6. **Test fallback scenarios**
7. **Use appropriate models for tasks**
8. **Cache responses when possible**
9. **Implement rate limiting**
10. **Review costs regularly**

---

Happy coding! 🚀
