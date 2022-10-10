import axios from 'axios'
import React, { useState } from 'react'
import FormProduct from '../../../components/FormProduct'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { DataSingle } from '../../../interface'

const EditProduct = ({ product }: DataSingle) => {
    const router = useRouter()
    const { id } = router.query
    const [name, setName] = useState(product.name)
    const [price, setPrice] = useState(product.price.toString())

    const updateProduct = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        await axios.patch(`${process.env.NEXT_PUBLIC_DOMAIN_APP}/api/product/${id}`, {
            name,
            price: parseInt(price)
        })
        router.push(`${process.env.NEXT_PUBLIC_DOMAIN_APP}/products`)
    }

    return (
        <FormProduct setName={setName} name={name} setPrice={setPrice} price={price} updateProduct={updateProduct} saveProduct={undefined} />
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_APP}/api/product/${context.params?.id}`)

    const product: DataSingle = await response.data

    return {
        props: { product }
    }
}



export default EditProduct;