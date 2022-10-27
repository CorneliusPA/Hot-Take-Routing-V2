const express = require("express")
const exphbs = require('express-handlebars'); 
const fileUpload = require('express-fileupload');
const db = require("./config/db")
const multer = require('multer')
const cors = require("cors");
const path = require('path')
const bodyParser = require('body-parser');

const app = express();

require("dotenv").config;


const Port = 3001;

app.use(express.json());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const upload = multer({ dest: './images' });


app.use(cors({
  origin: "*",
}));


  app.post("/createUser", (req, res) => {
    const full_name = req.body.full_name
    const user_name = req.body.user_name;
    const user_icon = req.body.user_icon;
  
    const fileName = req.body.fileName;
    const base64 = req.body.base64;
  
    db.query(
      "INSERT INTO user_profile (full_name, user_name, user_icon, profile_image, image_path) VALUES (?,?,?,?,?)",
      [full_name, user_name, user_icon, base64 ,fileName ],
      (err, result) => {
        if (err) {
          console.log(err);
        }
          res.send(result);
        
      }
    );
  });

  app.post("/createPost", (req, res) => {
    const user_name = req.body.user_name;
    const profile_id = req.body.profile_id;
    const post_title = req.body.post_title;
    const written_text = req.body.written_text;
    const media_location = req.body.media_location;
    const fileName = req.body.fileName;
    const base64 = req.body.base64;
    db.query(
      "INSERT INTO user_post (user_name, profile_id, post_title, written_text, media_location, image_path, image) VALUES (?,?,?,?,?,?,?)",
      [user_name, profile_id, post_title, written_text, media_location, fileName, base64],
      (err, result) => {
        if (err) {
          console.log(err);
        }
          res.send(result);
      }
    );
  });

    
  app.post("/createComment", (req, res) => {
    const user_name = req.body.user_name;
    const profile_id = req.body.profile_id;
    const post_id = req.body.post_id;
    const comment_text = req.body.comment_text;
    const media_location = req.body.media_location;
    const fileName = req.body.fileName;
    const base64 = req.body.base64;
  
    db.query(
      "INSERT INTO post_comment (user_name, profile_id, post_id, comment_text, media_location, image_path, image) VALUES (?,?,?,?,?,?,?)",
      [user_name, profile_id, post_id, comment_text, media_location, fileName, base64],
      (err, result) => {
        if (err) {
          console.log(err);
        }
          res.send(result);
        
      }
    );
  });
  

  app.get("/user_profile", (req, res) => {
    db.query("SELECT * FROM user_profile", (err, result) => {
      if (err) {
        console.log(err);
      }
        res.send(result);
      
    });
  });

  app.get("/user_post", (req, res) => {
    db.query("SELECT * FROM user_post", (err, result) => {
      if (err)
     {
        console.log(err);
      }
        res.send(result);
      
    });
  });

  app.get("/post_comment", (req, res) => {
    db.query("SELECT * FROM post_comment", (err, result) => {
      if (err) {
        console.log(err);
      }
        res.send(result);
      
    });
  });

  app.delete("/deletePost/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM user_post WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      }
        res.send(result);
      
    });
  });

  app.delete("/deleteComment/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM post_comment WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      }
        res.send(result);
      
    });
  });
  

  app.put("/updatePost", (req, res) => {
    const id = req.body.id;
    const written_text = req.body.written_text;
    db.query(
      "UPDATE user_post SET written_text = ? WHERE id = ?",
      [written_text, id],
      (err, result) => {
        if (err) {
          console.log(err);

        }
          res.send(result);
        
      }
    );
  });

  app.put("/updateComment", (req, res) => {
    const id = req.body.id;
    const comment_text = req.body.comment_text;
    db.query(
      "UPDATE post_comment SET comment_text = ? WHERE id = ?",
      [comment_text, id],
      (err, result) => {
        if (err) {
          console.log(err);
        }
          res.send(result);
        
      }
    );
  });






  // Route Controller for uploading a single file
// Some code here...

app.post('/single', upload.single('singleImage'), (req, res) => {
  try {
    res.status(200).send({ message: 'File uploaded successfully.' });
  } catch (err) {
    res.status(400).send({ message: 'Error uploading file.' });
  }
});

// Route Controller for uploading multiple files
// Some code here...


// Route Controller for uploading base64 and convert to file.
// Some code here...

const img = (data) => {
  const reg = /^data:image\/([\w+]+);base64,([\s\S]+)/;
  const match = data.match(reg);
  const baseType = {
    jpeg: 'jpg'
  };

  baseType['svg+xml'] = 'svg'

  if (!match) {
    throw new Error('image base64 data error');
  }

  const extname = baseType[match[1]] ? baseType[match[1]] : match[1];

  return {
    extname: '.' + extname,
    base64: match[2]
  };
}




  app.listen(process.env.PORT || Port, () => {
    console.log(`Yay, your server is running on Heroku or Port 3001`);

  });

