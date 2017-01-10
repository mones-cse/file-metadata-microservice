var multer  = require('multer')
var express =require('express');

var app =express();

var storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, __dirname+'/uploads');
  }
//   filename: function (request, file, callback) {
//     console.log(file);
//     callback(null, file.originalname)
//   }
});

var upload = multer({storage:storage})



app.set('port',8080);
app.listen(app.get('port'),function(){
    console.log('server running at '+app.get('port'));
})


app.get('/',function(req,res){
    res.sendFile(__dirname+'/home.html');
})

app.post('/', upload.single('upload'), function (req, res, next) {
  // req.file is the `avatar` file 
  // req.body will hold the text fields, if there were any
  //console.log('post called');
  //console.log(req.file);
  //console.log(req.body);
  var formated = {
      name:req.file.originalname,
      size:req.file.size
  }
  //console.log(formated);
  res.json(formated);
})