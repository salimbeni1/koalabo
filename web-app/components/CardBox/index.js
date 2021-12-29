import React from 'react'
import PropTypes from 'prop-types'
import styles from './CardBox.module.scss'
import { useEffect } from 'react'

import {useQuery , gql} from "@apollo/client"
import { SCI1FRS }  from '../../GraphQL/Queries.js' 
import { useState } from 'react'

import { Grow ,Link } from '@mui/material';


function CardBox( { nc , admin , passCourse , newCourse } ) {

    const {err , log , data , refetch } = useQuery(SCI1FRS , {
        fetchPolicy: "no-cache"
      })

    const [courses, setCourses] = useState([])

    const [selectedCourse, setSelectedCourse] = useState()

    
    useEffect(() => {
        if(data){
            refetch()
            console.log(data)
            setCourses(data.sci1frs)
        }
    }, [data , nc])


    return ( <>
        <div className={styles.container} 

            onClick={(e) => {
                 if(admin && e.target === e.currentTarget){
                     setSelectedCourse(sc => sc = undefined);
                     passCourse(undefined);
                     }}
                     }>
            

            {courses.map( (e , i) => 
                <Grow in={true} 
                      timeout= {500+i*1000 }
                      key={i} 
                      >
                    <div key={i} 
                        onClick={() => {
                            if(admin){
                            if(selectedCourse === i){
                                setSelectedCourse(sc => sc = undefined)
                                passCourse(undefined);
                            }
                            else {
                                setSelectedCourse(sc => sc = i)
                                passCourse(e);
                                }
                            }
                            }
                        }
                        className={styles.card+' '+
                                   (admin?(selectedCourse===i?' '+styles.selectedCardClick:styles.selectedCard):'')} 
                        style={{backgroundImage:"url(http://localhost:4000/bgImages/"+ e.bg+")"}} > 
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
        </>)
}

CardBox.propTypes = {

}

export default CardBox

