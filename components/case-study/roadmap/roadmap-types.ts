export type RoadmapStatus =
  | "completed"
  | "on-hold"
  | "current"
  | "upcoming";

export type RoadmapPhase = {
  number: string;
  title: string;
  items: string[];
  status: RoadmapStatus;
  statusNote?: string;
};