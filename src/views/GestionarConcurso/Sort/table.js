import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {CSVLink, CSVDownload} from 'react-csv';
const csvData =[
  ['firstname', 'lastname', 'email'] ,
  ['John', 'Doe' , 'john.doe@xyz.com'] ,
  ['Jane', 'Doe' , 'jane.doe@xyz.com']
];
const columns = [
  { field: 'id', headerName: 'ID', width: 40 },
  { field: 'nombreProyecto', headerName: 'Proyecto', width: 220 },
  { field: 'nombreGrupo', headerName: 'Grupo', width: 140 },
];
class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.data = props.data
  }
  render() {
  return (
    <div>
    <div style={{ height: 300, width: 400 }}>
      <DataGrid rows={this.props.data} columns={columns} pageSize={5} checkboxSelection />
      
    </div>
    <br></br>
    <CSVLink data={this.props.data.map(d=>([d.id,d.nombreGrupo,d.nombreProyecto]))} >Descargame</CSVLink>  
    </div>
  );
  }
}
export default DataTable
// export default function DataTable({data}) {
//   return (
//     <div>
//     <div style={{ height: 300, width: 400 }}>
//       <DataGrid rows={data} columns={columns} pageSize={5} checkboxSelection />
      
//     </div>
//     <br></br>
//     <CSVLink data={csvData} >Download me</CSVLink>  
//     </div>
//   );
// }
