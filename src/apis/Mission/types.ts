export type QuestType = 'login' | 'collect';

export interface Quest {
  id: number;
  title: string;
  description: string;
  type: QuestType;
  target_id: number;
  value: number;
  gold_reward: number;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  is_done: boolean;
}

export interface QuestResponse {
  data: Quest[];
}

export interface QuestUpdateResponse {
  data: {
    message: string;
  };
}
