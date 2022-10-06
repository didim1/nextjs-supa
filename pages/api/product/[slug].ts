import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  slug: number;
  products: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
    query: { slug },
  } = req;

  switch (method) {
    case "GET":
      res
        .status(200)
        .json({ slug: Number(slug), products: `products: ${slug}` });
      break;

    default:
      break;
  }
}
