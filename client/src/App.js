
import './index.css';
import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from './components/nav.components/Home';
import Post from './components/post.components/Post';
import CreatePost from './components/post.components/CreatePost';
import CreateUser from './components/user.components/CreateUser';
import Axios from "axios";
import Profile from './components/user.components/Profile';


function App() {

const [userData , setUserData] = useState([]);
const [postData , setPostData] = useState([]);
const [commentData , setCommentData] = useState([]);

useEffect(() => {
  Axios.get(`https://hot-take-react.herokuapp.com/user_profile`).then((response) => {
    setUserData(response.data);
    
  });
}, []);

useEffect(() => {
  Axios.get(`https://hot-take-react.herokuapp.com/user_post`).then((response) => {
    setPostData(response.data);
    
  });
}, []);

useEffect(() => {
  Axios.get(`https://hot-take-react.herokuapp.com/post_comment`).then((response) => {
    setCommentData(response.data);
    
  });
}, []);

  return (
<Router>

<nav>
<Link className='navLink' to="/">Home</Link>
<Link className='navLink' to="/CreateUser">Create User</Link>
<Link className='navLink' to="/CreatePost">Create Post</Link>
</nav>

<Routes>
<Route exact path="/" element={<Home userData={userData} postData={postData} commentData={commentData}/>}/>
<Route path="/Profile" element={<Profile userData={userData} postData={postData} commentData={commentData}/>}/>
<Route path="/posts/:profile_id/:id" element={<Post userData={userData} postData={postData} setPostData={setPostData} commentData={commentData} setCommentData={setCommentData}/>}/>
<Route path="/CreatePost" element={<CreatePost userData={userData} commentData={commentData}/>}/>
<Route path="/CreateUser" element={<CreateUser userData={userData} commentData={commentData}/>}/>
</Routes>
</Router>  
  
)}

export default App;
