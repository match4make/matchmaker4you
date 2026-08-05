export interface AffiliateLink {
  id: string;
  name: string;
  url: string;
  network?: string;
  isPrimary?: boolean;
}

export interface SingleProfile {
  id: string;
  name: string;
  age: number;
  city: string;
  countryCode: string;
  avatar: string;
  tagline: string;
  interests: string[];
  distance: string;
  onlineNow: boolean;
}

export interface CountryData {
  id: string;
  code: string;
  flag: string;
  name: string;
  famousCity: string;
  landmark: string;
  landmarkImage: string;
  coupleImage: string;
  activeSingles: string;
  region: 'North America' | 'Europe' | 'Oceania' | 'Global';
  primaryUrl: string;
  affiliateLinks: AffiliateLink[];
  popularInterests: string[];
  sampleProfiles: SingleProfile[];
  rating: number;
  reviewsCount: number;
}

export type ActiveTab = 'home' | 'countries' | 'singles' | 'privacy' | 'terms' | 'drive';
