import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { LLM } from './prompts';

@Injectable()
export class LlmService {
  private client: OpenAI;
  private apiKey: string;
  model: string;
  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('OPEN_AI_API_KEY') ?? '';
    this.client = new OpenAI({
      apiKey: this.apiKey,
    });
    this.model = this.configService.get<string>('LLM_MODEL') ?? 'gpt-4.1';
  }

  async summarization(file: Array<Express.Multer.File>) {
    const fl = file[0].buffer;
    const base64String = fl.toString('base64');

    const summarizationResponse = await this.client.chat.completions.create({
      model: LLM.model(this.model),
      messages: LLM.summarizationPromptHandler(
        file[0].originalname,
        base64String,
      ),
    });

    return LLM.proccessedCompletionHandler(summarizationResponse);
  }
}
