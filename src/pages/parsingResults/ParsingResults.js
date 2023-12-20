import {DataGrid} from "@mui/x-data-grid";

const columns =[
  {field: "id", headerName: "ID", flex: 1},
  {field: "page", headerName: "ID cтраницы", flex: 1},
  {field: "parsingDateTime", headerName: "Дата парсинга", flex: 1},
  {field: "result", headerName: "Результат парсинга", flex: 1},
  {field: "sent", headerName: "Отправлено?", flex: 1}
]

const row =[
  {id: 1, page: 1, parsingDateTime: "21.12.2023", result: "12", sent: true}
]

function ParsingResults() {
  return <DataGrid columns={columns} rows={row} getRowId={row => row.id}/>
}

export default ParsingResults;