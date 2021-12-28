import Image from 'next/image'
import KoalaboHeader from '../components/KoalaboHeader'
import CardBox from '../components/CardBox'
import styles from '../styles/adminPage.module.scss'
import { Select, InputLabel , FormControl , MenuItem ,createTheme , ThemeProvider } from '@mui/material'
import {TextField , Button , Input} from '@mui/material'
import { useState } from 'react'

import { useMutation } from '@apollo/client'
import { NEW_COURSE } from '../GraphQL/Mutations'


const theme = createTheme({

    palette: {
      type: 'light',
      primary: {
        main: '#000',
      },
      secondary: {
        main: '#f50057',
      },
      info: {
        main: '#3e2723',
      },
    },
  
  });

export default function adminPage() {


    const [page, setPage] = useState("")

    const [courseName, setCourseName] = useState("")
    const [links, setLinks] = useState([])
    const [courseBG, setCourseBG] = useState("")
    const [addNewCourse, { data, loading, error }] = useMutation(NEW_COURSE);


    const [forceRenderCardBox, setForceRenderCardBox] = useState(0)


    const insertNewCourse = () => {

        console.log( {data, loading, error} )

        const newCourse = {
            title: courseName,
            links : links,
            bg: courseBG
        };

        addNewCourse({ variables: { className: page , course: newCourse } });
    }


  return (
    <>
    
    {
    //<KoalaboHeader/>
    console.log(page)
    }

    <div className={styles.mainDiv}>
        <div className={styles.sousDiv+' '+styles.display}>
            { page === "sci1fr" && <CardBox key={forceRenderCardBox}/>} 
            { page === "no" && <>SELECT A PAGE</>} 
            { page === ""   && <>SELECT A PAGE</>} 

        </div>
        <div className={styles.sousDiv+' '+styles.form}>
            
            EDIT FORM
        <ThemeProvider theme={theme}>
        <FormControl fullWidth >
        
        
        <InputLabel id="test-select-label">Select a Page</InputLabel>
        <Select
                labelId="test-select-label"
                label="selected page"
                value={page}
                onChange={ (v) => {setPage( p => p=v.target.value);} }
        >
            <MenuItem value={"no"}>...</MenuItem>
            <MenuItem value={'sci1fr'}>sci1fr</MenuItem>
            <MenuItem value={'sci2fr'}>sci2fr</MenuItem>
            <MenuItem value={'sci3fr'}>sci3fr</MenuItem>
        </Select>

        {
            page.match("sci")  && <>
        <TextField id="filled-basic" value={courseName} onChange={(e) => {setCourseName( n => n=e.target.value )}} label="course name" variant="filled" />

        <div className={styles.linksContainer}>
            { links.map( (link , index) => {
                return <div className={styles.linkC} key={index} > 
                    
                    <TextField id={"link-name-"+index}
                               onChange={(n) => {setLinks( ls => ls.map( (el , idx) => { return idx===index?{name:n.target.value,link:el.link}:el } )) } } 
                               value={link.name}
                               label="link name" variant="filled" />

                    <TextField id={"link-url-"+index}
                               onChange={(n) => {setLinks( ls => ls.map( (el , idx) => { return idx===index?{name:el.name,link:n.target.value}:el } )) } } 
                               value={link.link} 
                               label="link url" variant="filled" />

                </div>
            } ) }
            <Button variant="outlined" onClick={() => {
                if( links.length >= 5 ) alert("max of 5 links for course")
                else
                setLinks( l => [...l , { name: "" , link: "" } ])

            }}>
                ADD course link
            </Button>
        </div>

        <TextField id="filled-basic" value={courseBG} onChange={(e) => {setCourseBG(bg => bg=e.target.value)}} label="background image url" variant="filled" />

        <Button variant="contained" onClick={() => {insertNewCourse(); setForceRenderCardBox(n=>n+1)}}>ADD NEW COURSE</Button>
        </>
        }
        


        </FormControl>
        </ThemeProvider>
        </div>
    </div>

    </>
  )
}