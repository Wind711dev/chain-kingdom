export interface Statistic {
  hp: number;
  attack: number;
  crit_rate: string;
  crit_damage: number;
  damage_multiplier: number;
  evade_rate: string;
}

export interface UserData {
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

export interface UserResponse {
  data: UserData;
}