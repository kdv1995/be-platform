import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class LlmService {
  private client: OpenAI;
  private apiKey: string;
  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('OPEN_AI_API_KEY') ?? '';
    this.client = new OpenAI({
      apiKey: this.apiKey,
    });
  }
  async summarization(file: Array<Express.Multer.File>) {
    const fl = file[0].buffer;
    const base64String = fl.toString('base64');

    const summarizationResponse = await this.client.chat.completions.create({
      model: 'gpt-4.1',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'file',
              file: {
                filename: `${file[0].originalname}`,
                file_data: `data:application/pdf;base64,${base64String}`,
              },
            },
            {
              type: 'text',
              text: `Here is a PDF document.\n\nYour task:\n- Detect the language of the document first.\n- Summarize the document in the same detected language.\n- Write a short summary in a single paragraph (5–7 sentences).\n- Focus on the main idea and the most important key points.\n- Avoid unnecessary details, numbers, or examples unless they are essential.\n- Use clear, formal, and easy-to-understand language.`,
            },
          ],
        },
      ],
    });
    return summarizationResponse.choices[0].message.content;
  }
}
