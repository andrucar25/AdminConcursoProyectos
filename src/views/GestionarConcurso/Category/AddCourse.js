
import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

import  './category.css'

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Bold } from 'react-feather';
import Axios from 'axios';


const itemsFromBackend = [
    {
      "_id": "5fa2d7be5de18662ee312a89",
      "ciclo": "IX",
      "codigo": 974,
      "descripcion": "Construccion de Software I",
      "docente": "Alberto Flor Rodriguez",
      "createdAt": "2020-11-04T16:33:02.878Z",
      "__v": 0
    },
    {
      "_id": "5fa2d82f5de18662ee312a8a",
      "ciclo": "IX",
      "codigo": 977,
      "descripcion": "Negocios y Marketing por Internet",
      "docente": "Tito Ale Nieto",
      "createdAt": "2020-11-04T16:34:55.034Z",
      "__v": 0
    },
    {
      "_id": "5fa2d85e5de18662ee312a8b",
      "ciclo": "X",
      "codigo": 76,
      "descripcion": "Construccion de Software II",
      "docente": "Alberto Flor Rodriguez",
      "createdAt": "2020-11-04T16:35:42.900Z",
      "__v": 0
    },
  ]

 
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection:'row',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 18,
    fontWeight:'Bold',

  },
  pos: {
    marginBottom: 12,
  },
}));

export default function AddCourse({catA, catB,catC,setCatA,setCatB,setCatC,columns,setColumns,ismounted}) {
   
  useEffect(() => {
    if(ismounted.current == false){
      Axios.get("http://localhost:4000/cursos").then(response=>{
      const columnsFromBackend = 
      {
        ['Cursos']:{
        name:'Cursos',
        items:response.data,
        width:'100%'
        },
        ['CatA']:{
          name:'Categoria A',
          items:[],
          width:'30%'
        },
        ['CatB']:{
          name:'Categoria B',
          items:[],
          width:'30%'
        },
        ['CatC']:{
          name:'Categoria C',
          items:[],
          width:'30%'
        }
      };
      setColumns(columnsFromBackend)
      ismounted.current = true
    })
   
    }
    
    
    
  }, [])
  const onDragEnd = (result,columns,setColumns) => {
    if(!result.destination) return;
    const { source,destination } = result;
    if(source.droppableId !== destination.droppableId){
  
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index,1);
      destItems.splice(destination.index,0,removed);
      //console.log(columns)
      //console.log(sourceItems)    
      console.log(source)
      console.log(destItems)
      console.log(destination)
      if(destination.droppableId == 'CatB'){
        const data = {
            cursos:destItems
        }
        setCatB(data)
      }
      if(source.droppableId == 'CatB'){
        const data = {
            cursos:sourceItems
        }
        setCatB(data)
      }
      if(destination.droppableId == 'CatC'){
        const data = {
            cursos:destItems
        }
        setCatC(data)
      }
      if(source.droppableId == 'CatC'){
        const data = {
            cursos:sourceItems
        }
        setCatC(data)
      }
      if(destination.droppableId == 'CatA'){
        const data = {
            cursos:destItems
        }        
        setCatA(data)
      }
      if(source.droppableId == 'CatA'){
        const data = {
            cursos:sourceItems
        }
        setCatA(data)
      }
     
      setColumns({
        ...columns,
        [source.droppableId]:{
          ...sourceColumn,
          items:sourceItems
        },
        [destination.droppableId]:{
          ...destColumn,
          items:destItems
        }
      })
    }else{
      const column = columns[source.droppableId];
      const copiedItems = [...column.items]
      const [removed] = copiedItems.splice(source.index,1);
      copiedItems.splice(destination.index,0,removed);
      console.log(copiedItems)
      setColumns({
        ...columns,
        [source.droppableId] : {
          ...column,items:copiedItems
        }
      })
    }
    console.log(catB)
  }
/////
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  return (
    <div style={{display:'flex',justifyContent:'center',height:'100%',flexWrap:'wrap'}}>
    <DragDropContext onDragEnd={result=>{
      console.log(result)
      onDragEnd(result,columns,setColumns)
    }}>
      {Object.entries(columns).map(([id,column])=>{
        return (
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',width:column.width}}>
            <h2>{column.name}</h2>
            <div style={{margin:8}}>
          <Droppable droppableId={id} key={id}>
            {(provided,snapshot)=>{
              return (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef} 
                  style={{
                    backgroundColor:snapshot.isDraggingOver ? 'lightblue' : '#F4F6F8',
                    padding:4,
                    width:column.width,
                    height:'100%',
                    width:'100%',
                    minWidth:'300px',
                    minHeight:'100px',padding:'10%',display:'flex',flexWrap:'wrap'}}
                    className="top-round-rainbow">
                    {column.items.map((item,index)=>{
                      return(
                        <Draggable 
                        key={item._id} 
                        draggableId={item._id} 
                        index={index}>
                            {(provided,snapshot) => {
                            

                              return(
                                <div>
                                <Chip ref={provided.innerRef}
                                {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect:'none',
                                      padding:8,
                                      margin:'2%',
                                      backgroundColor:snapshot.isDragging ? '#26384A' : '#456C86',
                                      color:'white',
                                      ...provided.draggableProps.style
                                    }} label={item.descripcion}  color="primary" />
                                </div>
                              )
                            }}
                        </Draggable>
                      )
                    })}
                    {provided.placeholder}
                    
                </div>
                
              )
            }}
          </Droppable>
          
          </div>
          
          </div>
          
        )
      }
      )}
   
    </DragDropContext>
    {/* <div>
      <pre>
            {JSON.stringify(catA,null,2)}
      </pre>
      <pre>
            {JSON.stringify(catB,null,2)}
      </pre>
      <pre>
            {JSON.stringify(catC,null,2)}
      </pre>
    </div> */}
  </div>
  );
}