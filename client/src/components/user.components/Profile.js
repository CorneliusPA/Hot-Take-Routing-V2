import React from 'react';
import {useState} from 'react'
import {useParams, useNavigate} from "react-router-dom";
import CreateComment from '../comment.components/CreateComment';
import DeletePost from '../post.components/DeletePost';
import DeleteComment from '../comment.components/DeleteComment';
import Axios from 'axios';

const Profile = ({userData, postData, setPostData, commentData}) => {

    const [ updatePost, setUpdatePost] = useState("")
    const [ updateComment, setUpdateComment] = useState("");

    const editPost = (id) => {
      Axios.put("https://hot-take-react.herokuapp.com/updatePost", { written_text: updatePost, id: id }).then(
        (response) => {
          setPostData(
            postData.map((props) => {
              return props.id == id
                ? {
                    id: props.id,
                    post_id: props.post_id,
                    post_title: props.post_title,
                    written_text: updatePost,
                    media_location: props.media_location,
                    user_name: props.user_name,
                  }
                : props.id;
            })
          );
        }
      );
    };
  
    const deletePost = (id) => {
      Axios.delete(`https://hot-take-react.herokuapp.com/deletePost/${id}`).then((response) => {
        setPostData(
          postData.filter(({props}) => {
            return props.id != id;
          })
        );
      });
    };
  
    const { profile_id ,id } = useParams();
  let navigate = useNavigate();
  

    return ( 
    <>
 {userData.filter((props) => props.user_name === "Soul-0").map((props) => (
        <div key={props.id} className="headerFeed">
            <h1>Welcome :{props.full_name}</h1>
            <p>{props.user_name}</p>
        </div>
    ))}

    
<section className='full'>
        <div className="container">
         

{postData.filter((props) => props.id == id).map((props) => (
        <div key={props.id} className="card post">
          <h1>{props.user_name}</h1>
            
            <h1>{props.post_title}</h1>
            <p>{props.written_text}</p>
            <img src={props.media_location} alt="Post Image" width="100px" height="150px"/>
           
            <input type="text"  className="textForm" placeholder='Edit Post?'
           onChange = {(event) => {setUpdatePost(event.target.value);}}/>
        
        <div>
            <button onClick={() => editPost(props.id)}>Edit</button>
            <button onClick={() => {deletePost(props.id)}}> <a href="http://localhost:3000/">DELETE</a></button>
        </div>    

        </div>       
    ))}

        </div>
        <button onClick={() => { navigate("/"); }} >Return</button>
    </section>


    </>
     );
}
 
export default Profile;