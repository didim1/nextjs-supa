import type { Data, Database, Error } from '../../interface';
import useSWR, { Fetcher, useSWRConfig } from 'swr'
import InternalServerError from '../500';
import Link from 'next/link';
import axios from 'axios';

const fetcher: Fetcher<Data[]> = (url: string) => axios.get(url).then(res => res.data)

const Products = () => {
    const { mutate } = useSWRConfig()
    const { data } = useSWR(`${process.env.NEXT_PUBLIC_HTTP}${process.env.NEXT_PUBLIC_VERCEL_URL}/api/products`, fetcher)
    if (!data) return <h1>Loading</h1>;

    const deleteProduct = async (id: number) => {
        await axios.delete(`${process.env.NEXT_PUBLIC_HTTP}${process.env.NEXT_PUBLIC_VERCEL_URL}/api/product/${id}`)
    }

    return (
        <div className="container">
            <div className="flex flex-col mt-5">
                <div className="w-full">
                    <Link
                        href="/product/new"
                    >
                        <a className="bg-green-500 hover:bg-green-700 text-white border-slate-200 border font-bold py-2 px-4 rounded-lg">
                            Add New
                        </a>
                    </Link>
                    <div className="relative shadow rounded-lg mt-6">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                <tr>
                                    <th className="py-3 px-1 text-center">No.</th>
                                    <th className="py-3 px-1">Product Name</th>
                                    <th className="py-3 px-1">Price</th>
                                    <th className="py-3 px-1 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {data.map((product, index) => (
                                    <tr key={product.id} className="bg-white border-b">
                                        <td className="py-3 px-1 text-center">{index + 1}</td>
                                        <td className="py-3 px-1 font-medium text-gray-900">
                                            {product.name}
                                        </td>
                                        <td className="py-3 px-1">{product.price}</td>
                                        <td className="py-3 px-1 text-center">
                                            <Link
                                                href={`/product/${product.id}/edit`}
                                            >
                                                <a className="font-medium bg-blue-400 hover:bg-blue-600 px-3 py-1 rounded text-white mr-1">Edit</a>
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    deleteProduct(product.id);
                                                    mutate(`${process.env.NEXT_PUBLIC_DOMAIN_APP}/api/products`)

                                                }}
                                                className="font-medium bg-red-700 hover:bg-red-800 px-3 py-1 rounded text-white mr-1"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>


    )
}

export default Products
