import React from 'react'
import PropTypes from 'prop-types'
import styles from './CardBox.module.scss'
import { useEffect } from 'react'

import {useQuery , gql} from "@apollo/client"
import { SCI1FRS }  from '../../GraphQL/Queries.js' 
import { useState } from 'react'


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

                <div key={i} > {e.title} </div>
            
            )}
            
        </div>
    )
}

CardBox.propTypes = {

}

export default CardBox

