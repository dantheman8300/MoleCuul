const express = require('express');
const cors = require('cors');

const userServices = require('./models/user-services');

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/elements', async (req, res) => {
    const name = req.query['name'];
    try {
        const result = await userServices.getElements(name);
        res.send({elements: result});         
    } catch (error) {
        console.log(error);
        res.status(500).send('An error ocurred in the server.');
    }
});

app.get('/elements/:id', async (req, res) => {
    const id = req.params['id'];
    const result = await userServices.findElementById(id);
    if (result === undefined || result === null)
        res.status(404).send('Resource not found.');
    else {
        res.send({elements: result});
    }
});

app.post('/elements', async (req, res) => {
    const user = req.body;
    const savedUser = await userServices.addElement(user);
    if (savedUser)
        res.status(201).send(savedUser);
    else
        res.status(500).end();
});

app.delete('/elements', async (req, res) => {
    const user = req.body;
    const deletedElement = await userServices.deleteElement(deletedElement);
    if (savedUser)
        res.status(201).send(savedUser);
    else
        res.status(500).end();
});

// Used to remove a user from the user list
app.delete('/elements/:id', (req, res) => {

    // Retrieve id param from request
    const elemName = req.params.elemName;
  
    // Try to remove user with corresponding id
    const didFindAndRemovedUser = removeElement(elemName);
  
    if (didFindAndRemovedUser) { // Element was successfully removed
      res.status(204).end();
    } else { // No user with id was found
      res.status(404).end();
    }
  });

  app.listen(process.env.PORT || port, () => {
    if (process.env.PORT) {
      console.log(`REST API is listening on port: ${process.env.PORT}.`);
    } else console.log(`REST API is listening on port: ${port}.`);
  });