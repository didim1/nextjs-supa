import Head from 'next/head'
import { useRouter } from 'next/router'
import useSwr from 'swr';
import styles from '../../../styles/Home.module.css'
import Image from 'next/future/image'
import { Data } from '../../../interface';
import Link from 'next/link';
import axios from 'axios';

const fetcher = (url: string) => axios.get(url).then(res => res.data)
const ProductDetail = () => {
    const router = useRouter()
    const { data, error } = useSwr<Data>(router.query.id ? `/api/product/${router.query.id}` : null, fetcher)


    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={`${styles.title} text-center`}>
                    {
                        !data ? "Loading..." :
                            data.name
                    }
                </h1>

                <p className={`${styles.description} text-center`}>
                    {
                        data?.price
                    }
                </p>
                <Link href={`/product/${router.query.id}/edit`}>
                    <a>Edit</a>
                </Link>
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
                        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
                    </span>
                </a>
            </footer>
        </div>
    )
}

export default ProductDetail