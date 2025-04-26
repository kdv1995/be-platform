import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { PdfController } from './pdf.controller';
import { LlmService } from 'src/llm/llm.service';
import { ConfigService } from '@nestjs/config';
import { SupabaseService } from 'src/supabase/supabase.service';

@Module({
  controllers: [PdfController],
  providers: [PdfService, LlmService, ConfigService, SupabaseService],
})
export class PdfModule {}
