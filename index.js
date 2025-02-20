const express = require('express');
const app = express();
const port = 3000;

// Handlebars
//importation de handlebars
const {engine}  = require('express-handlebars');
//indiquer que vous utulise handlerbars
app.engine('handlebars', engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.listen( port , ()=>{ console.log(` Server running on port ${port} `); });

// methode get
//app.get('/', (req, res) => { res.render('index'); });


app.engine('handlebars', engine(
    {
        defaultLayout: 'main'
    }
));
//app.get('/' , (req , res)=>{ 
  //  res.render('index') 
   
   
//} );





var listTaches = [ 'anis', 'anis2', 'anis3' ] 
app.get('/' , (req , res)=>{ 
    res.render('index', { taches: listTaches }) 
} );

