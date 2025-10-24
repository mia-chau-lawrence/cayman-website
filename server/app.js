var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const sqlite3 = require('sqlite3').verbose();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// Authentication module.
const basicAuth = require('express-basic-auth');

//downloading images to file
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

//timeout
// var bodyParser = require('body-parser')
// var cookieParser = require('cookie-parser')
// var express = require('express')
// var timeout = require('connect-timeout')

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

app.get('/myposts', function (request, response) {
  let usernameJson = null;
  let passwordJson = null;

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
        console.log("insert");
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

//begin of timeout
var timestamp = Date.now();
let loginFails = 0;
let retryTimestamp = null;
function myAuthorizer(username, password) {
  let db = new sqlite3.Database('./posts.db', sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the posts database.');
  });

  //stuff here
  let sqlUsername = `SELECT username FROM login where login_id = ?`;
  let sqlPassword = `SELECT password FROM login where login_id = ?`;
  let loginId = 1;

  db.get(sqlUsername, [loginId], (err, row) => {
    if (err) {
      console.log("failed to fetch sqlUsername");
      return console.error(err.message);
    }
    usernameJson = row;
    console.log(usernameJson);
    return row
      ? console.log(row.login_id, row.username)
      : console.log(`can't find username with loginId ${loginId}`);

  });
  db.get(sqlPassword, [loginId], (err, row) => {
    if (err) {
      console.log("failed to fetch sqlPassword");
      return console.error(err.message);
    }
    passwordJson = row;
    console.log(passwordJson);
    return row
      ? console.log(row.login_id, row.password)
      : console.log(`can't find password with loginId ${loginId}`);

  });

  //console.log("fetched username and password:", usernameJson, passwordJson);
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });

  console.log("here is the username and password", usernameJson, passwordJson);
  let userName = usernameJson["username"];
  let passWord = passwordJson["password"];
  console.log("HERE: ", userName, passWord);
  console.log("userName is " + typeof userName);
  console.log("passWord is " + typeof passWord);
  const userMatches = basicAuth.safeCompare(username, userName);
  const passwordMatches = basicAuth.safeCompare(password, passWord);
  //console.log("we got a matcher!");


  //checking for bad logins
  console.log("@myauthorizer");
  if (retryTimestamp !== null) {
    if (Date.now() - retryTimestamp < 10000) {
      throw "Too many bad login attempts";
      return false;
    } else {
      retryTimestamp = null;
    }
  }

  if ((userMatches & passwordMatches) === 0) {
    loginFails += 1;
    if (loginFails > 3) {
      loginFails = 0;
      console.log("Too many failed login attempts");
      retryTimestamp = Date.now();
      throw "Too many failed login attempts";

    }
  }
  if (userMatches & passwordMatches && (Date.now() - timestamp > 10000)) {
    console.log("@myauthorizer", "session expired");
    timestamp = Date.now();
    return false;
  }
  timestamp = Date.now();
  //stuff above here

  //find alternate to return--- it's what is keep the db from closing
  return userMatches & passwordMatches
}

function daAuthorizer(req, res, next) {
  console.log("@daAuthorizer", req.auth);
  console.log(JSON.stringify(req.headers, null, 4));

  return (basicAuth({
    authorizer: myAuthorizer,
    challenge: true,
    realm: 'seniors',
    unauthorizedResponse: getUnauthorizedResponse,
  }))(req, res, next);

}

app.get('/login',
  daAuthorizer,
  function (req, res) {
    console.log(req.auth);
    return res.status(200).send(JSON.stringify(req.headers, null, 4));
  });

//failed authentication
function getUnauthorizedResponse(request, response) {
  console.log('getUnauthorizedResponse', request.auth, response ? 'Y' : "N");
  //return response.redirect('/index.html');
  return request.auth
    ? ('Credentials ' + request.auth.user + ':' + request.auth.password + ' rejected')
    : 'No credentials provided'
}

app.post('/mypost',
  /*daAuthorizer,*/
  upload.single('blogimage')
  , (request, response) => {
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
    //let createdAt = { created_at: date }


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
        
        //experimenting with insert date
        let sql = "insert into posts (post, created_at, date_text, image_file, title, author, post_content) values ( (?), (?), (?), (?), (?), (?), (?))";
        //let params = [JSON.stringify(newsPost)];

        let params = [JSON.stringify(newsPost), JSON.stringify(newsPost.created_at), JSON.stringify(newsPost.date),
          JSON.stringify(newsPost.image), JSON.stringify(newsPost.title), JSON.stringify(newsPost.author),
          JSON.stringify(newsPost.post)];

        db.run(sql, params, function (err) {
          if (err) {
            console.log("insert", err);
            response.status(400);
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
app.delete('/mypost/:posts_id', daAuthorizer, function (req, res) {
  const postId = req.params.posts_id;

  let db = new sqlite3.Database('./posts.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.log("open db", err);
      res.sendStatus(400);
      return;
    }
    let sql = "DELETE FROM posts WHERE posts_id = ?";
    let params = [postId];

    //delete reference from sql
    db.run(sql, params, function (err) {
      if (err) {
        console.log("delete", err);
        res.sendStatus(500);
        return;
      }

      console.log("Deleted post with id:", postId);
      res.sendStatus(200);

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


