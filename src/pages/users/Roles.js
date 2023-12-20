import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useFormik} from "formik";
import * as yup from "yup";
import {deleteRole, getUsersRoles, saveRole} from "../../api/RolesApi";
import {MenuItem, Select} from "@mui/material";



function Roles() {
  const [roles, setRoles] = useState([])
  const [open, setOpen] = useState(false);
  const [usersChangeToggle, setUsersChangeToggle] = useState(false);

  const handleDeleteClick = (id) => () => {
    deleteRole(id).then(() => {
        setUsersChangeToggle(!usersChangeToggle)
      })
      .catch(err => console.log(err))
  };

  const columns =[
    {field: "id", headerName: "ID", flex: 1},
    {field: "user",
      headerName: "Логин",
      valueFormatter: (user) => user.value.login, flex: 1},
    {field: "role", headerName: "Роль", flex: 1},
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />
        ];
      },
    }
  ]
  const handleClickOpen = () => {
    setOpen(true);
  };


  const schema = yup.object(
    {
      login:yup.string().required("Логин обязателен"),
      role:yup.string().required("Роль обязательна")

    }
  )
  const formik = useFormik({
    initialValues: {
      login: "",
      role: ""
    },
    validationSchema: schema,
    onSubmit: request => {
      saveRole(request)
        .then(() => {
          setOpen(false);
          setUsersChangeToggle(!usersChangeToggle)
        })
        .catch(err => console.log(err))
    }
  });
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    getUsersRoles()
      .then(usersFromBack => setRoles(usersFromBack))
  }, [usersChangeToggle]);
  return <>
    <DataGrid columns={columns} rows={roles} getRowId={row => row.id}/>
    <br/>
    <Button variant="outlined" onClick={handleClickOpen}>
      Добавить роль
    </Button>
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Добавить роль</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="login"
            label="Логин"
            type="text"
            fullWidth
            value={formik.values.login}
            onChange={formik.handleChange}
            error={formik.touched.login && Boolean(formik.errors.login)}
            helperText={formik.touched.login && formik.errors.login}
            variant="standard"
          />
          <Select
            id="role"
            fullWidth
            value={formik.values.role}
            onChange={formik.handleChange("role")}
            error={formik.touched.role && Boolean(formik.errors.role)}
            helperText={formik.touched.role && formik.errors.role}
            variant="standard"
            label="Роль"
          >
            <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
            <MenuItem value={"USER"}>USER</MenuItem>
          </Select>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button type={"submit"}>Создать</Button>
        </DialogActions>
      </form>
    </Dialog>
  </>
}

export default Roles;