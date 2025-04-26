import { Injectable } from '@nestjs/common';
import { UpdateSupabaseDto } from './dto/update-supabase.dto';
import { SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  supabase: SupabaseClient;
  SUPABASE_ANON_KEY: string;
  SUPABASE_URL: string;

  constructor(private readonly configService: ConfigService) {
    this.SUPABASE_ANON_KEY =
      this.configService.get<string>('SUPABASE_ANON_KEY') ?? '';
    this.SUPABASE_URL = this.configService.get<string>('SUPABASE_URL') ?? '';
    this.supabase = createClient(this.SUPABASE_URL, this.SUPABASE_ANON_KEY);
  }

  async createStorageRecord(
    bucketName: string,
    filename: string,
    content: string,
  ) {
    const bucketExists = await this.checkIfBucketExists(bucketName);

    if (!bucketExists) {
      await this.createBucket(bucketName);
    }

    const uploadedData = await this.uploadFile(filename, bucketName, content);

    return uploadedData;
  }

  async createTableRecord(url: string, title: string) {
    const { error } = await this.supabase.from('documents').insert([
      {
        title: title,
        upload_url: url,
      },
    ]);
    if (error) {
      throw new Error('Could not create table record');
    }
    return true;
  }

  async createBucket(bucketName: string) {
    const { data, error } = await this.supabase.storage.createBucket(
      bucketName,
      {
        public: true,
        allowedMimeTypes: ['application/pdf', 'application/json', 'text/plain'],
        fileSizeLimit: '3mb',
      },
    );
    if (error) {
      throw new Error('Could not create bucket');
    }

    return data;
  }

  async checkIfBucketExists(bucketName: string) {
    const { data, error } = await this.supabase.storage.listBuckets();

    if (error) {
      throw new Error('Could not fetch bucket list');
    }

    return data.some((bucket) => bucket.name === bucketName);
  }

  async uploadFile(fileName: string, bucketName: string, fileContent: string) {
    const fln = `${Date.now()}_${fileName.replace(/\.[^/.]+$/, '')}.txt`;
    const buffer = Buffer.from(fileContent);
    const { data, error } = await this.supabase.storage
      .from(bucketName)
      .upload(fln, buffer, {
        contentType: 'text/plain',
        upsert: true,
      });

    if (error) {
      throw new Error('Could not upload file');
    }

    return data;
  }

  getFullPath(fullPath: string) {
    return `${this.SUPABASE_URL}/storage/v1/object/public/${fullPath}`;
  }

  async getLatestProccessedPDFsHistory() {
    const { data, error } = await this.supabase
      .from('documents')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);
    if (error) {
      throw new Error('Could not fetch history');
    }
    return data;
  }

  findAll() {
    return `This action returns all supabase`;
  }

  findOne(id: number) {
    return `This action returns a #${id} supabase`;
  }

  update(id: number, updateSupabaseDto: UpdateSupabaseDto) {
    return `This action updates a #${id} supabase`;
  }

  remove(id: number) {
    return `This action removes a #${id} supabase`;
  }
}
