import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Avatar, Box, Button, Collapse, ListItemAvatar, Paper } from '@material-ui/core';
import { Download } from 'react-feather';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import Highlighter from 'react-highlight-words';
import './styles.css'
import Axios from 'axios';
import ComponentTitle from './ComponentTitle';

const drawerWidth = 500;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

export default function PlagioScreen({id}) {

  
  
  const [openMenu, setOpenMenu] = useState({})
  const [searchWords, setSearchWords] = useState([])
  const [plagioData, setplagioData] = useState({})  
  const [texto, settexto] = useState({})
  const [analisis, setanalisis] = useState([])  
  
  const handleClick = (id) => {
    setOpenMenu((prevState => ({...prevState, [id]: !openMenu[id]})))
    console.log(openMenu)
  }

  const printDiv = () => {    
    let divContents = document.getElementById("GFG").innerHTML; 
    let a = window.open('', '', 'height=500, width=500'); 
    a.document.write('<html>'); 
    a.document.write('<body>'); 
    a.document.write(divContents); 
    a.document.write('</body></html>'); 
    a.document.close(); 
    a.print(); 
  }
  
  const searchWordsHandle =(data)=>{ 
    console.log(data)
    if(data.length > 0) {
      for (let pa of data) {
        let iterable = [...pa.similitudes]
        for(let i of iterable){
          setSearchWords(p=>[i.oracionAnalizada,...p])
        }
      }
    }else{
      setSearchWords([])
    }
    console.log(searchWords)  
  }
  useEffect(() => {
    //5fca92ffc107b05b98550953
    //5fcaad4bdca8fe7d3bd861a9
    
    fetch(`http://localhost:4000/plagio/id/${id}`)
  .then(response => response.json())
  .then((data) =>{
    setplagioData(data)    
    console.log(Object.keys(data.texto))
    setanalisis(data.analisis)
    settexto(data.texto)
    searchWordsHandle(data.analisis)
  console.log(searchWords)
  });
  
  }, [])
  
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  
  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  return (
    
    <div className={classes.root}>
           <CssBaseline />
    <AppBar
    position="fixed"
    className={clsx(classes.appBar, {
      [classes.appBarShift]: open,
    })}
    >
    <Toolbar>
    <Typography variant="h6" noWrap className={classes.title}>
    {/* { String(Object.keys(originalData.analisis).length)} */}
    </Typography>
    <IconButton
    color="inherit"
    aria-label="open drawer"
    edge="end"
    onClick={handleDrawerOpen}
    className={clsx(open && classes.hide)}
    >
    <MenuIcon />
    </IconButton>
    </Toolbar>
    </AppBar>
    <main id="GFG"
    className={clsx(classes.content, {
      [classes.contentShift]: open,
    })}
    >
    <div className={classes.drawerHeader} />
    <Typography paragraph style={{textAlign:"center",marginBottom:"2rem",fontSize:"1.5rem"}}>                 
    {/* <h1>{plagioData.id}</h1> */}
    {/* {JSON.stringify(searchWords)} */}
    <div style={{textAlign:"left"}}>
    <h4>Porcentaje Total de plagio : <strong>{String(parseFloat(plagioData.porcentajeTotal).toFixed(2))}%</strong></h4>
    </div>
    </Typography>
    <div style={{backgroundColor:"white",padding:"1rem",borderRadius:"20px",textAlign:"left"}}>
    {  
      
      Object.keys(texto).map((item,index)=>{
        return(
          <>
          
          
          <Typography paragraph style={{textTransform:"capitalize",textAlign:"center",fontWeight:"bold",fontSize:"2rem"}}>
          {item}
          </Typography>              
          <Typography paragraph>            
          <div>
          
          {/* { Object.values(originalData.analisis)[index]}  */}
          <Highlighter          
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={searchWords}
          autoEscape={true}
          textToHighlight={ Object.values(texto)[index]}
          />
          </div>
          </Typography>
          </>
          )
        })
      }</div>
      
      </main>
      <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={open}
      
      classes={{
        paper: classes.drawerPaper,
      }}
      >
      <div className={classes.drawerHeader}>
      <IconButton onClick={handleDrawerClose}>
      {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
      </div>
      <Divider />
      <Paper>
      <List style={{maxHeight: '100%', overflow: 'auto',width:'100%',}}>
      {analisis.length > 0 &&
      analisis.map((pa,index)=>{
        return(
          <>
          <ListItem button onClick={()=>handleClick(index)}>
          <ListItemIcon>
          <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={pa.id} />
          <h2>{Number(parseFloat(pa.porcentaje).toFixed(2))}%</h2>
          {openMenu[index] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openMenu[index]} timeout="auto" unmountOnExit>
          <ListItem alignItems="flex-start" style={{backgroundColor:pa.color}}>      
          <ListItemText
          primary={pa.id}          
          secondary={
            <React.Fragment>
            {pa.similitudes.map(ps=>{
              return(
                <>
                
                <p>{ps.similitudEncontrada}</p>
                <br></br></>
                )
              })}
              
              
              
              <h3>{Number(parseFloat(pa.porcentaje).toFixed(2))}% de plagio con el documento original</h3>
              </React.Fragment>
            }
            />
            </ListItem>
            </Collapse>
            </>)
          })}        
          </List>
          </Paper>
          <Divider />
          <List>
         
            <ListItem button onClick={()=>printDiv()}>
              <ListItemIcon>
                <InboxIcon></InboxIcon>
                
              </ListItemIcon>
              <ListItemText primary="Descargar Reporte"></ListItemText>
          </ListItem>
            
            <ListItem button >
              <ListItemIcon>
                <Download></Download>
                
              </ListItemIcon>
              <ListItemText primary="Descargar Documento"></ListItemText>
            </ListItem>
            
            </List>
            </Drawer>
            </div>
            );
          }
          