import React,{useEffect,useState} from 'react';
import './App.css';
import Posts from './components/Posts';
import PostLoadingComponent from './components/PostLoading';
import axiosInstance from './axios';
import {useHistory} from 'react-router-dom';
function App() {
  const PostLoading = PostLoadingComponent(Posts);
  const history = useHistory();
  const [appState,setAppState]=useState({
    loading:false,
    posts:null,
  });
  useEffect(() => {
    axiosInstance.get().then((res)=>{
      const allPosts = res.data;
      setAppState({loading : false, posts : allPosts});
      console.log(res.data);
    }).catch((error)=>{
      if(error.response.status === 401 &&
        error.response.statusText === 'Unauthorized'){
            history.push("/login"); 
    }
    })
    }, [setAppState]);
  return (
    <div className='App'>
      <h1>
        latest posts
      </h1>
      <PostLoading isLoading={appState.loading} posts={appState.posts}/> 
    </div>
  )
};

export default App
