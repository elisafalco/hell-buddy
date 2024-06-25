import { ChipBuddyType, ConcertType } from "@/types";

export interface Props {
  concert: ConcertType;
  buddys: ChipBuddyType[];
}

export type Emits = {
  (e: 'close'): void; 
};