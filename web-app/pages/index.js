import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import KoalaboHeader from '../components/KoalaboHeader'
import KoalaboBG from '../components/KoalaboBG'

import { ButtonGroup , Button } from '@mui/material';
import { createTheme , ThemeProvider } from '@mui/material';
import { red } from '@mui/material/colors';


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

  /*
  typography: {
    button: {
      fontSize: "100%",
      fontWeight: 1000,
      lineHeight: 2.21,
      letterSpacing: '0.01em',
    },
  },*/

});



export default function Home() {




  return (
    <>
    
    <KoalaboHeader/>

    <>
          <KoalaboBG/>

          <ThemeProvider theme={theme}>

          <div className={styles.contcontainer}>
          
          <div className={styles.extra +' '+styles.container } >
          <h1>EXTRA</h1> 
          
            <div className={styles.buttongroup}>
              <Button>test</Button>
              <Button>jeux</Button>
            </div>
          </div>

          <div className={styles.math +' '+styles.container} >
          <h1>MATH</h1>
          <div className={styles.buttongroup}>
            <Button href="math1fr">1FR</Button>
            <Button href="math2fr">2FR</Button>
            <Button href="math3fr">3FR</Button>
            </div>
          </div>

          <div className={styles.science +' '+styles.container} >
          <h1>SCIENCE</h1>
          <div className={styles.buttongroup}>
            <Button href="sci1fr">1FR</Button>
            <Button href="sci2fr">2FR</Button>
            <Button href="sci3fr">3FR</Button>
            </div>
          </div>

          </div>

          </ThemeProvider>
    </>

    
    
    </>
  )
}
