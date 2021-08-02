import Axios from 'axios'
import React, { useEffect, useState } from 'react'

const ComponentTitle = ({id}) => {
    const [titulo, settitulo] = useState('')
    useEffect(() => {
            console.log(id)
         Axios.get(`http://localhost:4000/projectos/id/${id}`).then(response=>{
            console.log(response.data.nombreProyecto)
            settitulo(response.data.nombreProyecto )
          } )

    }, [])

    return (
        <>
            {titulo}
        </>
    )
}

export default ComponentTitle
