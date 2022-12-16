var express = require('express');
var router = express.Router();

//username and password
const myusername = 'TRIDEEP'
const mypassword = '12345'

// a variable to save a session
var session;

/* cache delete*/
router.use((req, res, next) => {
  res.set('cache-control', 'no-cache,private,no-store,must-revalidate,max-stale=0,post-check=0,pre-check=0')
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  session=req.session;
  console.log(req.session)
    if(session.userid){
       res.render('home')
    }else
    res.render('index');
});

/*for session */

router.post('/user',(req,res) => {
  if(req.body.username == myusername && req.body.password == mypassword){
      session=req.session;
      session.userid=req.body.username;
      console.log(req.session)
      res.render('home',{myusername});
  }
  else{
      res.render('index',{message:' invalid user id or password'});
  }
})

/* when click back no error showing */

router.get('/logout',(req,res) => {
  req.session.destroy();
  res.redirect('/');
});




module.exports = router;
