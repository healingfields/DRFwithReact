import React, { useState } from 'react';
import axiosInstance from '../../axios';
import { useHistory } from 'react-router-dom';
//MaterialUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme)=>({
    paper : {
        marginTop : theme.spacing(10),
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'center',
    },
    avatar : {
        margin : theme.spacing(1),
        backgroundColor : theme.palette.secondary.main,
    },
    form : {
        width : '100%',
        marginTop : theme.spacing(3),
    },
    submit : {
        margin : theme.spacing(3,0,2),
    },
}));
export default function Create() {
    function slugify(string){

        const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
        const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
        const p = new RegExp(a.split('').join('|'),'g');

        return string
                .toString()
                .toLowerCase()
                .replace(/\s+/g, '-') // Replace spaces with -
                .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
                .replace(/&/g, '-and-') // Replace & with 'and'
                .replace(/[^\w\-]+/g, '') // Remove all non-word characters
                .replace(/\-\-+/g, '-') // Replace multiple - with single -
                .replace(/^-+/, '') // Trim - from start of text
                .replace(/-+$/, ''); // Trim - from end of text
    }

    const classes = useStyles();
    const history = useHistory();
    const initialFormData = Object.freeze({
                title : '',
                slug : '',
                excerpt : '',
                content : '',
    });
    const [postImage,setPostImage]=useState(null);
    const [formData,setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        if([e.target.name] == 'image'){
            setPostImage({
                image:e.target.files,
            });
            console.log(e.target.files);
        }
        if([e.target.name]=='title') {
            setFormData({
                ...formData,
                [e.target.name]:e.target.value.trim(),
                ['slug']:slugify(e.target.value.trim()),
            });
        }else{
            setFormData({
                ...formData,
                [e.target.name]:e.target.value.trim(),
            })
        }
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(formData,postImage);
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        let form = new FormData();
        form.append('title',formData.title);
        form.append('slug',formData.slug);
        form.append('author',1);    
        form.append('excerpt',formData.excerpt);
        form.append('content',formData.content);
        form.append('image',postImage.image[0]);
        axiosInstance.post('admin/create/', form);
        setTimeout(()=>{history.push({
            pathname: '/admin/',
        });
        window.location.reload();},30);
        };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div classes={classes.paper}>
            <Avatar className={classes.avatar}></Avatar>
				<Typography component="h1" variant="h5">
					Create New Post
				</Typography>
                <form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="title"
								label="Post Title"
								name="title"
								autoComplete="title"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="excerpt"
								label="Post Excerpt"
								name="excerpt"
								autoComplete="excerpt"
								onChange={handleChange}
								multiline
								rows={4}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="slug"
								label="slug"
								name="slug"
								autoComplete="slug"
								value={formData.slug}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="content"
								label="content"
								name="content"
								autoComplete="content"
								onChange={handleChange}
								multiline
								rows={4}
							/>
						</Grid>
                        <input
                                accept="image/*"
                                className={classes.input}
                                id="post-image"
                                onChange={handleChange}
                                name="image"
                                type="file"
                        />
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Create Post
					</Button>
				</form>
            </div>
        </Container>
    )
}