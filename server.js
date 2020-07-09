// install express server
const express = require('express');
const path = require('path');

const app = express();

// serve only the static files form the dist directory
app.use(express.static( __dirname + '/dist/hcny-audible' ));

app.get('/*', function( req, res ) {    
  res.sendFile(path.join( __dirname + '/dist/hcny-audible/index.html' ));
});

// start the app by listening on the default Heroku port
app.listen( process.env.PORT || 80 );