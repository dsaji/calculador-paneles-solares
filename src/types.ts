export interface Rec {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type Box = Omit<Rec, 'x' | 'y'>;

export interface CalcResult {
  count: number;
  recs: Rec[];
}

export interface PanelsFormValues {
  panelHeight: string;
  panelWidth: string;
  roofHeight: string;
  roofWidth: string;
}
