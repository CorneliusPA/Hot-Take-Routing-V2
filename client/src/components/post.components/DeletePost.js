import { useState } from "react";
import Axios from "axios";
import { useNavigate } from 'react-router-dom';

const DeletePost = ({postData, setPostData}) => {

let id;

let navigateDelPost = useNavigate();

    const deletePost = ({postData}) => {
        Axios.delete(`https://hot-take-react.herokuapp.com/delete/${id}`).then((response) => {
          setPostData(
            postData.filter(({props}) => {
              return props.id != props.id;
            })
          );
        }).then((response) => {

          navigateDelPost('/');

        }).then(() => {

          window.location.reload(false);

        })};

    return ( <>
    
    <button onClick={({props}) => {deletePost(props.id);}}> Delete Post</button>

    </> );
}
 
export default DeletePost;