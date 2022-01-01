import React from 'react'
import styles from './KoalaboBG.module.scss'
import { getCloud } from './svg/cloud'
import { getErlenmayer } from './svg/erlenmayer'
import { getKoala } from './svg/koala'
import { getPlant_1 } from './svg/plant_1'
import { getPlant_2 } from './svg/plant_2'
import { getPlant_3 } from './svg/plant_3'
import { getTree } from './svg/tree'

function KoalaboBG() {
    return (
        <>
        <div className={styles.container}>

            <div className={styles.tree} >
                {getTree()}
            </div>

            <div className={styles.koala} >
                {getKoala()}
            </div>

            <div className={styles.erlenmayer}>
                {getErlenmayer()}
            </div>

            <div className={styles.cloud}>
                {getCloud()}
            </div>

            <div className={styles.plant_1}>
                {getPlant_1()}
            </div>

            <div className={styles.plant_2}>
                {getPlant_2()}
            </div>

            <div className={styles.plant_3}>
                {getPlant_3()}
            </div>

        </div>
        </>
    )
}

export default KoalaboBG