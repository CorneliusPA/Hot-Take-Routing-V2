import { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from "axios";


const CreateUser = ({userData,commentData}) => {
    
    const [full_name, setFull_name] = useState("");
    const [user_name, setUser_name] = useState("");
    const [user_icon, setUser_icon] = useState("");
    const [userList, setUserList] = useState([]);

    const [fileName, setFileName] = useState('');
    const [base64, setBase64] = useState(null);


    const [message, setMessage] = useState('');
    const inputRef = useRef(null);
    const formRef = useRef(null);

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
    
    let navigateNewUser = useNavigate();
    
    const addUser = () => {
        Axios.post(`https://hot-take-react.herokuapp.com/createUser`, {
           
        full_name: full_name,
        user_name: user_name,   
        user_icon: user_icon,
        fileName: fileName,
        base64: base64,

        }).then((response) => {
          setUserList([
            ...userList,
        {    

        full_name: full_name,
        user_name: user_name,    
        user_icon: user_icon,
        fileName: fileName,
        base64: base64,
          
      },
          ]);
        }).then((response) => {

          navigateNewUser('/');
        }).then(() => {

          window.location.reload(false);

        })};

    return ( 
<div>
    <div className="information">
        <div className="createUserInfoBox" >
            <div>
                <label className="">Full Name:</label>
                      <input className="textForm "
                        type="text"
                        placeholder="Full Name..."
                        onChange={(event) => {
                        setFull_name(event.target.value);}}
                      />
           </div>

            <div>
                 <label className="">User Name:</label>
                      <input className="textForm "
                        type="text"
                        placeholder="User Name..."
                        onChange={(event) => {
                        setUser_name(event.target.value);}}
                      />
           </div>

           <label>Image:</label>

<div className="mui--text-dark-secondary mui--text-button">{message}</div>
<div className="upload-box" onClick={handleClick}>
<hr /> Select File <hr />

  {fileName}

  <img className="iconSample" src={base64} alt=""/>

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

     

               <button onClick={addUser}>Create User</button>
          </div>     
     </div>
</div>       
     );
}
 
export default CreateUser;