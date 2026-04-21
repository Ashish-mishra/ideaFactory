export type Category =
  | "fintech"
  | "healthtech"
  | "d2c"
  | "saas"
  | "edtech"
  | "agritech"
  | "logistics"
  | "mediatech"
  | "devtools"
  | "climate";

export interface IdeaSource {
  label: string;
  url: string;
  observed_on: string;
}

export interface IdeaScore {
  market: number;
  capital: number;
  team: number;
  trend: number;
  moat: number;
  economics: number;
  speed: number;
  total: number;
}

export interface Idea {
  slug: string;
  title: string;
  date: string;
  category: Category;
  pitch: string;
  score: IdeaScore;
  capex_inr_lakh: number;
  team_size: number;
  time_to_mvp_weeks: number;
  sources: IdeaSource[];
  tags: string[];
  status: "published" | "draft";
  bodyHtml: string;
}

export function categoryLabel(c: Category): string {
  const map: Record<Category, string> = {
    fintech: "Fintech",
    healthtech: "Healthtech",
    d2c: "D2C",
    saas: "SaaS",
    edtech: "Edtech",
    agritech: "Agritech",
    logistics: "Logistics",
    mediatech: "Mediatech",
    devtools: "Devtools",
    climate: "Climate",
  };
  return map[c];
}
