import Image from 'next/image'
import KoalaboHeader from '../components/KoalaboHeader'
import CardBox from '../components/CardBox'

export default function sci1fr() {
  return (
    <>
    
    <KoalaboHeader/>

    <div style={{width:'100vw' , minHeight:"100vh"}}>
      <CardBox/>
    </div>
    
    
    </>
  )
}