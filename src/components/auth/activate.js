

import HeaderForGuest from '../headerforguest';
import React, { useState, useEffect } from 'react';
import { link, NavLink, useParams, useHistory } from 'react-router-dom';
//MaterialUI

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axiosInstance from '../../axios';

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
	h4:{
		color: 'green'
	}
}));

export default function FormPropsTextFields() {

	const classes = useStyles();
	const {uidb64,token} = useParams()
	
	const[message, setMessage] = useState('')
	const history = useHistory();

	console.log(uidb64, token)
	axiosInstance
	.post(`user/account/activate/`, {
		uidb64: uidb64,
		token: token
	})
	.then((res) => {
		setMessage(res.data)
		setTimeout(function(){ history.push('/logout'); }, 5000);
	})
	.catch(err => {
		console.log("Inside Error", err);
	});	
	

  return (

        <div className="App">
			<HeaderForGuest />
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}  style={{whiteSpace:"pre-line"}}>
				<h4 className={classes.h4}>{message}</h4>
				<Button
					href="#"
					color="primary"
					variant="contained"
					fullWidth
					className={classes.submit}
					component={NavLink}
					to="/login"
				>
					Login Here
				</Button>
			</div>
		</Container>
		</div>
  );
}