import { Chip } from '@material-ui/core'
import React from 'react'
import './category.css'
const Save = ({catA:cata, catB:catb, catC:catc,juryA, juryB,juryC}) => {
    
    return (
        <div style={{display:'flex',justifyContent:'space-between'}}>
            <div className="card-wrapper">
                <div className="card-title">
                <h4>Categoria A</h4>
                </div>
                <div className="card-courses">
                {
                    cata.cursos != null &&
                    cata.cursos.map(cat=>
                        (<Chip label={cat.descripcion} variant="outlined" style={{margin:"3px"}}/>)
                    )
                }
                
                </div>
                <div className="card-jury">
                    {
                          juryA.jurados != null &&
                juryA.jurados.map(jur=>
                        (<Chip label={jur.nombres} variant="outlined" style={{margin:"3px"}}/>)
                    )}
                </div>
                
            </div>
            <div className="card-wrapper">
                <div className="card-title">
                <h4>Categoria B</h4>
                </div>
                <div className="card-courses">
                {
                    catb.cursos != null &&
                    catb.cursos.map(cat=>
                        (<Chip label={cat.descripcion} variant="outlined" style={{margin:"3px"}}/>)
                    )
                }
                
                </div>
                <div className="card-jury">
                    {
                        juryB.jurados != null &&
                        juryB.jurados.map(jur=>
                        (<Chip label={jur.nombres} variant="outlined" style={{margin:"3px"}}/>)
                    )}
                </div>
                
            </div>
            <div className="card-wrapper">
                <div className="card-title">
                <h4>Categoria C</h4>
                </div>
                <div className="card-courses">
                {
                     catc.cursos != null &&
                    catc.cursos.map(cat=>
                        (<Chip label={cat.descripcion} variant="outlined" style={{margin:"3px"}}/>)
                    )
                }
                
                </div>
                <div className="card-jury">
                    {
                       juryC.jurados != null &&
                juryC.jurados.map(jur=>
                        (<Chip label={jur.nombres} variant="outlined" style={{margin:"3px"}}/>)
                    )}
                </div>
                
            </div>
        </div>
    )
}

export default Save
