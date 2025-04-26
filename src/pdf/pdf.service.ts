import { Injectable } from '@nestjs/common';

@Injectable()
export class PdfService {
  handleFileName(originalName: string, fallbackExtension?: string) {
    let name = originalName;

    if (name.match(/[Ð\x80-\xFF]/)) {
      const buffer = Buffer.from(name, 'latin1');
      name = buffer.toString('utf8');
    }

    name = name.replace(/\s+/g, '_');

    name = name.replace(/[^\w\-.]/g, '');

    name = name.toLowerCase();

    if (fallbackExtension) {
      const hasExtension = /\.[a-z0-9]+$/i.test(name);
      if (!hasExtension) {
        name += fallbackExtension.startsWith('.')
          ? fallbackExtension
          : `.${fallbackExtension}`;
      }
    }

    if (name.length > 128) {
      const ext = name.includes('.')
        ? name.substring(name.lastIndexOf('.'))
        : '';
      name = name.substring(0, 128 - ext.length) + ext;
    }

    return name;
  }

  findAll() {
    return `This action returns all pdf`;
  }
}
