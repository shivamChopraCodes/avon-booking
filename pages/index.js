import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
      
      <div className={`${styles.headWrapper} index-header-wrapper flex flex-col justify-center items-center text-white `} >
        <div className='flex flex-col justify-center items-center ' >
          <p className=' text-xl font-semibold ' >The best tour experience</p>
          <p className=' text-3xl font-bold my-4 ' >find and bood tickets</p>
        </div>
      </div>
      </main>
    </div>
  )
}
