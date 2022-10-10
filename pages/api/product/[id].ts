import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../utils/supabaseClient";
import { Data } from "../../../interface";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { id },
    body: { name, price },
  } = req;

  switch (method) {
    case "GET":
      try {
        const { data, error } = await supabase
          .from<Data>("products")
          .select()
          .eq("id", Number(id))
          .single();

        if (!data) throw error;
        res.status(200).json(data);
      } catch (error) {
        res.status(404).json(error);
      }
      break;
    case "PATCH":
      try {
        const { error } = await supabase
          .from("products")
          .update({
            name,
            price,
          })
          .eq("id", id);

        if (error) throw error;

        return res
          .status(200)
          .json({ status: 200, message: "Successfully updated" });
      } catch (error) {
        return res.status(400).json({ status: 400, message: "Bad request" });
      }
    case "DELETE":
      try {
        const { data, error } = await supabase
          .from<Data>("products")
          .delete()
          .eq("id", Number(id));

        if (data?.length == 0) throw error;

        res.status(200).json({ status: 200, message: "Successfully deleted" });
      } catch (error) {
        res.status(500).json({ status: 500, message: "Internal server error" });
      }
    default:
      break;
  }
}
