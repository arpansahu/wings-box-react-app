import React,  {Component,useState, useEffect} from 'react'
import { Route, BrowserRouter as Router, Switch, Redirect, useHistory } from 'react-router-dom';
import App from './App';
import Header from './components/header';
import Footer from './components/footer';
import Register from './components/auth/register';
import Login from './components/auth/login';
import Logout from './components/auth/logout';
import Create from './components/admin/create';
import jwt_decode from "jwt-decode";
import axiosInstance from './axios';
import HeaderWrapper from './components/headerwrapper';
import Account from './components/auth/account';
import PasswordReset from './components/auth/passwordupdate';
import Activate from './components/auth/activate';
import NotActivated from './components/auth/notactivated';
import ForgetPassword from './components/auth/forgetpassword';
import Reset from './components/auth/reset';

function AppWrapper() {
    // console.log("appwrapper");
    const history = useHistory();
    const [token_var, setToken_var] = useState(localStorage.getItem('access_token'));
    


    useEffect(() => {
        setToken_var(localStorage.getItem('access_token'))
    });


    const ProtectedRoute = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
            // console.log(token_var) && 
            token_var
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
              }} />
        )} 
        />
    );
    // console.log(token_var);
    return (
        <Router>
		<React.StrictMode>
			<Switch>
				{/* {token_var && <ProtectedRoute exact path="/" component={App} />} */}
                <ProtectedRoute exact path="/" component={App} />
				<ProtectedRoute exact path="/admin/create" component={Create} />
				<Route path="/register" component={Register} />
				<Route path="/login" component={Login} />
				<ProtectedRoute path="/logout" component={Logout} />
                <ProtectedRoute exact path="/account" component={Account} />
                <ProtectedRoute exact path="/account/passwordupdate" component={PasswordReset} />
                <Route exact path="/activate/:uidb64/:token" component={Activate}/>
                <ProtectedRoute exact path="/unverified" component={NotActivated}/>
                <Route exact path ="/forget-password" component={ForgetPassword}/>
                <Route exact path="/reset/:uidb64/:token" component={Reset}/>
			</Switch>
			<Footer />
		</React.StrictMode>
	</Router>
    )
}

export default AppWrapper
