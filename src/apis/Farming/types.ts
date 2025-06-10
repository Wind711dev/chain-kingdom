export type FarmPlot = {
  id: string;
  user_id: number;
  pos_x: number;
  pos_y: number;
  last_seed_at: string | null;
  seed_id: number;
  seed?: Seed;
  created_at: string;
  updated_at: string;
};

type Metadata = {
  product_id: number;
  max_loading_time: number;
  production_per_min: number;
  max_production_holding: number;
};

export type Seed = {
  id: number;
  name: string;
  type: string;
  price: number;
  sell_price: number;
  metadata: Metadata;
};

export type FarmPlotListResponse = {
  data: FarmPlot[];
};

export type SowingSeedResponse = {
  data: {
    message: string;
  };
};
