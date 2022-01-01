import React from 'react'
import styles from './BGimage2format.module.scss'
import Image from 'next/image'
import { useState , useEffect } from 'react'

function BGimage2format( { imw , imh } ) {


    const [windowWidth, setWindowWidth] = useState(undefined)
    const [windowHeight, setWindowHeight] = useState(undefined)

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
            setWindowHeight(window.innerHeight)
        }

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])


    const selectImage =  () => {

        if(windowHeight === undefined || windowWidth === undefined) {
            if(typeof window !== "undefined")
                return window.innerWidth < window.innerHeight ? imh : imw
            return imw
        }else{
            return windowWidth < windowHeight ?  imh : imw
        }
    }


    return (
        <>
            <div className={styles.container}>
                <Image src={ selectImage() } 
                    placeholder="blur"
                    blurDataURL={ selectImage() }
                    layout="fill" objectFit="cover"
                    className={styles.imagebg}
                    />
            </div>
        </>
    )
}

export default BGimage2format