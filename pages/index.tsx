import Head from "next/head"
import styles from "../styles/Home.module.css"

export default function Home() {
  return (
    <>
      <Head>
        <title>Some apis by terwer</title>
        <meta name="description" content="Some apis by terwer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>Hello, World</div>
      </main>
    </>
  )
}
