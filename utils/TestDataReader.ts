import { readFileSync } from 'node:fs';
import path from 'node:path';

export class TestDataReader {
  static readJson<T>(fileName: string): T {
    const filePath = path.resolve(__dirname, '..', 'testdata', fileName);
    return JSON.parse(readFileSync(filePath, 'utf8')) as T;
  }
}
