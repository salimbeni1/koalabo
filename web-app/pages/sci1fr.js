import KoalaboHeader from '../components/KoalaboHeader'
import CardBox from '../components/CardBox'
import BGimage2format from '../components/BGimage2format'
import styles from '../styles/classPage.module.scss'

export default function sci1fr() {
  return (
    <>
    
    <KoalaboHeader/>

    <BGimage2format imw="/images/rousseau_2-min.jpg" imh="/images/rousseau_1-min.jpg" />

    <div className={styles.container}>
      <CardBox nameClass="sci1fr"/>
    </div>
    
    </>
  )
}