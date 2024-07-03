import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Logo from '../images/GELogo.png'
//86C232
const Header = () =>{
    return(
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" sx={{backgroundColor: '#D2B48C'}}>
        <Toolbar sx={{justifyContent: 'left', display:'flex', alignItems:'left'}}>
          <img src={Logo} width={40} height={40}/>
          <Typography variant="h6"  component="div" sx={{paddingLeft: '10px', color:'black', fontWeight:'bold'}} >
            GE MarketWatch
          </Typography>
          <Typography variant="subtitle1"  component="div" sx={{paddingLeft: '50px', color:'black', fontStyle: 'italic'}} >
            Money making tool for Old School Runescape
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    )

    
}

export default Header;