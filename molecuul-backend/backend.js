const express = require('express');
const cors = require('cors');

const elementServices = require('./models/element-services');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/elements', async (req, res) => {
    const elemName = req.query['elemName'];
    res.send('/elements');
    try {
        const result = await elementServices.getElements(elemName);
        res.send({elements: result});         
    } catch (error) {
        console.log(error);
        res.status(500).send('An error ocurred in the server.');
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });