import { ConcertType } from "../../../types/index.d";

export interface ChipBuddyType {
  username: string;
  color: string;
  id: string;
}
export interface Props {
  active: boolean;
  editMode: boolean;
  concert: ConcertType;
  buddys: ChipBuddyType[];
}

export type Emits = {
  (e: 'update:program', value: string): void;
  (e: 'open:popin'): void;
};