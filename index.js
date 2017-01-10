var multer  = require('multer')
var express =require('express');

var app =express();

var storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, __dirname+'/uploads');
  },
  filename: function (request, file, callback) {
    console.log(file);
    callback(null, file.originalname)
  }
});

var upload = multer({storage:storage})



app.set('port',process.env.PORT||8080);
app.listen(app.get('port'),function(){
    console.log('server running at '+app.get('port'));
})


app.get('/',function(req,res){
    res.sendFile(__dirname+'/home.html');
})

app.post('/', upload.single('upload'), function (req, res, next) {
  var formated = {name:req.file.originalname,size:req.file.size}
  res.json(formated);
})