
export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  icon: string;
  benefits: string[];
  imageUrl: string;
}

export interface Industry {
  name: string;
  icon: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}
