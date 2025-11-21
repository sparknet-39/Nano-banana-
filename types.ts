export type AspectRatio = '1:1' | '3:4' | '4:3' | '9:16' | '16:9';

export interface GeneratedImage {
  id: string;
  prompt: string;
  aspectRatio: AspectRatio;
  base64Data: string;
  createdAt: Date;
}
