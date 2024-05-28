// Types
import { DayType, StageType } from "../types/index.d";

export const LS_ID = 'HELLBUDDY_ID';
export const LS_USERNAME = 'HELLBUDDY_USERNAME';
export const LS_COLOR = 'HELLBUDDY_COLOR';
export const LS_PROGRAM = 'HELLBUDDY_PROGRAM';
export const LS_BUDDYS = 'HELLBUDDY_BUDDYS';

export const DAYS: DayType[] = [
  {
    formattedDate: "2024/06/27",
    ISODate: "2024-06-26T22:00:00.000Z",
    ISOFrom: "2024-06-27T07:00:00.000Z",
    ISOTo: "2024-06-28T01:00:00.000Z",
    label: "Jeudi 27"
  },
  {
    formattedDate: "2024/06/28",
    ISODate: "2024-06-27T22:00:00.000Z",
    ISOFrom: "2024-06-28T07:00:00.000Z",
    ISOTo: "2024-06-29T01:00:00.000Z",
    label: "Vendredi 28"
  },
  {
    formattedDate: "2024/06/29",
    ISODate: "2024-06-28T22:00:00.000Z",
    ISOFrom: "2024-06-29T07:00:00.000Z",
    ISOTo: "2024-06-30T01:00:00.000Z",
    label: "Samedi 29"
  },
  {
    formattedDate: "2024/06/30",
    ISODate: "2024-06-29T22:00:00.000Z",
    ISOFrom: "2024-06-30T07:00:00.000Z",
    ISOTo: "2024-07-01T01:00:00.000Z",
    label: "Dimanche 30"
  }
]

export const STAGES: StageType[] = [
  {
    label: 'MAINSTAGE 1',
    slug: 'mainstage-1'
  },
  {
    label: 'MAINSTAGE 2',
    slug: 'mainstage-2'
  },
  {
    label: 'WARZONE',
    slug: 'warzone'
  },
  {
    label: 'VALLEY',
    slug: 'valley'
  },
  {
    label: 'TEMPLE',
    slug: 'temple'
  },
  {
    label: 'ALTAR',
    slug: 'altar'
  }
]

export const COLORS: string[] = [
  "#A04CE2",
  "#FF5B5B",
  "#293F77",
  "#4CE288"
]