var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const sqlite3 = require('sqlite3').verbose();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var multer = require('multer');
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
//const newsPosts = [];

app.get('/myposts', function (request, response) {
  let db = new sqlite3.Database('./posts.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.log("open db", err);
      response.statusCode(400);
      return;
    }
    let sql = "select posts_id, post from posts order by posts_id";
    let params = [];
    db.all(sql, params, function (err, rows) {
      if (err) {
        console.log("insert", err);
        response.statusCode(400);
        return;
      }
      let newsPosts = [];
      rows.forEach((row) => {
        console.log(row);
        let post = JSON.parse(row.post);
        post.id = row.posts_id;
        newsPosts.push(post);
      });
      console.log("GET newsPosts:", newsPosts);
      response.send(newsPosts);
    });
    db.close();
  });

});

app.post('/mypost', upload.single('blogimage'), function (request, response) {
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
  let dateValue = `${monthArray[month]} ${day}, ${year}`;
  console.log(dateValue);

  let datePost = { created_at: date, display_date: dateValue }

  let newsPost = request.body; //JSON.parse(request.body);

  newsPost.created_at = datePost.created_at;
  newsPost.date = datePost.display_date;

  try {
    if (request.file) {
      newsPost.image = "/postimages/" + request.file.filename;
    }

    //  newsPosts.push(newsPost);
    let db = new sqlite3.Database('./posts.db', sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        console.log("open db", err);
        response.statusCode(400);
        return;
      }
      let sql = "insert into posts (post) values (?)";
      let params = [JSON.stringify(newsPost)];
      db.run(sql, params, function (err) {
        if (err) {
          console.log("insert", err);
          response.statusCode(400);
          return;
        }
        response.redirect("/news.html");
      });
      db.close();
    });
    //console.log("POST newsPosts", newsPosts);


    //response.sendStatus(200);

  }
  catch (e) {
    console.log("catch", e);
    response.sendStatus(500);
  }
});

//delete a post
app.delete('/mypost/:posts_id', function (request, response) {
  const postId = request.params.posts_id;

  let db = new sqlite3.Database('./posts.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.log("open db", err);
      response.sendStatus(400);
      return;
    }
    let sql = "DELETE FROM posts WHERE posts_id = ?";
    let params = [postId];

    db.run(sql, params, function (err) {
      if (err) {
        console.log("delete", err);
        response.sendStatus(500);
        return;
      }

      console.log("Deleted post with id:", postId);
      response.sendStatus(200);
    });

    db.close();
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log("Express default handler");
  //next(createError(404));
  res.status(404).send("NOT FOUND:" + req.url);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).send(JSON.stringify(err));
  //res.render('error');
});

module.exports = app;


