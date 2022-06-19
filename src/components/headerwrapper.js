import React, {useState,useEffect} from 'react'
import Header from './header'
import HeaderForGuest from './headerforguest'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import logo from '../logo.png'
import axiosInstance from '../axios';

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
    
}));

function HeaderWrapper() {
    function refreshPage() {
        window.location.reload(false);
    }

    const classes = useStyles();
    const [token_var, setToken_var] = useState(localStorage.getItem('access_token'));

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
        
    useEffect(() => {
        setToken_var(localStorage.getItem('access_token'))
        // console.log(token_var);
        // refreshPage();
    },[]);

    if(token_var)
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
						href="#"
						color="primary"
						variant="outlined"
						className={classes.link}
						component={NavLink}
						to="/logout"
					>
						LogOut
					</Button>


				</Toolbar>
			</AppBar>
		</React.Fragment>
        
    )
    else{
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
						href="#"
						color="primary"
						variant="outlined"
						className={classes.link}
						component={NavLink}
						to="/login"
					>
						Login
					</Button>


				</Toolbar>
			</AppBar>
		</React.Fragment>
        )
    }

}

export default HeaderWrapper
