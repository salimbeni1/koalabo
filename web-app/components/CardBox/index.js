import React from 'react'
import PropTypes from 'prop-types'
import styles from './CardBox.module.scss'
import { useEffect } from 'react'

import {useQuery , gql} from "@apollo/client"
import { LIST_COURSE }  from '../../GraphQL/Queries.js' 
import { useState } from 'react'

import { Grow ,Link } from '@mui/material';


function CardBox( { nameClass , nc , admin , passCourse , newCourse } ) {

    const {err , log , data , refetch } = useQuery(LIST_COURSE , {
        fetchPolicy: "no-cache",
        variables: { className: nameClass },
      } )

    const [courses, setCourses] = useState([])

    const [selectedCourse, setSelectedCourse] = useState()

    
    useEffect(() => {
        if(data){
            refetch()
            console.log(data.listCourses)
            setCourses(data.listCourses)
            if(admin){
            setSelectedCourse(sc => sc = undefined);
            passCourse(undefined);
            }
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
                        style={{backgroundImage:"url(http://gaione-server.one/koalabo/bgImages/"+ e.bg+")"}} > 
                        <div className={styles.cardbg} >
                            <div className={styles.cardName} >{e.title}</div>
                            {e.links.map ( (el , i) =>
                                <div key={i} className={styles.cardLink} >
                                    <Link href={
                                        el.link.match("http")?el.link:
                                        'http://gaione-server.one/koalabo/documents/'+el.link
                                        } underline="none">{el.name}</Link>
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

