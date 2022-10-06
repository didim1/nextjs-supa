import type { GetServerSideProps } from 'next'
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react';
import { Database } from '../interface';
import styles from '../styles/Home.module.css'




const Home = ({ products }: Database) => {

  return (

    <div className={styles.container}>



      {/* <ProductList data={.name} /> */}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {

  const response = await fetch("http://localhost:3000/api/products");

  const products: Database['products'] = await response.json()



  return {
    props: { products }
  }

  // if (products.data) {
  //   const data: Database['data'] = products.data
  //   return {
  //     props: { data }
  //   }
  // }
  // const error: Database['error'] = products.error
  // return {
  //   props: { error }
  // }



}

export default Home
