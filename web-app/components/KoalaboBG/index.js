import React from 'react'
import styles from './KoalaboBG.module.scss'
import { getCloud } from './svg/cloud'
import { getErlenmayer } from './svg/erlenmayer'
import { getFeuille_1 } from './svg/feuille_1'
import { getFeuille_2 } from './svg/feuille_2'
import { getKoala } from './svg/koala'
import { getManyPlant_3 } from './svg/many_plant_3'
import { getMontagne_1 } from './svg/montagne_1'
import { getMontagne_2 } from './svg/montagne_2'
import { getPlant_1 } from './svg/plant_1'
import { getPlant_2 } from './svg/plant_2'
import { getPlant_3 } from './svg/plant_3'
import { getPlant_4 } from './svg/plant_4'
import { getPlant_5 } from './svg/plant_5'
import { getSea } from './svg/sea'
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

            <div className={styles.manyPlant_3}>
                {getManyPlant_3()}
            </div> 

            <div className={styles.plant_5}>
                {getPlant_5()}
            </div>

            <div className={styles.plant_4}>
                {getPlant_4()}
            </div>

            <div className={styles.feuille_1}>
                {getFeuille_1()}
            </div>

            <div className={styles.feuille_2}>
                {getFeuille_2()}
            </div>

            <div className={styles.sea}>
                {getSea()}
            </div>

            <div className={styles.montagne_1}>
                {getMontagne_1()}
            </div>

            <div className={styles.montagne_2}>
                {getMontagne_2()}
            </div>



        </div>
        </>
    )
}

export default KoalaboBG