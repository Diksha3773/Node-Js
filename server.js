const express=require('express');
const hbs =require('hbs');
var app=express();
const fs= require('fs');

//pass key value pair ;key=what u wanna set ;value :what value u want to give to key;
// here it means set view engine==hbs

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine','hbs');

// // second method :by giving path
// app.use(express.static(__dirname+'/public'));

app.use((req,res,next)=>{
    var now=new Date().toString();
 var log =  `${now} ${req.method} ${req.url}`;
 console.log(log);

 fs.appendFile('server.log',log+'\n',(err)=>{
    if(err) console.log('Error');
 })
    // function exit
   next(); 
});

// app.use((req,res,next)=>{
// res.render('maintainence.hbs');
// })
app.use(express.static(__dirname+'/public'));


hbs.registerHelper('getCurrentYear',()=>{return new Date().getFullYear()});
hbs.registerHelper('screamIt',(text)=>{return text.toUpperCase();})

// 2 arguments url and the function ;function retruns what u want to show on the window :html page,json etc
app.get('/',(req,res)=>{
    // first method : by passing string
// res.send('<h1>Hello express!</h1>');

// third method by rendering
res.render('home.hbs',{
    pagetitle:'Home Page',
    message:'Hii welcome to my website'

})
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pagetitle:'About Page',
       
    });

});
app.get('/bad',(req,res)=>{
    res.send({
        error:'Bad gateway'
    });

})

app.listen(3000,()=>{
    console.log('Server is up on port 3000');
});

