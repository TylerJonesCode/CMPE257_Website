const express = require('express');

const app = express();

app.set('view engine', 'ejs');

const port = 3000;

app.get('*', (req, res) => {
    res.render('index')
    //res.
})

app.listen(port, () => {
  console.log(`Server is running at http://127.0.0.1:${port}`);
});
