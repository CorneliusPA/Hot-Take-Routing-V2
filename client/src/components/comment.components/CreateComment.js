import { useState, useRef } from "react";
import Axios from "axios";
import Tooltip from "../post.components/Tooltip";
import { useNavigate } from 'react-router-dom';

const CreateComment = ({userData, postData, commentData, id}) => {

  const profileIDHandler = (event) => {

    
    {userData.filter((props) => props.user_name === user_name).map((props) => (
    
      setProfile_id(props.id)
          
      ))}

  }

  const [user_name, setUser_name] = useState("")
  const [profile_id, setProfile_id] = useState(0)
  const [post_id, setPost_id] = useState(id)
  const [comment_text, setComment_text] = useState("")
  const [media_location, setMedia_location] = useState("")

  
  const [fileName, setFileName] = useState('');
  const [base64, setBase64] = useState(null);

  
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);
  const formRef = useRef(null);

  let navigateComment = useNavigate();

  const [commentList, setCommentList] = useState([])

  
  const handleClick = () => inputRef && inputRef.current && inputRef.current.click();

  const createBase64Image = (file) => {
    const reader = new FileReader();
    return new Promise(function (resolve, reject) {
      reader.onload = function (event) {
        resolve(event.target.result)
      }
      reader.readAsDataURL(file);
    })
  }

  const handleFiles = async (e) => {
    if (e.target.files[0]) {
      const base64 = await createBase64Image(e.target.files[0]);
      
      setBase64(base64);
      setFileName(e.target.files[0].name);
    }
  }

  const addComment = () => {
    Axios.post(`https://hot-take-react.herokuapp.com/createComment`, {

          user_name: user_name,
          profile_id: profile_id,
          post_id: post_id,
          comment_text: comment_text,
          media_location: media_location,
          fileName: fileName,
          base64: base64,

    }).then((response) => {
      setCommentList([
        ...commentList,
        {

          user_name: user_name,
          profile_id: profile_id,
          post_id: post_id,
          comment_text: comment_text,
          media_location: media_location,
          fileName: fileName,
          base64: base64,
        },
      ])
    }).then((response) => {

      navigateComment('/');
    }).then(() => {

      window.location.reload(false);

    })};

return ( 
<div className="information">
    <div className="userCommentSelectContainer"> 
        <div className="userCommentSelect">
            
                <label>Username:</label>
        
 <select className="commentSelect" id="id" name="username" 
 onChange={(event) => {setUser_name(event.target.value);}} 
 onClick={profileIDHandler}>

               <option >Username</option>

{userData.map((props, key) => (
  
        <option key={props.id} value={props.user_name}>{props.user_name}</option>
    
))}
               </select>

            
              <input className="hidden postTitleInput"
                 type="text"
                 placeholder="User ID..."
                 value={JSON.stringify(profile_id)}
                 onChange={(event) => {
                 setProfile_id(event.target.value);}}
          />
         
     </div>
</div>
          <div>

                <label className="hidden">user_name</label>
                <input 
                      type="text"  className="textForm hidden"
                      onChange={() => user_name}
                />

                <label className="hidden">profile_id</label>
                <input className="textForm hidden"
                      type="number"
                      onChange={() => profile_id}
                />

                <label className="hidden">post_id</label>
                <input className="textForm hidden"
                      type="number"  
                      onChange={() => post_id}
                />

                <div>
                <label>Comment Text:</label>

                <textarea className="textareaInput textareaSize"
                  type="text"
                  rows="4" cols="53" 
                  placeholder="Would you like to respond?..."
                  onChange={(event) => {
                    setComment_text(event.target.value);
                  }}
                />
               </div>


               <div>

                <label>Image:</label>

      <div className="mui--text-dark-secondary mui--text-button">{message}</div>
      <div className="upload-box" onClick={handleClick}>
      <hr /> Select File <hr />

        {fileName}
      
        <img className="inputImage" src={base64} alt=""/>
      
      </div>
      <input type="file" ref={inputRef} onChange={handleFiles} style={{ display: 'none' }} accept="image/*" />
     
      <input className="hidden postTitleInput"
                 type="text"
                 placeholder="Title..."
                 value={JSON.stringify(fileName)}
                 onChange={(event) => {
                 setFileName(event.target.value);}}
          />

      <input className="hidden postTitleInput"
                 type="text"
                 placeholder="Title..."
                 value={JSON.stringify(base64)}
                 onChange={(event) => {
                 setBase64(event.target.value);}}
          />

           </div>

          </div>
     <button  onClick={addComment}> Submit Comment </button>      
</div>
        
       
     );
}
 
export default CreateComment;