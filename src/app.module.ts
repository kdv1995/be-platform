import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PdfModule } from './pdf/pdf.module';
import { LlmModule } from './llm/llm.module';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './supabase/supabase.module';

@Module({
  imports: [PdfModule, LlmModule, ConfigModule.forRoot(), SupabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
