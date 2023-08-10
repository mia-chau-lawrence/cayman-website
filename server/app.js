var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/postimages/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
var upload = multer({ storage: storage });

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));
app.use("/postimages", express.static(path.join(__dirname, 'public/postimages')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);


////////////////////////////////////////////////////////////////////////////////////////////////////
const newsPosts = [];

app.get('/myposts', function(request, response) {
  // let db= new sqlite3.Database('./mcu.db', sqlite3.OPEN_READWRITE, (err) => {
  //   if (err) {
  //     response.send(400);
  //     return;
  //   }
  //   runQueries(response,db);
  // });
  console.log("GET newsPosts:", newsPosts);
  response.send(newsPosts);
});


app.post('/mypost', upload.single('blogimage'), function(request, response) {
  console.log("POST data", request.body);
  console.log("POST file", request.file);

  //date 
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();

  let monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let dateValue =  `${monthArray[month]} ${day}, ${year}`;
  console.log(dateValue);

  let datePost = {created_at: date, display_date: dateValue} 

  let newsPost = request.body; //JSON.parse(request.body);

  newsPost.created_at = datePost.created_at;
  newsPost.date = datePost.display_date;
  // let db= new sqlite3.Database('./mcu.db', sqlite3.OPEN_READWRITE, (err) => {
  //   if (err) {
  //     response.send(400);
  //     return;
  //   }
  //   runQueries(response,db);
  // });

  try {
    if (request.file) {
    newsPost.image = "/postimages/" + request.file.filename;
    }
  
  newsPosts.push(newsPost);
  console.log("POST newsPosts", newsPosts);
    
    response.redirect("/news.html");
    //response.sendStatus(200);

  }
  catch(e) {
    console.error.log(e);
    response.sendStatus(500);
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log("Express default handler");
  //next(createError(404));
  res.status(404).send("NOT FOUND:" + req.url);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).send(JSON.stringify(err));
  //res.render('error');
});

module.exports = app;
