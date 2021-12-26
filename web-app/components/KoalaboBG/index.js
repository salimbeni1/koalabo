import React from 'react'
import styles from './KoalaboBG.module.scss'

function KoalaboBG() {
    return (
        <>
        
        <svg className={styles.palme} width="280" height="102" viewBox="0 0 280 102" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 75L44.5 29L132.5 17.5L183 6L252.5 29L275 75C261.167 68.6667 194.2 39.5 195 39.5L211.5 75L167.5 47.5V78L102.5 52L108.5 84L83.5 60.5L56.5 84L49 60.5L2 96.5V75Z"/>
        </svg>


        <svg className={styles.trunc}  width="70" height="438" viewBox="0 0 70 438" preserveAspectRatio='none' xmlns="http://www.w3.org/2000/svg">
        <path d="M14 272V113L0 56L14 0H44V48L70 205L44 346V438H14V272Z" stroke="black"/>
        </svg>

        <svg className={styles.cloud} width="363" height="133" viewBox="0 0 363 133"  xmlns="http://www.w3.org/2000/svg">
        <path d="M56 70L6 120L9.5 53L23.5 50.5V1.5L56 17L109 1.5L152 10L248.5 1.5L282.5 17L359 1.5V37.5H343.5L359 96L343.5 111.5L275 70L214 79.5L188 44.5L74 88L56 70Z" stroke="black"/>
        </svg>

        <svg className={styles.koala} width="150" height="257" viewBox="0 0 150 257"  xmlns="http://www.w3.org/2000/svg">
        <path d="M53.5 63.25L62.5 47H79M53.5 63.25L44.5 79.5L62.5 103.5L115 91.5V69.25M53.5 63.25L25 47L53.5 17H79V47M79 47H97M97 47H115V69.25M97 47L108 22L141 32.5L134 79.5L115 69.25M62.5 162L13.5 134.5L7 110.5L68.5 134.5M62.5 206L13.5 238.5L25 252.5L92.5 213.5M62.5 86.5L39.5 123.5L44.5 224L115 238.5L134 170.5L108 110.5L92.5 79.5L62.5 86.5Z" stroke="black"/>
        </svg>
        
        </>
    )
}

export default KoalaboBG