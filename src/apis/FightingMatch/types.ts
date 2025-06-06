export interface Statistic {
  hp: number;
  attack: number;
  crit_rate: string;
  crit_damage: number;
  damage_multiplier: number;
  evade_rate: string;
}

export interface User {
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
  statistic: Statistic;
}

export interface RewardItem {
  id: number;
  name: string;
  type: string;
  price: number;
  sell_price: number;
}

export interface Enemy {
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
}

export interface Item extends RewardItem {
  total: number;
}

export interface BattleData {
  defender_id: number;
  defender: User;
  enemies: Enemy[];
  items: Item[];
  is_win: boolean;
}

export interface BattleResponse {
  data: BattleData;
}