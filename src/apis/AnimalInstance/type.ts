export interface FeedItem {
  id: number;
  name: string;
  price: number;
  sell_price: number;
  type: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  sell_price: number;
  type: string;
}

export interface AnimalMetadata {
  animal_id: number;
  feedItem: FeedItem;
  feed_id: number;
  level: number;
  max_loading_time: number;
  max_production_holding: number;
  price: number;
  product: Product;
  product_id: number;
  production_per_min: number;
  total_feed: number;
  total_upgrade_price: number;
  upgrade_price: number;
}

export interface ShelterInfo {
  id: number;
  max_animals: number;
  name: string;
  price: number;
  slug: string;
}

export interface Animal {
  id: number;
  name: string;
  shelter: ShelterInfo;
  shelter_id: number;
}

export interface Shelter {
  animal_shelter_id: number;
  animals: string[];
  created_at: string;
  id: string;
  pos_x: number;
  pos_y: number;
  shelterInfo: ShelterInfo;
  updated_at: string;
}

export interface AnimalInShelter {
  animal: Animal;
  animal_id: number;
  claimable: boolean;
  created_at: string;
  id: string;
  last_feed_at: string;
  level: number;
  metadata: AnimalMetadata;
  position: number;
  shelter: Shelter;
  updated_at: string;
  user_animal_shelter_id: string;
}
