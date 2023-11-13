import * as React from 'react';
import {  styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import SearchCustom from "../components/SearchCustom";
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from "@mui/icons-material/Search";
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { red } from '@mui/material/colors';
import CustomButton from '../components/CustomButton';
import CustomCard from "../components/CardCustom";
import MenuForm from "../components/MenuForm";
import styles from "../styles/dashboard.module.css";
import Modal from '../components/Modal';
import {useAuth} from "./../AuthContext";
import { Navigate } from 'react-router-dom';
import CardContainer from '../components/CardContainer';


const drawerWidth = 240;


const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  backgroundColor: '#fc8403',
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};


export default function MiniDrawer() {
    const {user} = useAuth();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [isModalOpen, setModalOpen] = React.useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  }

  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

    if(!user){
        return <Navigate to="/" replace={true} />
    }else {

        return (
          
            <Box sx={{ display: 'flex' }}>
              <CssBaseline />
              <AppBar position="fixed" open={open}>
                <Toolbar>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                      marginRight: 5,
                      ...(open && { display: 'none' }),
                    }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" noWrap component="div">
                    Admin Dashboard
                  </Typography>
                </Toolbar>
              </AppBar>
              <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                  <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                  </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                  {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? 'initial' : 'center',
                          px: 2.5,
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                          }}
                        >
                          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
                <Divider />
                <List>
                  {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? 'initial' : 'center',
                          px: 2.5,
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                          }}
                        >
                          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Drawer>
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {/* Search Bar */}
                <div className={styles.toolContainer}>
                    <SearchCustom />
                    <CustomButton label="New Menu" onClick={openModal}/>   
        
                    <Modal isOpen={isModalOpen} onClose={closeModal}>
                        <MenuForm onClose={closeModal} />
                    </Modal>

        
                </div>
                <CardContainer>
                  <CustomCard title="Menu1" description="menu 1" imageUrl="https://firebasestorage.googleapis.com/v0/b/fatwhale-7fedd.appspot.com/o/images%2FWhatsApp%20Image%202023-10-26%20at%2012.09.10%20PM.jpeg?alt=media&token=4c4cb26b-812a-4840-8cdc-1623480d0020" />
                  <CustomCard title="Menu1" description="menu 1" imageUrl="https://firebasestorage.googleapis.com/v0/b/fatwhale-7fedd.appspot.com/o/images%2FWhatsApp%20Image%202023-10-26%20at%2012.09.10%20PM.jpeg?alt=media&token=4c4cb26b-812a-4840-8cdc-1623480d0020" />
                  <CustomCard title="Menu1" description="menu 1" imageUrl="https://firebasestorage.googleapis.com/v0/b/fatwhale-7fedd.appspot.com/o/images%2FWhatsApp%20Image%202023-10-26%20at%2012.09.10%20PM.jpeg?alt=media&token=4c4cb26b-812a-4840-8cdc-1623480d0020" />
                  <CustomCard title="Menu1" description="menu 1" imageUrl="https://firebasestorage.googleapis.com/v0/b/fatwhale-7fedd.appspot.com/o/images%2FWhatsApp%20Image%202023-10-26%20at%2012.09.10%20PM.jpeg?alt=media&token=4c4cb26b-812a-4840-8cdc-1623480d0020" />
                  <CustomCard title="Menu1" description="menu 1" imageUrl="https://firebasestorage.googleapis.com/v0/b/fatwhale-7fedd.appspot.com/o/images%2FWhatsApp%20Image%202023-10-26%20at%2012.09.10%20PM.jpeg?alt=media&token=4c4cb26b-812a-4840-8cdc-1623480d0020" />

                </CardContainer>

              </Box>
            </Box>
          );
    }

  
}