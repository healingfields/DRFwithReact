import React , {useEffect , useState} from 'react';
import '../App.css';
import Posts from './admin/Posts';
import axiosInstance from '../axios';
import PostLoadingComponent from './posts/PostLoading';

const Admin = () => {
    const PostLoading = PostLoadingComponent(Posts);
    const [appState,setAppState] = useState({
        loading:true,
        posts:null,
    });
    useEffect(()=>{
        axiosInstance.get().then((res)=>{
            const allPosts = res.data ;
            setAppState({loading:false,posts:allPosts});
            console.log(allPosts);
            console.log("data is here");
        });
    },[setAppState]);
    return (
        <div className="App">
            <h1>Latest Admin posts</h1>
            <PostLoading isLoading={appState.loading} posts={appState.posts}/>
        </div>
    );
}
export default Admin
