import QrScanner from 'qr-scanner/types/qr-scanner';

export interface QrScannerType extends QrScanner{};

export interface Axis {
  x: number;
  y: number;
}

export interface ScanResult {
  cornerPoints: Axis[];
  data: string;
}

export type Emits = {
  (e: 'close'): void; 
  (e: 'update:buddys'): void; 
};