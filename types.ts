export interface Skill {
  category: string;
  description: string;
}

export interface Project {
  id: string;
  category: string;
  title: string;
  description: string;
  insight: string;
  tags: string[];
}

export interface SocialLink {
  label: string;
  url: string;
  display: string;
}
