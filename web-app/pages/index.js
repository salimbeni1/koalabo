import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import KoalaboHeader from '../components/KoalaboHeader'
import KoalaboBG from '../components/KoalaboBG'

export default function Home() {
  return (
    <>
    
    <KoalaboHeader/>

    <>
      <KoalaboBG/>
      <div className={styles.extra +' '+styles.container } >
          <h1>EXTRA</h1> 
          </div>

          <div className={styles.math +' '+styles.container} >
          <h1>MATH</h1>
          </div>

          <div className={styles.science +' '+styles.container} >
          <h1>SCIENCE</h1>
      </div>
    </>

    
    
    </>
  )
}
