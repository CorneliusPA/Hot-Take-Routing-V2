import React from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import DeletePost from './DeletePost';

const PostCard = ({userData, postData, setPostData} ) => {
    
    
  const deletePost = (id) => {
        Axios.delete(`https://hot-take-react.herokuapp.com/deletePost/${id}`)
        .then(() => {

          window.location.reload(false);
    
        })};
      


    return ( 
    < section> 
     {postData.map((props, key) => (
      <div key={props.id} className='postFeedContainer'>
        <div  className="postFeed">
            <div className='postFeedUsername'>{props.user_name}</div>
               <div className='postFeedTitle'>{props.post_title}</div>          
  
                 
                 
                  <Link to = {`/posts/${props.profile_id}/${props.id}`}> 
                       <div className='A viewButton'> View More</div>
                  </Link>      
                     
                  <button className='B deleteButton'  onClick={() => { deletePost(props.id);}}> Delete Post</button>
       
        
        </div>  
      </div>
    ))}
    
    </section> );
}
 
export default PostCard;