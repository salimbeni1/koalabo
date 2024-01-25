import CardBox from '../components/CardBox'
import styles from '../styles/adminPage.module.scss'
import { Select, InputLabel , FormControl , FormGroup ,Switch ,FormControlLabel ,  MenuItem ,createTheme , ThemeProvider } from '@mui/material'
import {TextField , Button , NumberInput, IconButton , Input} from '@mui/material'
import { useState , useEffect } from 'react'

import DeleteIcon from '@mui/icons-material/Delete';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

import LoopSharpIcon from '@mui/icons-material/LoopSharp';

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


    const [page, setPage] = useState("no")

    const [courseName, setCourseName] = useState("")
    const [courseIndex, setCourseIndex] = useState(0)
    const [courseState, setCourseSate] = useState("")
    const [links, setLinks] = useState([])
    const [courseBG, setCourseBG] = useState("")
    const [selectedCourseID, setSelectedCourseID] = useState("")  

    const [isNewCourse, setIsNewCourse] = useState(true)

    const [newPageName, setNewPageName] = useState("")
  
    const [addNewCourse, RES_addNewCourse] = useMutation(NEW_COURSE);
    const [delCourse, RES_delCourse] = useMutation(DEL_COURSE);
    const [updateCourse, RES_updateCourse] = useMutation(UPDATE_COURSE);
    const [uploadFile, RES_uploadFile] = useMutation(UPLOAD_FILE_);

    const [forceRenderCardBox, setForceRenderCardBox] = useState(0)


    const [fileBG, setFileBG] = useState()
    const [fileDoc, setFileDoc] = useState([])

    const [collections, setCollections] = useState([]);

    useEffect(() => {
      fetch('https://gaione-server.one/koalabo/kcollections')
      //fetch('http://localhost:4000/kcollections')
        .then(response => response.json())
        .then(data => setCollections(data))
        .catch(error => console.error('Error fetching collections:', error));
    }, []);

    const updateSelectedCourse = () => {
      console.log( page , selectedCourseID , updatedCourse )

      const updatedCourse = {
          title: courseName,
          state: courseState,
          index: Number(courseIndex),
          links : links.map( (l) =>{ return {name:l.name , link:l.link , state:l.state} }),
          bg: courseBG
        };

        console.log( page , selectedCourseID , updatedCourse )
        updateCourse({ variables: { className: page , courseID: selectedCourseID , course: updatedCourse } }).catch(err => console.log(err));
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
      console.log("uploadDocc");
      fileDoc.forEach( f => {
        console.log("uploadDoc",f)
        try{
          uploadFile({ variables: { sectionType: "documents" , file: f } })
        }
        catch(e){
          console.log( "ERROR UPLOADfile" , e);
        }
      })
    }

    const insertNewCourse = () => {
        console.log("yolo")
        const newCourse = {
            state: courseState,
            title: courseName,
            index: courseIndex,
            links : links,
            bg: courseBG
        };
        console.log(newCourse)
        addNewCourse({ variables: { className: page , course: newCourse } });
    }

    const getSelectedCourse = (c) => {
      if(c){
        setCourseName (n => n =  c.title)
        setCourseSate(n => n = c.state)
        setLinks       (l => l = c.links)
        setCourseBG     (bg => bg = c.bg)
        setSelectedCourseID( i => i = c._id)
        setIsNewCourse    (b => b= false)
        setCourseIndex ( i => i = c.index )
      }else{
        setCourseName ( n => n =  "")
        setCourseSate(n => n = "")
        setLinks      ( l => l = [] )
        setCourseBG   (bg => bg = "")
        setSelectedCourseID( i => i = "")
        setIsNewCourse (b => b= true)
        setCourseIndex ( i => i = 0)
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


           
            { (page !== "no" && page !== "" && page !== "new" )  ? <div className={styles.left}>

              <div className={styles.lefticon} onClick={ e => {
                setForceRenderCardBox(n=>n+1)
              }}> <LoopSharpIcon/> </div>

              <CardBox nameClass={page} nc={forceRenderCardBox} admin passCourse={getSelectedCourse} />
              
              </div> :<></>} 
            { page === "no" ? <div className={styles.displaySelect}>SELECTIONNE UNE CLASSE</div> : <></>} 
            { page === "" ? <div className={styles.displaySelect}>SELECTIONNE UNE CLASSE</div> : <></>} 

        </div>
        <div className={styles.sousDiv+' '+styles.form}>
            
          <p>FORMULAIRE POUR EDITEUR</p>  
        <ThemeProvider theme={theme}>
        <FormControl fullWidth >
        
        <div className={styles.selectClassName}>
        {//< InputLabel id="test-select-label">Select a Page</InputLabel >
        }
        {
          collections.length > 0 ? <Select
                fullWidth
                //labelId="test-select-label"
                //label="selected page"
                value={page}
                onChange={ (v) => {setPage( p => p=v.target.value);} }
            >
            <MenuItem value={"no"}>...</MenuItem>
            {
              collections.map((c, index) => (
                  <MenuItem key={"collections-"+index} value={c} >
                    {c}  </MenuItem>)
            )
            }
            <MenuItem value={"new"}>Nouvelle Classe</MenuItem>
          </Select> : <></>
        }
        
        </div>

        { 
          page === "new" ? <>
          
            <TextField id={"link-name---"}
                onChange={(e) => {setNewPageName( n => n=e.target.value )}}
                value={newPageName}
                label="Nom de la classe" variant="filled" />

            <Button color="primary" size="large" component="span"
              onClick={e => {
                if ( newPageName !== "" ) {
                  setPage(newPageName)
                }
              }}
            >
                        Creer la nouvelle classe
            </Button>
          
          </>:<></>
        }

        { (page !== "new" && page !== "no")   && <>
        <h2>{page}</h2>
        <TextField id="filled-basic" value={courseName} onChange={(e) => {setCourseName( n => n=e.target.value )}} 
          label="titre du cour" 
          variant="filled" />


        <TextField id="filled-basic" type="number" value={courseIndex} onChange={(e) => {setCourseIndex( n => n=e.target.value )}} 
          label="Index, Ordre sur la page" 
          variant="filled" InputLabelProps={{ shrink: true }}  />

        <FormControlLabel control={<Switch checked={courseState!=="Hidden"} onChange={(e) => {setCourseSate( n => n=e.target.checked?"":"Hidden" )}} />} label={courseState==="Hidden"?"invisible":"visible"} />
        <div className={styles.linksContainer}>
            { links.map( (link , index) => {
                return <div className={styles.linkC} key={index} > 
                    
                    <TextField id={"link-name-"+index}
                               onChange={(n) => {setLinks( ls => ls.map( (el , idx) => { return idx===index?{name:n.target.value,link:el.link, state:el.state}:el } )) } } 
                               value={link.name}
                               label="titre lien" variant="filled" />

                    <TextField id={"link-url-"+index}
                               onChange={(n) => {setLinks( ls => ls.map( (el , idx) => { return idx===index?{name:el.name,link:n.target.value,state:el.state}:el } )) } } 
                               value={link.link} 
                               label="url du lien" variant="filled" />


                    <label htmlFor={"icon-button-file-"+index}>
                      <Input id={"icon-button-file-"+index} type="file" className={styles.iconButtonFile}
                              onChange={
                                ({target: {validity, files: [file]}}) =>{
                              setLinks( ls => ls.map( (el , idx) => { return idx===index?{name:el.name,link:file.name,state:el.state}:el } ))
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

                    
                    <FormControlLabel control={<Switch 
                      checked={link.state !== "Hidden"}
                      onChange={(n) => {setLinks( ls => ls.map( (el , idx) => { return idx===index?{name:el.name,link:el.link, state:n.target.checked?"":"Hidden"}:el } )) } }  />}
                    label={link.state==="Hidden"?"invisible":"visible"} />
                  
                </div>
            } ) }


            <div className={styles.addCourseLinkBTN} >
            <Button variant="outlined" onClick={() => {
                if( links.length >= 5 ) alert("max de 5 liens :/")
                else
                setLinks( l => [...l , {name: "" , link: "", state:""} ])

            }}>
                AJOUTE lien
            </Button>
            </div>
        </div>

        <div className={styles.bginput}>
        <TextField id="filled-basic" value={courseBG} onChange={(e) => {setCourseBG(bg => bg=e.target.value)}} label="image de fond" variant="filled" />
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
          AJOUTE UN COUR
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
          MET A JOUR
        </Button>
        <Button variant="contained" onClick={() => {deleteSelectedCourse(); getSelectedCourse(undefined); setForceRenderCardBox(n=>n+1)}}>
          SUPPRIME
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