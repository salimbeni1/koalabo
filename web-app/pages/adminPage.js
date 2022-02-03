import Image from 'next/image'
import KoalaboHeader from '../components/KoalaboHeader'
import CardBox from '../components/CardBox'
import styles from '../styles/adminPage.module.scss'
import { Select, InputLabel , FormControl , MenuItem ,createTheme , ThemeProvider } from '@mui/material'
import {TextField , Button , IconButton , Input} from '@mui/material'
import { useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

import { useMutation } from '@apollo/client'
import { NEW_COURSE, UPDATE_COURSE , DEL_COURSE, UPLOAD_FILE , UPLOAD_FILE_} from '../GraphQL/Mutations'



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

export default function AdminPage() {


    const [page, setPage] = useState("")

    const [courseName, setCourseName] = useState("")
    const [links, setLinks] = useState([])
    const [courseBG, setCourseBG] = useState("")
    const [selectedCourseID, setSelectedCourseID] = useState("")  

    const [isNewCourse, setIsNewCourse] = useState(true)
  
    const [addNewCourse, RES_addNewCourse] = useMutation(NEW_COURSE);
    const [delCourse, RES_delCourse] = useMutation(DEL_COURSE);
    const [updateCourse, RES_updateCourse] = useMutation(UPDATE_COURSE);
    const [uploadFile, RES_uploadFile] = useMutation(UPLOAD_FILE_);

    const [forceRenderCardBox, setForceRenderCardBox] = useState(0)

    const [fileBG, setFileBG] = useState()
    const [fileDoc, setFileDoc] = useState([])


    const updateSelectedCourse = () => {


      console.log( page , selectedCourseID , updatedCourse )

      const updatedCourse = {
          title: courseName,
          links : links.map( (l) =>{ return {name:l.name , link:l.link} }),
          bg: courseBG
        };

        console.log( page , selectedCourseID , updatedCourse )

        updateCourse({ variables: { className: page , courseID: selectedCourseID , course: updatedCourse } });
    }

    const deleteSelectedCourse = () => {

      delCourse({ variables: { className: page , courseID: selectedCourseID } });

    }

    const uploadImageBG = () => {
      if(fileBG){
        console.log(fileBG)
        uploadFile({ variables: { sectionType: "bgImages" , file: fileBG } })
      }
    }

    const uploadDOC = () => {
      fileDoc.forEach( f => {
        console.log(f)
          uploadFile({ variables: { sectionType: "documents" , file: f } })
      })
    }


    const insertNewCourse = () => {

        //console.log( {data, loading, error} )

        const newCourse = {
            title: courseName,
            links : links,
            bg: courseBG
        };

        addNewCourse({ variables: { className: page , course: newCourse } });
    }

    const getSelectedCourse = (c) => {
      if(c){
        setCourseName (n => n =  c.title)
        setLinks       (l => l = c.links)
        setCourseBG     (bg => bg = c.bg)
        setSelectedCourseID( i => i = c._id)
        setIsNewCourse    (b => b= false)
      }else{
        setCourseName ( n => n =  "")
        setLinks      ( l => l = [] )
        setCourseBG   (bg => bg = "")
        setSelectedCourseID( i => i = "")
        setIsNewCourse (b => b= true)
      }
    }

  return (
    <>
    
    {
    //<KoalaboHeader/>
    console.log(page)
    }

    <div className={styles.mainDiv}>
        <div className={styles.sousDiv+' '+styles.display}>
            { page.match("sci|math") && <CardBox nameClass={page} nc={forceRenderCardBox} admin passCourse={getSelectedCourse} />} 
            { page === "no" && <div className={styles.displaySelect}>SELECT A PAGE</div>} 
            { page === ""   && <div className={styles.displaySelect}>SELECT A PAGE</div>} 

        </div>
        <div className={styles.sousDiv+' '+styles.form}>
            
          <p>EDIT FORM</p>  
        <ThemeProvider theme={theme}>
        <FormControl fullWidth >
        
        <div className={styles.selectClassName}>
        {//< InputLabel id="test-select-label">Select a Page</InputLabel >
        }
        <Select
                fullWidth
                //labelId="test-select-label"
                //label="selected page"
                value={page}
                onChange={ (v) => {setPage( p => p=v.target.value);} }
        >
            <MenuItem value={"no"}>...</MenuItem>
            <MenuItem value={'sci1fr'} > sci1fr  </MenuItem>
            <MenuItem value={'sci2fr'} > sci2fr  </MenuItem>
            <MenuItem value={'sci3fr'} > sci3fr  </MenuItem>
            <MenuItem value={'math1fr'}> math1fr </MenuItem>
            <MenuItem value={'math2fr'}> math2fr </MenuItem>
            <MenuItem value={'math3fr'}> math3fr </MenuItem>
        </Select>
        </div>

        {
            page.match("sci|math")  && <>
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


                    <label htmlFor={"icon-button-file-"+index}>
                      <Input id={"icon-button-file-"+index} type="file" className={styles.iconButtonFile}
                              onChange={
                                ({target: {validity, files: [file]}}) =>{
                              setLinks( ls => ls.map( (el , idx) => { return idx===index?{name:el.name,link:file.name}:el } ))
                              validity.valid &&  setFileDoc( f => [...f, file ]) }} />
                      <IconButton color="primary" aria-label="upload document" size="large" component="span">
                        <UploadFileIcon fontSize="inherit" />
                      </IconButton>
                    </label>
                    
                    
                    <IconButton aria-label="delete" size="large"
                      onClick={() => { setLinks(ls => ls.filter( (el,i) => i !==index )) }}
                      >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>

                </div>
            } ) }
            <div className={styles.addCourseLinkBTN} >
            <Button variant="outlined" onClick={() => {
                if( links.length >= 5 ) alert("max of 5 links for course")
                else
                setLinks( l => [...l , {name: "" , link: ""} ])

            }}>
                ADD course link
            </Button>
            </div>
        </div>

        <div className={styles.bginput}>
        <TextField id="filled-basic" value={courseBG} onChange={(e) => {setCourseBG(bg => bg=e.target.value)}} label="background image url" variant="filled" />
        <label htmlFor="icon-button-file-bg">
            <Input id="icon-button-file-bg" type="file" className={styles.iconButtonFile}
                   onChange={
                     ({target: {validity, files: [file]}}) =>{
                    setCourseBG(bg => bg = `${file.name}`);
                    validity.valid && setFileBG(file) }}
                    />
            <IconButton color="primary" aria-label="upload document" size="large" component="span" 
                        >
              <InsertPhotoIcon fontSize="inherit" />
            </IconButton>
        </label>
        </div>

        <div className={styles.updateDeleteBTN}>
        { isNewCourse &&
        <Button variant="contained" onClick={() => {
          insertNewCourse();
          uploadImageBG();
          uploadDOC();
          getSelectedCourse(undefined);
          setForceRenderCardBox(n=>n+1)}}>
          ADD NEW COURSE
        </Button>
        }
        { !isNewCourse &&
        <>
        <Button variant="contained" onClick={() => {
          updateSelectedCourse(); 
          uploadImageBG();
          uploadDOC();
          getSelectedCourse(undefined); 
          setForceRenderCardBox(n=>n+1)}}>
          UPDATE COURSE
        </Button>
        <Button variant="contained" onClick={() => {deleteSelectedCourse(); getSelectedCourse(undefined); setForceRenderCardBox(n=>n+1)}}>
          DELETE COURSE
        </Button>
        </>
        }</div>
        </>
        }
        


        </FormControl>
        </ThemeProvider>
        </div>
    </div>

    </>
  )
}