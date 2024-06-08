export interface Props {
  name: string;
  color: string;
  qrCodeUrl: string;
}

export type Emits = {
  (e: 'close'): void;
  (e: 'update:profile', {name: string, color: string}): void;
  (e: 'open:scan'): void;
};