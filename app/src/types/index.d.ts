export interface DayType {
  formattedDate: string;
  ISODate: string;
  ISOFrom: string;
  ISOTo: string;
  label: string;
}

export interface ConcertType {
  artist: string;
  date: string;
  hour: string;
  stage: string;
  ts: string;
}

export interface StageType {
  label: string;
  slug: string;
}

export interface BuddyType {
  id: string;
  username: string;
  color: string;
  program: string[];
  scanTS: number;
}
