const express = require('express');

const app = express();

app.set('view engine', 'ejs');

const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get('*', (req, res) => {
    res.render('index', {has_date: 0})
    
})

app.post('/', (req, res) => {

    date = req.body.date
    test_date = new Date(date)
    
    
    items = []
    for(let i = 0; i < 5; i++){
        items.push({'date': 0, 'open': 0, 'close': 0, 'high': 0, 'low': 0, label: 'Bullish'})
    }
    
    console.log(items)
    console.log(items[0].date)
    if (!isNaN(test_date)) {
        res.render('index', {date, has_date: 1, pred: items})
    }
    else {
        res.render('index', {has_date: 0})
    }
})

app.listen(port, () => {
  console.log(`Server is running at http://127.0.0.1:${port}`);
});

//app url: 