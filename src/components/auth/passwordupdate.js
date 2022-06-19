

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
					password:'',
					password_two:'',
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

	
	const [passwordsMatch, updatePasswordsMatch] = useState({errorOpen: false,error: ""});

	const errorClose = e => {
		updatePasswordsMatch({errorOpen: false,error: ""});
	};	

	const [message, updateMessage] = useState({messageOpen: false, data :""})

	const messageClose = e => {
		updateMessage({messageOpen: false, data:""});
	}

	const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,20})");

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
		if(
			(formData.password && !strongRegex.test(formData.password)) || (formData.password_two && !strongRegex.test(formData.password_two) )
			){
				// console.log("Inside first if")
			updatePasswordsMatch({errorOpen: true,error: "PAssword Should be strong enough and username cant be empty"});
		}
		else if(formData.password == formData.password_two)
		{
			updatePasswordsMatch({errorOpen: false,error: ""});
			axiosInstance
			.patch(`user/account/passwordchange/`+ id + `/`, {
				password: formData.password,
				password2: formData.password_two
			})
			.then((res) => {
				console.log(res);
				updateMessage({messageOpen: true,data: "Your password updated Successfully"});
				// console.log(res.data);
				// console.log(res.statusText)
			})
			.catch(function (error) {
				if (error.response) {
				
					if (error.response.status == 403){
					updatePasswordsMatch({errorOpen: true,error: "User already Registered"});
					// document.getElementById("invalid user").innerHTML = 'No active account found with the given credentials';
					}
					if(error.response.status == 400){
					updatePasswordsMatch({errorOpen: true,error: "Your Input Details are incorect"});
					}
				}
			} );
		}
		else if(formData.password != formData.password_two){
			updatePasswordsMatch({errorOpen: true,error: "Both passwords should be same"});
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
					
					<TextValidator
						type={hidePassword ? "password" : "input"}
						InputProps={hidePassword ? { 
							endAdornment: (
								<InputAdornment position="end">
								<VisibilityOffTwoToneIcon
									fontSize="default"
									className={classes.passwordEye}
									onClick={showPassword}
								/>
								</InputAdornment>
							)
							} : {
							endAdornment: (
								<InputAdornment position="end">
								<VisibilityTwoToneIcon
									fontSize="default"
									className={classes.passwordEye}
									onClick={showPassword}
								/>
								</InputAdornment>
							)
							}
					
						}
						variant="outlined"
						required
						fullWidth
						margin="normal"
						name="password"
						label="Password"
						id="password"
						autoComplete="current-password"
						onChange={handleChange}
						value={formData.password}
						validators={['required' , 'matchRegexp:^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,20})']
						}
						errorMessages={[
							'this field is required',
							`The password must contain at least 1 lowercase alphabetical character
							The password must contain at least 1 uppercase alphabetical character 
							The password must contain at least 1 numeric character
							The string must contain at least one special character
							password length  should be 8-20` ,
							]
						}	
						
					/>

					
					<TextValidator
						type={hidePassword_two ? "password" : "input"}
						InputProps={hidePassword_two ? { 
							endAdornment: (
								<InputAdornment position="end">
								<VisibilityOffTwoToneIcon
									fontSize="default"
									className={classes.passwordEye}
									onClick={showPassword_two}
								/>
								</InputAdornment>
							)
							} : {
							endAdornment: (
								<InputAdornment position="end">
								<VisibilityTwoToneIcon
									fontSize="default"
									className={classes.passwordEye}
									onClick={showPassword}
								/>
								</InputAdornment>
							)
							}
					
						}
						variant="outlined"
						required
						fullWidth
						margin="normal"
						marginTop="10"
						name="password_two"
						label="Confirm Password"
						id="password_two"
						autoComplete="current-password"
						onChange={handleChange}
						value={formData.password_two}
						validators={['required' , 'matchRegexp:^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,20})']
						}
						errorMessages={[
							'this field is required',
							`The password must contain at least 1 lowercase alphabetical character
							The password must contain at least 1 uppercase alphabetical character 
							The password must contain at least 1 numeric character
							The string must contain at least one special character
							password length  should be 8-20` ,
							]
						}
						
					/>
				
					{/* <h4 id="invalid user" style={{color:'red', alignContent:"centre", width:"auto", margin:"auto"}}></h4> */}
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
						
				</ValidatorForm>
			</div>
		</Container>
		</div>
  );
}