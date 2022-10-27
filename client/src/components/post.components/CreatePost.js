import { useState, useRef} from "react";
import Axios from "axios";
import Tooltip from "./Tooltip";
import { useNavigate } from 'react-router-dom';


const CreatePost = ({userData,commentData}) => {

  const profileIDHandler = (event) => {

    
    {userData.filter((props) => props.user_name === user_name).map((props) => (
    
      setProfile_id(props.id)
          
      ))}

  }

  
 

    const [user_name, setUser_name] = useState("")
    const [profile_id, setProfile_id] = useState(0)
    const [post_title, setPost_title] = useState("")
    const [written_text, setWritten_text] = useState("")
    const [media_location, setMedia_location] = useState('')
    const [media_locationName, setMedia_locationName] = useState('')
    const [uploaded_image, setUploaded_image] = useState(null)

    const [fileName, setFileName] = useState('');
    const [base64, setBase64] = useState(null);
   
    const [message, setMessage] = useState('');
    const inputRef = useRef(null);
    const formRef = useRef(null);

    let navigate = useNavigate();

    const [postList, setPostList] = useState([])


    

  

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



    const addPost = () => {
        Axios.post(`https://hot-take-react.herokuapp.com/createPost`, {
            user_name: user_name,
            profile_id: profile_id,
           post_title: post_title,
          written_text: written_text,
          media_location: media_location,
          fileName: fileName,
          base64: base64,
         

        }).then((response) => {
          setPostList([
            ...postList,
            {
            user_name: user_name,
            profile_id: profile_id,
            post_title: post_title,
            written_text: written_text,
            media_location: media_location,
            fileName: fileName,
            base64: base64,

            },
          ]);
        }).then((response) => {

          navigate('/');

        }).then(() => {

          window.location.reload(false);

        })};

    return ( 
<div>
    <div className="information">
        <div className="userPostSelectContainer"> 

            <div className="userPostSelect">
                
                    <label>Username:</label>
                    <select id="id" name="username" 
                    onChange={(event) => {setUser_name(event.target.value);}}  
                    onClick={profileIDHandler}
                    >
                          <option >Select a Username</option>

{userData.map((props) => (
        
<option key={props.id} value={props.user_name} id={props.id}>{props.user_name}</option>

))}
                    </select>


     <div className="hidden example-wrapper">
    
            <label >User ID:</label>
         
        
      </div>
 
  <input className="hidden postTitleInput"
                 type="text"
                 placeholder="Title..."
                 value={JSON.stringify(profile_id)}
                 onChange={(event) => {
                 setProfile_id(event.target.value);}}
          />
  

            </div>
      </div>

      <div className="informationBox" >
   

                <div>
          <label>Post Title:</label>

          <input className="postTitleInput"
                 type="text"
                 placeholder="Title..."
                 onChange={(event) => {
                 setPost_title(event.target.value);}}
          />

          <label>Written Text:</label>
          <textarea className="textareaInput"
                    type="text" rows="4" cols="45"
                    placeholder="Would you like to respond?..."
                    
                    onChange={(event) => {
                    setWritten_text(event.target.value);}}
          />
              
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


                <button onClick={addPost}> Submit Post </button>
            



                </div>               
          </div>
     </div>      
</div>
     );
}
 
export default CreatePost;