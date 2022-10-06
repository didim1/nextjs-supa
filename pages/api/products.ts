import { NextApiRequest, NextApiResponse } from "next";
import { Database } from "../../interface";
import { supabase } from "../../utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data, error } = await supabase
    .from<Database["products"]["data"]>("products")
    .select();
  if (!error) {
    return res.status(200).json({
      products: {
        data: {
          status: 200,
          data: data,
        },
      },
    });
  }
  return res.status(500).json({
    products: {
      error: {
        status: 500,
        error: error,
      },
    },
  });
}
