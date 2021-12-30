import Image from 'next/image'
import KoalaboHeader from '../components/KoalaboHeader'
import CardBox from '../components/CardBox'

export default function math1fr() {
  return (
    <>
    
    <KoalaboHeader/>

    <div style={{width:'100vw' , minHeight:"100vh"}}>
      <CardBox nameClass="math1fr"/>
    </div>
    
    
    </>
  )
}