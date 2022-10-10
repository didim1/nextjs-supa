import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import FormProduct from '../../components/FormProduct'

const AddProduct = () => {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const router = useRouter()

    const saveProduct = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN_APP}/api/products`, {
            name,
            price: parseInt(price),
        })
        router.push(`${process.env.NEXT_PUBLIC_DOMAIN_APP}/products`)

    }

    return (
        <FormProduct name={name} setName={setName} price={price} setPrice={setPrice} saveProduct={saveProduct} />
    )
}

export default AddProduct