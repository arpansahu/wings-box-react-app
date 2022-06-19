import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';

import { useHistory, Link } from 'react-router-dom';
//MaterialUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import HeaderForGuest from '../headerforguest';
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import ErrorIcon from "@material-ui/icons/Error";
import CloseIcon from "@material-ui/icons/Close";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

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
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function SignIn() {
	const history = useHistory();
	
	if (localStorage.getItem('access_token')){
		window.location.reload();
		history.push('/');
	}
	
	const initialFormData = Object.freeze({
		email: '',
	});

	const [formData, updateFormData] = useState(initialFormData);
	const [errorData, updateErrorData] = useState({errorOpen: false,error: ""})
	const errorClose = e => {
		updateErrorData({errorOpen: false,error: ""});
	};
	const [message, updateMessage] = useState({messageOpen: false, data :""})

	const messageClose = e => {
		updateMessage({messageOpen: false, data:""});
	}

	const handleChange = async (e) => {
		updateFormData({
			...formData,
			[e.target.name]: e.target.value.trim(),
		});
	};

	// const [appState, setAppState] = useState(false);


	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log(formData);

		
	axiosInstance
		.post(`user/account/forgetpaassword/`, {
			email: formData.email
		})
		.then((res) => {
			console.log(res)
			updateMessage({messageOpen:true, data:"Passsword reset linked sent Successfully"})
		})
		.catch(function (error) {
			console.log(error.response.status)
			if(error.response.status == 404){
				updateErrorData({errorOpen:true, error:"Account with this email not found"})
			}
		} );
	};


	const classes = useStyles();

	return (
		<div className="App">
			<HeaderForGuest />
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Forget Password ?
				</Typography>

				<form className={classes.form} noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						label="email"
						autoFocus
						onChange={handleChange}	
					/>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Reset Password
					</Button>
					{errorData.error ? (
						<Snackbar
						variant="error"
						key={errorData.error}
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "center"
						}}
						open={errorData.errorOpen}
						onClose={errorClose}
						autoHideDuration={3000}
						>
						<SnackbarContent
							className={classes.error}
							message={
							<div>
								<span style={{ marginRight: "8px" }}>
								<ErrorIcon fontSize="large" color="error" />
								</span>
								<span> {errorData.error} </span>
							</div>
							}
							action={[
							<IconButton
								key="close"
								aria-label="close"
								onClick={errorClose}
							>
								<CloseIcon color="error" />
							</IconButton>
							]}
						/>
						</Snackbar>
					) : null}
					{message.data ? (
						<Snackbar
						variant="success"
						severity="success"
						key={message.data}
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "center"
						}}
						open={message.messageOpen}
						onClose={messageClose}
						autoHideDuration={3000}
						>
						<SnackbarContent
							className={classes.success}
							message={
							<div style={{color:"green"}}>
								<span style={{ marginRight: "8px" }}>
								<CheckCircleOutlineIcon fontSize="large"   />
								</span >
								<span> {message.data} </span>
							</div>
							}
							action={[
							<IconButton
								key="close"
								aria-label="close"
								onClick={messageClose}
							>
								<CloseIcon style={{color:"green"}} />
							</IconButton>
							]}
						/>
						</Snackbar>
					) : null}
				</form>
			</div>
		</Container>
		</div>
	);
}
