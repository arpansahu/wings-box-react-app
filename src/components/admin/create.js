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
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Header from '../header';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},

}));

export default function Create() {

	const history = useHistory();
	const initialFormData = Object.freeze({
	});

	const [postData, updateFormData] = useState(initialFormData);
	const [postimage, setPostImage] = useState(null);

	const handleChange = (e) => {
		if ([e.target.name] == 'image') {
			setPostImage({
				image: e.target.files,
			});
			console.log(e.target.files);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('image', postimage.image[0]);
		axiosInstance.post(`upload/`, formData).then((res) =>{
			alert(res.data.message);
		});
		
	};


	const classes = useStyles();

	return (
		<div className="App">
			<Header />
			<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				{/* <Avatar className={classes.avatar}></Avatar> */}
				<Typography component="h1" variant="h5">
					Upload New Json
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						
						<Button
							align='center'
							variant="contained"
							component="label"
							style={{margin: '0 auto'}}
							>
							<input
							accept="file/*"
							// className={classes.input}
							id="post-image"
							onChange={handleChange}
							name="image"
							type="file"
							style={{ display: 'none'}}
							/>
							<Button variant="contained" component="span">
								Upload
							</Button>
						</Button>

					</Grid>
					
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Upload File
					</Button>
				</form>
			</div>
		</Container>
		</div>
	);
}