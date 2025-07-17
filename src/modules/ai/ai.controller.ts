import { Controller, Post, Body } from '@nestjs/common';
import { AIService } from './ai.service';

@Controller('ai')
export class AIController {
  constructor(private readonly aiService: AIService) {}

  @Post('suggest')
  async generate(@Body() body) {
    return this.aiService.generateCaption(body.prompt, body.description);
  }
}
