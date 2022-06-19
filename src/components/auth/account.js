

import Header from '../header';

import React, { useState, useEffect } from 'react';

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
import axiosInstance from '../../axios';
import { ValidatorForm,TextValidator } from 'react-material-ui-form-validator';
import VisibilityOffTwoToneIcon from "@material-ui/icons/VisibilityOffTwoTone";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import { link, NavLink, useParams } from 'react-router-dom';
import InputAdornment from '@material-ui/core/InputAdornment';
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import ErrorIcon from "@material-ui/icons/Error";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CloseIcon from "@material-ui/icons/Close";
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

export default function FormPropsTextFields() {
    const classes = useStyles();
	const [id, updateId] = useState(null)

    let initialFormData = Object.freeze({
		password: '',
		password_two: '',
	});
	
	const[user_obj, setUser_Obj] = useState({})

	useEffect(() =>
		{
			axiosInstance.get('user/account/')
			.then((res) => {
				const account = res.data;
				// console.log(account)
				setUser_Obj(
					{	
						is_superuser: account.is_staff,
						username: account.username,
						email: account.email,	
				})
				updateFormData({
					username: account.username,
					about: account.about
				})
				updateId(account.id)
			})
			.catch(err => {
				console.log("Inside Error", err);
			});	
		}
		, []
	)
	const [formData, updateFormData] = useState(initialFormData);

    const handleChange = async (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };

	const handleChangeWithSpace = async (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
	const [passwordsMatch, updatePasswordsMatch] = useState({errorOpen: false,error: ""});

	const errorClose = e => {
		updatePasswordsMatch({errorOpen: false,error: ""});
	};	

	const [message, updateMessage] = useState({messageOpen: false, data :""})

	const messageClose = e => {
		updateMessage({messageOpen: false, data:""});
	}

	

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
		if(formData.username == null && formData.about == null
			
			){
				// console.log("Inside first if")
			updatePasswordsMatch({errorOpen: true,error: "Nothing to update"});
		}
		else if(formData.about == null && formData.username)
		{
			updatePasswordsMatch({errorOpen: false,error: ""});
			axiosInstance
			.patch(`user/account/update/` + id + `/`, {
				username: formData.username,
			})
			.then((res) => {
				console.log(res);
				updateMessage({messageOpen: true,data: "Your account details updated Successfully"});
				// console.log(res.data);
				// console.log(res.statusText)
			})
			.catch(function (error) {
				console.log(error);
			} );
		}
		else if (formData.about  && formData.username == null){
			updatePasswordsMatch({errorOpen: false,error: ""});
			axiosInstance
			.patch(`user/account/update/` + id + `/`, {
				about: formData.about,
			})
			.then((res) => {
				console.log(res);
				updateMessage({messageOpen: true,data: "Your account details updated Successfully"});
				// console.log(res.data);
				// console.log(res.statusText)
			})
			.catch(function (error) {
				console.log(error);
			} );
		}
		else{
			updatePasswordsMatch({errorOpen: false,error: ""});
			axiosInstance
			.patch(`user/account/update/` + id + `/`, {
				about: formData.about,
				username: formData.username,
			})
			.then((res) => {
				console.log(res);
				updateMessage({messageOpen: true,data: "Your account details updated Successfully"});
				// console.log(res.data);
				// console.log(res.statusText)
			})
			.catch(function (error) {
				console.log(error);
			} );
		}
	};



	const [hidePassword, setHidePassword] = useState(true);
	const showPassword = () => {
		// console.log("show passsword", + hidePassword)
		setHidePassword(!hidePassword );
		// console.log("After show passsword", + hidePassword)
	};

	const [hidePassword_two, setHidePassword_Two] = useState(true);
	const showPassword_two = () => {
		// console.log("show passsword", + hidePassword_two)
		setHidePassword_Two(!hidePassword_two );
		// console.log("After show passsword", + hidePassword_two)
	};
  return (

        <div className="App">
			<Header />
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}  style={{whiteSpace:"pre-line"}}>
				<Typography component="h1" variant="h5">
					Account Details
				</Typography>
				
				<ValidatorForm className={classes.form} noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						name="email"
						autoComplete="email"
						disabled
                        value={user_obj.email}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="username"
						name="username"
						// label="Username"
						placeholder={formData.username}
						onChange={handleChange}
                        value={formData.username}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						fullWidth
						multiline
						id="about"
						name="about"
						label="About"
						autoFocus
						placeholder={formData.about}
						onChange={handleChangeWithSpace}
                        value={formData.about}
					 
					/>
				
					{passwordsMatch.error ? (
						<Snackbar
						variant="error"
						key={passwordsMatch.error}
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "center"
						}}
						open={passwordsMatch.errorOpen}
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
								<span> {passwordsMatch.error} </span>
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
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Update Account details
					</Button>
					<Button
						href="#"
						color="primary"
						variant="contained"
						fullWidth
						className={classes.submit}
						component={NavLink}
						to="/account/passwordupdate"
					>
						Update Password
					</Button>
				</ValidatorForm>
			</div>
		</Container>
		</div>
  );
}