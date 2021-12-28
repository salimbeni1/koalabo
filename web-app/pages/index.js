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

  typography: {
    button: {
      fontSize: '7vh',
      fontWeight: 1000,
      lineHeight: 2.21,
      letterSpacing: '0.01em',
    },
  },

});



export default function Home() {




  return (
    <>
    
    <KoalaboHeader/>

    <>
          <KoalaboBG/>

          <ThemeProvider theme={theme}>
          
          <div className={styles.extra +' '+styles.container } >
          <h1>EXTRA</h1> 
          <ButtonGroup className={styles.btmGroup} variant="text" aria-label="text button group">
            <Button>test</Button>
            <Button>jeux</Button>
          </ButtonGroup>
          </div>

          <div className={styles.math +' '+styles.container} >
          <h1>MATH</h1>
          <ButtonGroup className={styles.btmGroup} variant="text" aria-label="text button group">
            <Button>1FR</Button>
            <Button>2FR</Button>
            <Button>3FR</Button>
          </ButtonGroup>
          </div>

          <div className={styles.science +' '+styles.container} >
          <h1>SCIENCE</h1>
          <ButtonGroup className={styles.btmGroup} variant="text" aria-label="text button group">
            <Button href="sci1fr">1FR</Button>
            <Button>2FR</Button>
            <Button>3FR</Button>
          </ButtonGroup>
          </div>

          </ThemeProvider>
    </>

    
    
    </>
  )
}
