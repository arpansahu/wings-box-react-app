import React, { useEffect, useState } from 'react';
import './App.css';
import Posts from './components/admin/posts';
import PostLoadingComponent from './components/posts/postLoading';
import axiosInstance from './axios';
import { useHistory } from 'react-router';

function Admin() {
	const history = useHistory();
	const PostLoading = PostLoadingComponent(Posts);
	const [appState, setAppState] = useState({
		loading: true,
		posts: null,
	});

	useEffect(() => {
		axiosInstance.get().then((res) => {
			const allPosts = res.data;
			setAppState({ loading: false, posts: allPosts });
		})
		.catch(err => {
			// what now?
			console.log("Inside Error", err);
			history.push('/login');
		})
		;
	}, [setAppState, localStorage.getItem('access_token')])

	return (
		<div className="App">
			{/* <h1>Latest Posts</h1> */}
			<PostLoading isLoading={appState.loading} posts={appState.posts} />
		</div>
	);
}
export default Admin;
