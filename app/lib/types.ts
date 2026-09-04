export interface Film {
  id: string;
  name: string;
  description: string;
  iso: number;
  type: string;
  characteristics: string[];
  texture?: string;
  images: string[];
}
