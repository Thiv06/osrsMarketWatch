import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
//86C232
const Header = () =>{
    return(
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" sx={{backgroundColor: '#D2B48C'}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            GE MarketWatch
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    )

    
}

export default Header;