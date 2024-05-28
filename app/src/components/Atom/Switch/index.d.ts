export interface Props {
  value: boolean;
}

export type Emits = {
  'update:value': [value: boolean];
};