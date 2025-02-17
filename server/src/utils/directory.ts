import { fileURLToPath } from 'url';
import path from 'path';

// Export __filename and __dirname
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export const getUploadPath = (fileName: string) => path.join(__dirname,'..','..','public','uploads',fileName);