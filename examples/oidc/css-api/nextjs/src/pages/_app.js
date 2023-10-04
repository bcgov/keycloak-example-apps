import '@/styles/globals.css'
import Navigation from '@/components/Navigation'
import styles from '@/styles/Home.module.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navigation />
      <main className={`${styles.main}`}>
        <Component {...pageProps} />
      </main>
    </>
  )
}
