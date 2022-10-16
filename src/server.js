const express  = require('express');
const multer = require('multer');


const app = express()


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./images")
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

  app.post("/single", upload.single("image"), (req, res) =>{
    console.log(req.file);
    res.send("single file uploaded successfully");
  });

  
app.post("/multiple", upload.array("images"), (req, res) => {
    console.log(req.file);
    res.send("multiple file uploaded successfully");
  
  })

app.listen(8000, ()=>{
    console.log('listening on http://localhost:8000');
})