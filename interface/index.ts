export interface Data {
  id: number;
  name: string;
  price: number;
  created_at: string;
}

export interface DataSingle {
  product: {
    id: number;
    name: string;
    price: number;
    created_at: string;
  };
}

export interface Error {
  status?: number;
  message?: string;
}

export interface Database {
  products: {
    data?: Data[];
    error?: Error;
  };
}
