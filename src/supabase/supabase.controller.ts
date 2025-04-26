import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SupabaseService } from './supabase.service';
import { UpdateSupabaseDto } from './dto/update-supabase.dto';

@Controller('supabase')
export class SupabaseController {
  constructor(private readonly supabaseService: SupabaseService) {}

  @Get()
  findAll() {
    return this.supabaseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supabaseService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSupabaseDto: UpdateSupabaseDto,
  ) {
    return this.supabaseService.update(+id, updateSupabaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supabaseService.remove(+id);
  }
}
