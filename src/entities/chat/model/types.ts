export interface Chat {
  id: number;
  content: string;
  timestamp: Date;
  contentType: 'text' | 'image';
  type: 'sent' | 'received';
}
