import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class AIService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async generateCaption(prompt: string, description: string) {
    const result = await this.openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You write catchy social captions.' },
        { role: 'user', content: `Topic: ${prompt}\nDescription: ${description}` },
      ],
    });

    return { result: result.choices[0].message.content };
  }
}
