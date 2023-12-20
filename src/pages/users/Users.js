import {DataGrid} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import {createUser, getAllUsers} from "../../api/UserApi";
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useFormik} from "formik";
import * as yup from "yup";

const columns =[
  {field: "login", headerName: "Логин", flex: 1},
  {field: "firstName", headerName: "Имя", flex: 1},
  {field: "lastName", headerName: "Фамилия", flex: 1},
  {field: "telegramId", headerName: "Телеграм id", flex: 1}
]

function Users() {
  const [users, setUsers] = useState([])
  const [open, setOpen] = useState(false);
  const [usersChangeToggle, setUsersChangeToggle] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const schema = yup.object(
    {
      login:yup.string().required("Логин обязателен"),
      password:yup.string().required("Пароль обязателен").min(6),
      firstName:yup.string().required("Имя обязательно"),
      lastName:yup.string().required("Фамилия обязательна"),
      telegramId:yup.string().required("Телеграм ID обязателен")
    }
  )
  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
      firstName: "",
      lastName: "",
      telegramId: ""
    },
    validationSchema: schema,
    onSubmit: user => {
      createUser(user)
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
    getAllUsers()
      .then(usersFromBack => setUsers(usersFromBack))
  }, [usersChangeToggle]);
  return <>
    <DataGrid columns={columns} rows={users} getRowId={row => row.login}/>
    <br/>
    <Button variant="outlined" onClick={handleClickOpen}>
      Создать пользователя
    </Button>
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={formik.handleSubmit}>
      <DialogTitle>Создать пользователя</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
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
        <TextField
          autoFocus
          margin="dense"
          id="password"
          label="Пароль"
          type="text"
          fullWidth
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          id="firstName"
          label="Имя"
          type="text"
          fullWidth
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          id="lastName"
          label="Фамилия"
          type="text"
          fullWidth
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          id="telegramId"
          label="Telegram ID"
          type="text"
          fullWidth
          value={formik.values.telegramId}
          onChange={formik.handleChange}
          error={formik.touched.telegramId && Boolean(formik.errors.telegramId)}
          helperText={formik.touched.telegramId && formik.errors.telegramId}
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Отмена</Button>
        <Button type={"submit"}>Создать</Button>
      </DialogActions>
      </form>
    </Dialog>
  </>
}

export default Users;