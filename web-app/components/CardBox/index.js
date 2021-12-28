import React from 'react'
import PropTypes from 'prop-types'
import styles from './CardBox.module.scss'
import { useEffect } from 'react'

import {useQuery , gql} from "@apollo/client"
import { SCI1FRS }  from '../../GraphQL/Queries.js' 
import { useState } from 'react'

import { Grow ,Link } from '@mui/material';


function CardBox(props) {

    const {err , log , data } = useQuery(SCI1FRS)

    const [courses, setCourses] = useState([])


    useEffect(() => {
        //console.log(data)
        if(data)
            setCourses(data.sci1frs)
    }, [data])


    return (
        <div className={styles.container}>

            {courses.map( (e , i) => 
                <Grow in={true} 
                      timeout= {500+i*1000 }
                      >
                    <div key={i} className={styles.card} style={{backgroundImage:"url(http://localhost:4000/bgImages/"+ e.bg+")"}} > 
                        <div className={styles.cardbg} >
                            <div className={styles.cardName} >{e.title}</div>
                            {e.links.map ( (el , i) =>
                                <div key={i} className={styles.cardLink} >
                                    <Link href={'http://localhost:4000/documents/'+el.link} underline="none">{el.name}</Link>
                                </div>)}
                        </div> 
                    </div>
                </Grow>
            )}
            
        </div>
    )
}

CardBox.propTypes = {

}

export default CardBox

