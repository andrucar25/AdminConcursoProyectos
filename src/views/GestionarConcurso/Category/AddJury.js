import { Avatar, Checkbox, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Bold } from 'react-feather';

const itemsFromBackend = [
    { codigo:'1', nombre: 'Ingeniero 1' },
    { codigo:'2', nombre: 'Ingeniero 2' },
    { codigo:'3', nombre: 'Ingeniero 3' },
    { codigo:'4', nombre: 'Ingeniero 4' },
    { codigo:'5', nombre: 'Ingeniero 5' },
    { codigo:'6', nombre: 'Ingeniero 6' },
    { codigo:'7', nombre: 'Ingeniero 7' },
    { codigo:'8', nombre: 'Ingeniero 8' },
    { codigo:'9', nombre: 'Ingeniero 9' },
    
]
const columnsFromBackend = 
{
    ['Jurados']:{
        name:'Jurados',
        items:itemsFromBackend
    },
    ['CatA']:{
        name:'Categoria A',
        items:[]
    },
    ['CatB']:{
        name:'Categoria B',
        items:[]
    },
    ['CatC']:{
        name:'Categoria C',
        items:[]
    }
};
// juryColumns={juryColumns} setJuryColumns={setJuryColumns} juryA={juryA} 
//setJuryA={setJuryA} juryB={juryB} setJuryB={setJuryB} juryC={juryC} 
//setJuryC={setJuryC} isJuryMounted={isJuryMounted}
const  AddJury= ({juryColumns,setJuryColumns,juryA,setJuryA,juryB,setJuryB,juryC,setJuryC,isJuryMounted}) => {
    useEffect(() => {
        if(isJuryMounted.current == false){
            Axios.get("http://localhost:4000/docentes").then(response=>{
                const columnsFromBackend = 
                    {
                        ['Jurados']:{
                            name:'Jurados',
                            items:response.data
                        },
                        ['CatA']:{
                            name:'Categoria A',
                            items:[]
                        },
                        ['CatB']:{
                            name:'Categoria B',
                            items:[]
                        },
                        ['CatC']:{
                            name:'Categoria C',
                            items:[]
                        }
                    };
                    setJuryColumns(columnsFromBackend)
                    isJuryMounted.current = true
            })
                
            
           
        }
        
    }, [])
    //const [columns, setColumns] = useState(columnsFromBackend)
    const [catA, setCatA] = useState([])
    const [catB, setCatB] = useState([])
    const [catC, setCatC] = useState([])
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
                    jurados:destItems
                }
                setJuryB(data)
            }
            if(source.droppableId == 'CatB'){
                const data = {
                    jurados:sourceItems
                }
                setJuryB(data)
            }
            if(destination.droppableId == 'CatC'){
                const data = {
                    jurados:destItems
                }
                setJuryC(data)
            }
            if(source.droppableId == 'CatC'){
                const data = {
                    jurados:sourceItems
                }
                setJuryC(data)
            }
            if(destination.droppableId == 'CatA'){
                const data = {
                    jurados:destItems
                }
                setJuryA(data)
            }
            if(source.droppableId == 'CatA'){
                const data = {
                    jurados:sourceItems
                }
                setJuryA(data)
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
    return (
        <div style={{display:'flex',justifynombre:'center',height:'100%'}}>
        <DragDropContext onDragEnd={result=>{
            console.log(result)
            onDragEnd(result,juryColumns,setJuryColumns)
        }}>
        {Object.entries(juryColumns).map(([id,column])=>{
            return (
                <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                <h2>{column.name}</h2>
                <div style={{margin:8}}>
                <Droppable droppableId={id} key={id}>
                {(provided,snapshot)=>{
                    
                    return(
                        <div
                        {...provided.droppableProps}
                        ref={provided.innerRef} 
                        style={{
                            backgroundColor:snapshot.isDraggingOver ? 'lightblue' : 'lightgray',
                            width:250,
                            minHeight:200}}                           >
                            {column.items.map((item,index)=>{
                                return(
                                    <Draggable 
                                    key={String(item.codigo)} 
                                    draggableId={String(item.codigo)} 
                                    index={index}>
                                    {(provided,snapshot)=>{
                                        return(
                                            <List dense ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}                                            
                                            style={{
                                              
                                                width: '100%',
                                                maxWidth: 360,
                                                backgroundColor: '#424242',
                                                userSelect:'none',                                                
                                                backgroundColor:snapshot.isDragging ? '#26384A' : '#456C86',
                                                color:'white',
                                                ...provided.draggableProps.style
                                            }}>
                                            <ListItem key={index} button>
                                            <ListItemAvatar>
                                            <Avatar
                                            alt="imagen"
                                            src="/static/images/avatars/avatar_3.png"
                                            />
                                            </ListItemAvatar>
                                            <ListItemText id={index} primary={item.nombres} />                                           
                                            </ListItem>
                                            
                                            </List>
                                            )
                                        }}
                                        </Draggable>
                                        )
                                    })}
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
                            {JSON.stringify(juryA,null,2)}
                            </pre>
                            <pre>
                            {JSON.stringify(juryB,null,2)}
                            </pre>
                            <pre>
                            {JSON.stringify(juryC,null,2)}
                            </pre>
                            
                            </div> */}
                            </div>
                            );
                        }
                        
                        export default AddJury;
                        