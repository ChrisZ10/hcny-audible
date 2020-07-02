export interface Album {
  title: string;
  slug: string;
      
  description?: string;
  author?: string;
  cover?: string;
  tags?: string[];
}