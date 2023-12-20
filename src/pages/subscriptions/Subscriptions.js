import {DataGrid} from "@mui/x-data-grid";

const columns =[
  {field: "id", headerName: "Логин", flex: 1},
  {field: "user", headerName: "Имя", flex: 1},
  {field: "page", headerName: "Фамилия", flex: 1}
]

const row =[
  {id: 1, user: 1, page: 1},
  {id: 2, user: 1, page: 2},
  {id: 3, user: 2, page: 1}
]

function Subscriptions() {
  return <DataGrid columns={columns} rows={row} getRowId={row => row.id}/>
}

export default Subscriptions;