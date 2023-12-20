import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import AppHeader from "./AppHeader";
import {Routes} from "react-router"
import {Route} from "react-router";
import Landing from "./pages/landing/Landing";
import Users from "./pages/users/Users";
import Subscriptions from "./pages/subscriptions/Subscriptions";
import ParsingResults from "./pages/parsingResults/ParsingResults";
import Pages from "./pages/pages/Pages";
import Error404 from "./pages/error/Error404";
import Roles from "./pages/users/Roles";

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function App() {
  const [open, setOpen] = React.useState(false);

  return (
    <Box sx = {{display: 'flex'}}>
      <AppHeader open={open} setOpen={setOpen}/>
      <Main open={open}>
        <DrawerHeader />
        <Routes>
          <Route path="/" exact element ={<Landing/>}/>
          <Route path="/users" exact element={<Users/>}/>
          <Route path="/roles" exact element={<Roles/>}/>
          <Route path="/subscriptions" exact element ={<Subscriptions/>}/>
          <Route path="/pages" exact element ={<Pages/>}/>
          <Route path="/parsingResults" exact element ={<ParsingResults/>}/>
          <Route path="/*" element ={<Error404/>}/>
        </Routes>
      </Main>
    </Box>
  );
}