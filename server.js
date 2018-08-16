const express= require('express');
const hbs= require('hbs');
const fs = require('fs');

var app = express ();
app.use(express.static(__dirname + '/public'));//use this directory for our server
hbs.registerPartials(__dirname + '/views/partials');
//handlebars(hbs): templating agent to inject variables like php or ruby
app.set('view engine','hbs'); //set express configurations


//arguments( url: root of the app, function to run to those who made the request)
// app.get('/',(req,resp)=>{
  //req:info about request coming in , resp : methods to response to the request
  // resp.send('<h2>hello boi</h2>');
//   resp.send({
//     name: 'kai',
//     likes:['music','film']
//   });
// });

hbs.registerHelper('getYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n',(err)=>{
    if (err) {
      console.log('error : unable to append server log');
    }
  });
  next();
});
//display maintenance for every page 
// app.use((req,res,next)=>{
//   res.render('maintenance');
//
// });

app.get('/about',(req,resp)=>{
  // resp.send('<h2>ABOUT PAGE BOI</h2>');
  resp.render('about',{
    title: "about page",
  });//render any of the templates u have set up, with the current view engine
})

app.get('/',(req,resp)=>{
  // resp.send('<h2>ABOUT PAGE BOI</h2>');
  resp.render('home',{
    title: "Home Page",
    welcome: "Welcome to your home page!"
  });//render any of the templates u have set up, with the current view engine
})

app.get('/bad',(req,resp)=>{
  resp.send({error:'error message'});
})
app.listen(3000);
