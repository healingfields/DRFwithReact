import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles'; 
import { NavLink } from 'react-router-dom';
import Button  from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import {useHistory} from 'react-router-dom';
import SearchBar from 'material-ui-search-bar';

const useStyles = makeStyles((theme)=>({
    appBar:{
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    link:{
        margin:theme.spacing(1,1.5),
    },
    toolbarTitle:{
        flexGrow:1,
    },
}));
function Header(){
    const classes = useStyles();
    let history = useHistory();
    const [data, setData] = useState({search:''});

    const goSearch = (e) =>{    
        history.push({
            pathname:'/search/',
            search:'?search='+ data.search,
        });
        window.location.reload();
    };
    return(    
    <React.Fragment>
        <CssBaseline/>
        <AppBar 
        position="static"
        color="primary"
        elevation={0}
        className={classes.appBar}>

            <Toolbar>
                <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}> 
                    <Link component={NavLink}
                            to="/"
                            underline="none"
                            color="textPrimary">
                        BlogMeUP
                    </Link>
                </Typography>

                <SearchBar value={data.search}
                            onChange={(newValue)=>setData({search:newValue})}
                            onRequestSearch={()=>goSearch(data.search)}
                />

                <nav>
                    <Link 
                    color="textPrimary"
                    href="#"
                    className={classes.link}
                    component={NavLink}
                    to="/register">
                        Register
                    </Link>
                </nav>
                    <Button href="#"
                            color="textPrimary"
                            variant="outlined"
                            className={classes.link}
                            component={NavLink}
                            to="/login">
                        login
                    </Button>
                    <Button href="#"
                            color="textPrimary"
                            variant="outlined"
                            className={classes.link}
                            component={NavLink}
                            to="/logout">
                        Logout
                    </Button>
            </Toolbar>
        </AppBar>
    </React.Fragment>);
}
export default Header