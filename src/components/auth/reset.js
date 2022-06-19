import React, { useState, setState } from 'react';
import axiosInstance from '../../axios';
import { useHistory, useParams } from 'react-router-dom';
//MaterialUI
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import HeaderForGuest from '../headerforguest';
import { ValidatorForm,TextValidator } from 'react-material-ui-form-validator';
import VisibilityOffTwoToneIcon from "@material-ui/icons/VisibilityOffTwoTone";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import InputAdornment from '@material-ui/core/InputAdornment';
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
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	passwordEye: {
		color: "rgba(131,153,167,0.9)",
		opacity: 0.7
	},

}));

export default function SignUp() {
	const history = useHistory();
	const {uidb64,token} = useParams();

	const initialFormData = Object.freeze({
		password: '',
		password_two: '',
	});

	const [formData, updateFormData] = useState(initialFormData);

	const handleChange = (e) => {
		updateFormData({
			...formData,
			// Trimming any whitespace
			[e.target.name]: e.target.value
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
		// console.log(formData);

		if(formData.password == formData.password_two && strongRegex.test(formData.password) && strongRegex.test(formData.password_two))
		{
			updatePasswordsMatch({errorOpen: false,error: ""});
			axiosInstance
			.post(`user/account/resetpassword/`, {
				uidb64: uidb64,
				token:token,
				password1: formData.password,
				password2: formData.password_two
			})
			.then((res) => {
				updateMessage({messageOpen:true, data:"Passsword reset Successfully"})
			})
			.catch(function (error) {
				if (error.response) {
					// console.log(error.response.data);
					// console.log(error.response.status);
					// console.log(error.response.headers);
					if(error.response.status == 400){
					updatePasswordsMatch({errorOpen: true,error: "Resent link expired or already used"});
					}
					if(error.response.status == 206){
						updatePasswordsMatch({errorOpen: true,error: "Password do not match"});
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

	
	const classes = useStyles();

	return (
		<div className="App">
			<HeaderForGuest />
			<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper} style={{whiteSpace:"pre-line"}}>
				<Typography component="h1" variant="h5">
					Reset Password
				</Typography>
				<ValidatorForm className={classes.form} noValidate>
					<Grid container spacing={2}>
						
						<Grid item xs={12}>
							{/* <TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								onChange={handleChange}
							/> */}
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

							
						</Grid>
						<Grid item xs={12}>
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
											onClick={showPassword_two}
										/>
										</InputAdornment>
									)
									}
							
								}
								variant="outlined"
								required
								fullWidth
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
						</Grid>
						
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
					</Grid>
					
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						name="submit"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Reset Password
					</Button>
					
				</ValidatorForm>
			</div>
		</Container>
		</div>
	);
}
