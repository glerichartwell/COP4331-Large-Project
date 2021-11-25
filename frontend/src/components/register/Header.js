import { AppBar, Toolbar } from "@mui/material";

const Header = () => {

  return (
      <AppBar sx={{background: '#37123C', justifyContent: 'center', textAlign: 'center', height: '17vh'}}>
        <Toolbar sx={{marginBottom: '-1%', paddingTop: '1%', fontSize: 32, textAlign: 'center', justifyContent: 'center',}}>Welcome to CourtneyGenix!</Toolbar>
        <Toolbar sx={{textAlign: 'center', justifyContent: 'center',}}>This is just the beginning!</Toolbar>
      </AppBar>
  );
}

export default Header;