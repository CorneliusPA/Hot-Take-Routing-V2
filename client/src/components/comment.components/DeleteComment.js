import { useState } from "react";
import Axios from "axios";
import { useNavigate } from 'react-router-dom';

const DeleteComment = ({commentData, setCommentData}) => {

  let navigateDelComment = useNavigate();

    const deleteComment = (id) => {
        Axios.delete(`https://hot-take-react.herokuapp.com/deleteComment/${id}`).then((response) => {
          setCommentData(
            commentData.filter((props) => {
              return props.id != id;
            })
          );
        }).then((response) => {

          navigateDelComment('/');
        }).then(() => {

          window.location.reload(false);

        })};

return ( 
<>

    <button onClick={(props) => {deleteComment(props.id)}}> Delete Comment </button>

</> 
)}
 
export default DeleteComment;