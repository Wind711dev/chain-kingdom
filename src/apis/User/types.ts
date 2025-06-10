export type UserStatistic = {
  hp: number;
  attack: number;
  crit_rate: string;
  crit_damage: number;
  damage_multiplier: number;
  evade_rate: string;
};

export type UserAssets = {
  total_gold: number;
};

export type UserProfile = {
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
  assets: UserAssets;
};

export type UserProfileResponse = {
  data: UserProfile;
};

export type ItemInfo = {
  id: number;
  name: string;
  type: string;
  price: number;
  sell_price: number;
};

export type InventoryItem = {
  item_id: number;
  info: ItemInfo;
  total: number;
};

export type InventoryResponse = {
  data: InventoryItem[];
};

export type ItemMetadata = {
  max_loading_time?: number;
  production_per_min?: number;
  max_production_holding?: number;
  [key: string]: any; // để linh hoạt mở rộng nếu có thêm metadata khác
};

export type ItemConfig = {
  id: number;
  name: string;
  type: string;
  price: number;
  sell_price: number;
  metadata: ItemMetadata;
};

export type ItemConfigResponse = {
  data: ItemConfig[];
};
