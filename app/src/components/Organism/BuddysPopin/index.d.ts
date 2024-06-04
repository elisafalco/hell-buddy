import { BuddyType } from "@/types";

export interface Props {
  buddys: BuddyType[];
}

export type Emits = {
  (e: 'close'): void;
  (e: 'update:buddys', buddys: BuddyType[]): void;
};