import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Xmlrpc server for metaweblog api</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    <Link href="/api/xmlrpc">
                        <a target="_blank">Xmlrpc server</a>
                    </Link>
                </h1>
                <p>for metaweblog api</p>

                <h2>Currently supports confluence via adaptor, other plantforms later...</h2>

                <div className={styles.grid}>
                    <Link href="/docs">
                        <a className={styles.card}
                           target="_blank">
                            <h2>Documentation &rarr;</h2>
                            <p>Find in-depth information about xmlrpc server and metaweblog api adaptor.</p>
                        </a>
                    </Link>
                </div>
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16}/>
          </span>
                </a>
            </footer>
        </div>
    )
}
