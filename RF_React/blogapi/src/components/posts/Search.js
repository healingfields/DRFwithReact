import React , {useState,useEffect} from 'react';
import axiosInstance from '../../axios';
//MaterielUI
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import  Container from '@material-ui/core/Container';
import  Link from '@material-ui/core/Link';
import {useLocation} from 'react-router-dom';





const useStyles = makeStyles((theme)=>({

    Link:{
        margin:theme.spacing(1,1.5),
    },
    cardHeader:{
        backgroundColor:
            theme.palette.type === 'light'
                    ? theme.palette.grey[200]
                    : theme.palette.grey[700],
    },
    postTitle:{
        fontSize:'16px',
        textAlign:'left',
    },
    postText:{
        display:'flex',
        justifyContent:'left',
        alignItems:'baseline',
        fontSize:'12px',
        textAlign:'left',
        marginBottom:theme.spacing(2),
    },
}));

export const Search = () => {
    const classes = useStyles();
    const search = 'search';
    const [appState,setAppState] = useState({
        search:'',
        posts :[],
    });
    useEffect(() => {
        axiosInstance.get(search+ '/' + window.location.search).then((res)=>{
            const allPosts = res.data;
            setAppState({posts:allPosts});
            console.log(allPosts);
        })
    }, [setAppState]);
    return (
        <React.Fragment>
            <Container maxWidth="md" component="main" >
                <Grid container  spacing={2} justifyContent="center" style={{marginTop:'200px'}}>
                    {appState.posts.map((post)=>{
                        return(
                            <Grid item key={post.id} xs={12} md={4} > 
                                   <Card className={classes.card}>
                                    <Link 
                                        color="textPrimary"
                                        href={'post/' + post.slug}
                                        className={classes.link}>
                                    <CardMedia 
                                            component="img"
                                            className={classes.cardMedia}
                                            image={post.image}
                                            title = "image title"
                                    />
                                    </Link>
                                    <CardContent className={classes.CardContent}>
                                        <Typography gutterBottom variant="h6"
                                                    component="h2"
                                                    className={classes.postTitle}
                                                    >
                                                        {post.title.substr(0,50)}
                                        </Typography>
                                        <div className={classes.postText}>
                                            <Typography     
                                                component="p"
                                                color="textPrimary"
                                                >
                                            </Typography>
                                            <Typography     
                                                variant="p"
                                                color="textSecondary"
                                                >
                                                    {post.excerpt.substr(0,60)}...
                                            </Typography>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ) 
                    })}
                </Grid>
            </Container>  
        </React.Fragment>
    );
};
export default Search;
