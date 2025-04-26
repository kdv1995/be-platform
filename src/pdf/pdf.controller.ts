import {
  Controller,
  UseInterceptors,
  UploadedFiles,
  Post,
  Get,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { LlmService } from 'src/llm/llm.service';
import { SupabaseService } from 'src/supabase/supabase.service';
import { PdfService } from './pdf.service';

@Controller('pdf')
export class PdfController {
  constructor(
    private readonly llmService: LlmService,
    private readonly supabaseService: SupabaseService,
    private readonly pdfService: PdfService,
  ) { }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('file'))
  async uploadFile(@UploadedFiles() file: Array<Express.Multer.File>) {
    const summary =
      (await this.llmService.summarization(file)) ?? 'No summary available';

    const normalizedFileName = this.pdfService.handleFileName(
      file[0].originalname,
    );
    const recordData = await this.supabaseService.createStorageRecord(
      'public-bucket',
      normalizedFileName,
      summary,
    );

    const filePublicUrl = this.supabaseService.getFullPath(recordData.fullPath);

    await this.supabaseService.createTableRecord(
      filePublicUrl,
      normalizedFileName,
    );

    return { summary };
  }
  @Get('history')
  async getHistory() {
    return await this.supabaseService.getLatestProccessedPDFsHistory();
  }
}
