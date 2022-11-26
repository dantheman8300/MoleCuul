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
    const name = req.query['elemName'];
    const symbol = req.query['elemSymbol'];
    try {
        const result = await userServices.getElements(name, symbol);
        res.send({elements: result});         
    } catch (error) {
        console.log(error);
        res.status(500).send('An error ocurred in the server.');
    }
});

app.get('/electron_config', async (req, res) => {
    const config_id = req.query['config_id'];
    try {
        const result = await userServices.getElectronConfig(config_id);
        res.send({electron_config: result});         
    } catch (error) {
        console.log(error);
        res.status(500).send('An error ocurred in the server.');
    }
});

app.get('/element_image', async (req, res) => {
    const element = req.query['element'];
    try {
        const result = await userServices.getElementImage(element);
        res.send({element_image: result});         
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

app.delete('/users/:id', async (req, res) => {
    const id = req.params['id'];
    const result = await userServices.deleteUser(id);
    if (result === undefined || result === null)
        res.status(404).send('Resource not found.');
    else {
        res.send({users_list: result});
    }
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
    console.log("REST API is listening.");
  });