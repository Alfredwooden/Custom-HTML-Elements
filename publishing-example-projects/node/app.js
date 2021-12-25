const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

// WEB COMPONENTS SETTINGS
// app.use(express.static('public'))
  app.use(express.static('node_modules/web-components-stencil/'))
// 

app.get('/', (req, res, next) => {
  res.render('starting-page', { message: 'Hello from Node.js' });
});

app.listen(3000);
