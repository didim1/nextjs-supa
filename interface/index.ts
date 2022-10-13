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

export const getUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return process.env.NEXT_PUBLIC_URL;
  }

  return process.env.VERCEL_URL;
};

export const getHttp = () => {
  if (process.env.NODE_ENV === "development") {
    return "http://";
  }
  return "https://";
};
