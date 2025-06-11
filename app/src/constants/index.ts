// Types
import { DayType, StageType } from "../types/index.d";

export const LS_ID = 'HELLBUDDY_ID';
export const LS_USERNAME = 'HELLBUDDY_USERNAME';
export const LS_COLOR = 'HELLBUDDY_COLOR';
export const LS_PROGRAM = 'HELLBUDDY_PROGRAM';
export const LS_BUDDYS = 'HELLBUDDY_BUDDYS';

export const DAYS: DayType[] = [
  {
    formattedDate: "2025/06/19",
    ISODate: "2025-06-18T22:00:00.000Z",
    ISOFrom: "2025-06-19T07:00:00.000Z",
    ISOTo: "2025-06-20T01:00:00.000Z",
    label: "Jeudi"
  },
  {
    formattedDate: "2025/06/20",
    ISODate: "2025-06-19T22:00:00.000Z",
    ISOFrom: "2025-06-20T07:00:00.000Z",
    ISOTo: "2025-06-21T01:00:00.000Z",
    label: "Vendredi"
  },
  {
    formattedDate: "2025/06/21",
    ISODate: "2025-06-20T22:00:00.000Z",
    ISOFrom: "2025-06-21T07:00:00.000Z",
    ISOTo: "2025-06-22T01:00:00.000Z",
    label: "Samedi"
  },
  {
    formattedDate: "2025/06/22",
    ISODate: "2025-06-21T22:00:00.000Z",
    ISOFrom: "2025-06-22T07:00:00.000Z",
    ISOTo: "2025-06-23T01:00:00.000Z",
    label: "Dimanche"
  }
]

export const STAGES: StageType[] = [
  {
    label: 'Mainstage 1',
    slug: 'mainstage-1'
  },
  {
    label: 'Mainstage 2',
    slug: 'mainstage-2'
  },
  {
    label: 'Warzone',
    slug: 'warzone'
  },
  {
    label: 'Valley',
    slug: 'valley'
  },
  {
    label: 'Temple',
    slug: 'temple'
  },
  {
    label: 'Altar',
    slug: 'altar'
  }
]

export const COLORS: string[] = [
  "#A04CE2",
  "#FF5B5B",
  "#293F77",
  "#4CE288"
]