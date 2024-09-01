// index.js
const express = require('express');
const app = express();
const port = 3000;

const { NseIndia } = require("stock-nse-india");
const nseIndia = new NseIndia()

// Set EJS as the templating engine
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    try {
        res.render('main');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/stocks/all', async (req, res) => {
    try {
        const symbols = await nseIndia.getAllStockSymbols();
        console.log(symbols);
        res.render('all_stocks', { symbols });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/stocks/:symbol', async (req, res) => {
    try {
        const symbol = req.params.symbol;
        const stockDetails = await nseIndia.getEquityDetails(symbol);
        // const stockDetails = await nseIndia.getEquityHistoricalData(symbol);

        console.log(stockDetails);
        res.render('stock', { stockDetails });
        // res.send(stockDetails);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}); 