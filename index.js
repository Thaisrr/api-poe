const express = require('express');
const app = express();
const port = 3000;
const CharacterController = require('./controllers/character-controller')

/* lit les application-content json + body parser */
app.use(express.json());

app.get('/', (req, res) => {
    res.json({message : "Welcome !"})
});

/*** Characters Requests ***/
app.get('/character/:id', CharacterController.getOne);
app.get('/character', CharacterController.getAll );
app.post('/character', CharacterController.create);


app.listen(port, () => {
    console.log('Server is running on port ', port);
});
