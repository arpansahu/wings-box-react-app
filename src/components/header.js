import React, {useState, useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import { link, NavLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import logo from '../logo.png'
import { useHistory } from 'react-router-dom';
import axiosInstance from '../axios';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


const useStyles = makeStyles((theme) => ({
	appBar: {
		// borderBottom: `px solid ${theme.palette.divider}`,
		color: 'white'
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	toolbarTitle: {
		flexGrow: 1,
	},
	toolbar: {
		minHeight: '100px',
	},
	logo: {
		maxWidth: 80,
		maxHeight: 80,
		borderRadius: 10,
		flexGrow: 1,
	},
	back: {

		alignSelf: 'center',
		color: "primary",
		marginBlockStart: 0,
		marginBlockEnd: 0,
		
	},
}));

function Header() {
	let history = useHistory();

	let token_var =localStorage.getItem('access_token');
	let user_obj = {}
	
	
	const[appState, setsppState] = useState(
			{	
				token:token_var, 
				user_data : user_obj
			}
		)
	const useReactPath = () => {
		const [path, setPath] = React.useState(window.location.pathname);
		const listenToPopstate = () => {
			const winPath = window.location.pathname;
			setPath(winPath);
		};
		React.useEffect(() => {
			window.addEventListener("popstate", listenToPopstate);
			return () => {
			window.removeEventListener("popstate", listenToPopstate);
			};
		}, []);
		return path;
	};
	const path = useReactPath();
	useEffect(
		()=>{
			axiosInstance.get('user/account/')
				.then((res) => {
					const account = res.data;
					// console.log(account)
					user_obj = {
						is_superuser: account.is_staff,
						username: account.username,
						email: account.email,
						id: account.id,
						is_active: account.is_active,
					}

					setsppState(
						{	
						token:localStorage.getItem('access_token'), 
						user_data : user_obj
					}
					)
					if(!account.is_active)
					{
						history.push('/unverified')
					}
				})
				.catch(err => {
					console.log("Inside Error", err);
				});

		}, [path, localStorage.getItem('access_token')]
	)
	// console.log(appState['user_data'].is_superuser, path);		
	

	const classes = useStyles();

	const goBack = () => {
		history.goBack()
	}

	

	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar
				position="static"
				color="default"
				elevation={0}
				className={classes.appBar}
			>
				<Toolbar className={classes.toolbar}>
					<Link
							component={NavLink}
							to="/"
						>
							<img src={logo} alt="Wings Box Logo" className={classes.logo}/>
					</Link>
					
					<Typography
						variant="h6"
						color="inherit"
						noWrap
						className={classes.toolbarTitle}
					>
						{/* <Link
							component={NavLink}
							to="/"
							underline="none"
							color="textPrimary"
						>
							Blog and Blob
						</Link> */}
					</Typography>
					<Button
						marginLeft="auto"
						marginRight="auto"
						// variant="outlined"
						className={classes.back}
						// component={NavLink}
					>
						<h1 className={classes.back}onClick={goBack}> 
							<ArrowBackIcon />
						</h1>
					</Button>
					
					<Button
						href="#"
						color="primary"
						variant="outlined"
						className={classes.link}
						component={NavLink}
						to="/admin/create"
					>
						Upload Posts
					</Button> 

					<Button
						href="#"
						color="primary"
						variant="outlined"
						className={classes.link}
						component={NavLink}
						to={"/account/"}
					>
						My Account
					</Button>
					<Button
						href="#"
						color="primary"
						variant="outlined"
						className={classes.link}
						component={NavLink}
						to="/logout"
					>
						Logout
					</Button>

				</Toolbar>
				{/* {appState['user_data'].username} */}
			</AppBar>

			
						
		</React.Fragment>
	);
}

export default Header;
