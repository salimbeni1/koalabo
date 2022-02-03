import Image from 'next/image'
import KoalaboHeader from '../components/KoalaboHeader'
import CardBox from '../components/CardBox'
import BGimage2format from '../components/BGimage2format'
import styles from '../styles/classPage.module.scss'


export default function sci3fr() {
  return (
    <>
    
    <KoalaboHeader/>

    <BGimage2format imw="/images/rousseau_3-min.jpg" imh="/images/rousseau_1-min.jpg" />

    <div className={styles.container}>
      <CardBox nameClass="sci3fr"/>
    </div>
        
    
    </>
  )
}