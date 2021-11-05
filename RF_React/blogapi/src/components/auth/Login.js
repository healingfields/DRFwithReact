import React, { useState } from 'react'
import axiosInstance from '../../axios';
import { useHistory } from 'react-router-dom'
//Material UI
import Avatar from  '@material-ui/core/Avatar';
import Button from  '@material-ui/core/Button';
import CssBaseline from  '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme)=>({
    paper:{
        marginTop:theme.spacing(8),
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    },
    avatar:{
        margin:theme.spacing(1),
        backgroundColor:theme.palette.secondary.main,
    }
    
}));

function Login() {
    const history = useHistory();
    const initialFormData = Object.freeze({
        email:'',
        password:'',
    });

    const [formData,setFormData]=useState(initialFormData);

    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value.trim(),
        });
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(formData);

        axiosInstance.post(
            'token/',{
                email:formData.email,
                password:formData.password,
            })
            .then((res)=>{
                localStorage.setItem('access_token',res.data.access);
                localStorage.setItem('refresh_token',res.data.refresh);
                axiosInstance.defaults.headers['Authorization']=
                    'JWT ' + localStorage.getItem('access_token');
                history.push('/');
            });
    };

    const classes=useStyles();
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}></Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form noValidate>
                    <TextField 
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email adress"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={handleChange}

                    />
                    <TextField 
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            type="password"
                            name="password"
                            autoComplete="current-password"
                            onChange={handleChange}
                    />
                    <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                    />
                    <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            >
                        Sing in
                    </Button>


                </form>

            </div>

            
        </Container>
    )
}

export default Login
