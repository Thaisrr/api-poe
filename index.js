const express = require('express');
const app = express();
const port = 3200;
const CharacterController = require('./controllers/character-controller')
const UserController = require('./controllers/user-controller.js')
const auth = require('./middlewares/auth.js')
const isHimself = require('./middlewares/isHimself.js')

/* lit les application-content json + body parser */
app.use(express.json());

app.get('/', (req, res) => {
    res.json({message : "Welcome !"})
});

/*** Authentication Requests ***/
app.post('/register', UserController.register);
app.post('/login', UserController.login);

app.use(auth);
/*** Characters Requests ***/
app.get('/character/:id', CharacterController.getOne);
app.get('/character', CharacterController.getAll );
app.post('/character', CharacterController.create);
app.put('/character/:id', CharacterController.update);
app.delete('/character/:id', CharacterController.delete);

/*** User Request ***/
app.get('/user/:userId', isHimself, UserController.getOne);



app.listen(port, () => {
    console.log('Server is running on port ', port);
});
