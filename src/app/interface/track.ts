export interface Track {
  title: string;
  slug: string;
  uri: string;
        
  description?: string;
  author?: string;
  cover?: string;
  tags?: string[];
}