import { NextApiRequest, NextApiResponse } from "next";
import { Database } from "../../interface";
import { supabase } from "../../utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    body: { name, price },
  } = req;
  switch (method) {
    case "GET":
      try {
        const { data, error } = await supabase
          .from<Database["products"]>("products")
          .select();

        if (error) throw error;
        return res.status(200).json(data);
      } catch (error) {
        res.status(500).json({
          error: {
            status: 500,
            message: "internal server error",
          },
        });
        return res.redirect("/500");
      }

    case "POST":
      try {
        const { data, error } = await supabase.from("products").insert({
          name,
          price,
        });
        if (error) throw error;
        return res
          .status(201)
          .json({ status: 201, message: "Successfully created" });
      } catch (error) {
        return res.status(400).json({ status: 400, message: "Bad request" });
      }

    default:
      break;
  }
}
