export interface Book {
  ISBN: string;
  author_id: number;
  created_at: string;
  description?: string;
  id: number;
  name: string;
  publishing_company_id: number;
  updated_at?: string;
}
