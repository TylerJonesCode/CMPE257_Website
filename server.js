const express = require('express');

const app = express();

const { spawn } = require('child_process');

app.set('view engine', 'ejs');

const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get('*', (req, res) => {
    res.render('index', {has_date: 0})
    
})


function predict(date){
    return new Promise( (resolve, reject) => {
        const predict = spawn('python', ['script.py'])
        
        predict.stdin.write(date)
        predict.stdin.end()

        let result = ''
        
        predict.stdout.on('data', (data) => {
            result = data.toString()
        });
        
        predict.stderr.on('data', (data) => {
            result = ''   
        })
        
        predict.on('close', (error) => {
            if (error == 0){
                resolve(result)
            }
            else{
                reject('Error occurred')
            }
        })
    })
}

app.post('/', async (req, res) => {

    date = req.body.date
    test_date = new Date(date)
    
    // Date is invalid
    if (isNaN(test_date)) {
        res.render('index', {has_date: 0})
        return
    }


    prediction = await(predict('Hello '))

    console.log(prediction)
    
    items = []
    for(let i = 0; i < 5; i++){
        items.push({'date': 0, 'open': 0, 'close': 0, 'high': 0, 'low': 0, label: 'Bullish'})
    }
    
    console.log(items)
    console.log(items[0].date)

    res.render('index', {date, has_date: 1, pred: items, high: 0, low: 0, avg_close:  0})
})



app.listen(port, () => {
  console.log(`Server is running at http://127.0.0.1:${port}`);
});

//app url: 