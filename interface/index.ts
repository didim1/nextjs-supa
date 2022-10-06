interface Data {
  id: number;
  name: string;
  price: number;
  created_at: string;
}

interface Error {
  code: number;
  details?: string;
  hint?: string;
  message: string;
}

// export interface Database {
//   data?: {
//     status: number;
//     data: Data[];
//   };
//   error?: {
//     status: number;
//     error: Error;
//   };
export interface Database {
  products: {
    data?: {
      status?: number;
      data?: Data[];
    };
    error?: {
      status?: number;
      error?: Error;
    };
  };
}
