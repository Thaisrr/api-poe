const db = require('../models');
const User = db.User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController {

    register = async (req, res) => {
        try {
            const email = req.body.email;
            let user = await User.findOne({where: {email}});
            if(user) {
                res.status(400).send('User déjà existant')
            } else {
                const password = await bcrypt.hash(req.body.password, 10);
                user = {email, password};
                // = user { email : email, password : password }
                const data  = await User.create(user)
                res.json({email: data.email, createdAt: data.createdAt});
            }
        } catch (err)  {
            console.err(err);
            res.status(400).send('Mauvaise requête');
        }
    }

    login = async (req, res) => {
        let email, password;
         try {
             email = req.body.email;
             password = req.body.password;
         } catch (err) {
             res.status(400).send('Mauvais body');
         }

         const user = await User.findOne({where: {email}});
         if(!user) {
             res.status(401).send(`Erreur d'authentification`);
         } else {
            const isValid = await bcrypt.compare(password, user.password);
            if(!isValid) {
                res.status(401).send(`Erreur d'authentification`);
            } else {
                const token = jwt.sign(
                    {userId: user.id},
                    'Faut_Pas_Pousser_Mamie_Dans_Les_Orties',
                    {expiresIn: '24h'}
                );
                    /*
                    un number : interprété en secondes
                    une chaîne sans indication : interprété en ms
                     */

                res.json({
                    id: user.id,
                    email: user.email,
                    token
                })
            }
         }
    }

    getOne = async (req, res) => {
        const id = req.params.userId;
        const data = await User.findByPk(id);
        res.json(data);
    }
}

module.exports = new UserController();
