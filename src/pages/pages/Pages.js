import {DataGrid} from "@mui/x-data-grid";

const columns =[
  {field: "id", headerName: "ID", flex: 1},
  {field: "name", headerName: "Название", flex: 1},
  {field: "url", headerName: "URL", flex: 1},
  {field: "parsingXPath", headerName: "parsingXPath", flex: 1}
]

const row =[
  {id: 1, name: "Название1", url: "URL1", parsingXPath: "parsingXPath1"},
  {id: 2, name: "Название2", url: "URL2", parsingXPath: "parsingXPath2"},
  {id: 3, name: "Название3", url: "URL3", parsingXPath: "parsingXPath3"},

]

function Pages() {
  return <DataGrid columns={columns} rows={row} getRowId={row => row.id}/>
}

export default Pages;