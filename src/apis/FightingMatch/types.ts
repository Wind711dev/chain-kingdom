export type UserStatistic = {
  hp: number;
  attack: number;
  crit_rate: string; // có thể đổi thành number nếu dữ liệu luôn là số
  crit_damage: number;
  damage_multiplier: number;
  evade_rate: string; // như trên
};

export type User = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  avatar: string;
  is_premium: boolean;
  wallet_address: string;
  referral_code: string;
  referrer_id: number;
  last_login: string;
  created_at: string;
  updated_at: string;
  statistic: UserStatistic;
};

export type Item = {
  id: number;
  name: 'coin' | 'milk' | 'grass' | string;
  type: string;
  price: number;
  sell_price: number;
};

export type RewardItem = Item;

export type Enemy = {
  id: number;
  name: string;
  description: string;
  hp: number;
  attack: number;
  crit_rate: number;
  crit_damage: number;
  evade_rate: number;
  damage_multiplier: number;
  reward_item_id: number;
  reward_item: RewardItem;
  total_reward: number;
};

export type ItemMetadata = {
  type: string;
  source: string;
  metadata: {
    enemy_id: number;
  };
};

export type MatchItem = Item & {
  total: number;
  metadata: ItemMetadata;
};

export type FightResult = {
  defender_id: number;
  defender: User;
  enemies: Enemy[];
  items: MatchItem[];
  is_win: boolean;
};

export type FightResultResponse = {
  data: FightResult;
};
