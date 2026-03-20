export interface Email {
  id: string;
  from: string;
  fromName: string;
  subject: string;
  body: string;
  timestamp: Date;
  read: boolean;
  avatar: string;
}

export type View = 'inbox' | 'email';
