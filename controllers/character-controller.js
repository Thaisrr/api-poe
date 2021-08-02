const db = require('../models');
const Character = db.Character;
const Bag = db.Bag;

class CharacterController {

    getAll = async (req, res) => {
        const data = await Character.findAll(
            {
                include: [{
                    model: Bag,
                    as: 'bag',
                    attributes: ['color', 'capacity']
                }]
            }
        );
        res.json(data);
    }

    getOne = async (req, res) => {
        const id = req.params.id;
        const data = await Character.findByPk(id, {
            include: [
                {
                    model: Bag,
                    as: 'bag',
                    attributes: ['id', 'color', 'capacity']
                }
            ]
        });
        res.json(data);
    }

    create = async (req, res) => {
        const new_character = {
            name: req.body.name,
            xp: req.body.xp || 0,
            pv: req.body.pv || 20,
            bag: {
                color: req.body.bag.color || 'Brown',
                capacity: req.body.bag.capacity || 5
            }
        }
        const data = await Character.create(new_character, {
            include: [{
                model: Bag,
                as: 'bag'
            }]
        });
        res.json(data);
    }

    update = async (req, res) => {
        const id = req.params.id;
        let char = await Character.findByPk(id, {
            include: [{
                model: Bag,
                as: 'bag'
            }]
        })
        if(!char) {
            res.status(404).send('Pas de personnage trouvé avec cet ID')
        } else {
            const updated_character = {
                name : req.body.name || char.name,
                xp : req.body.xp || char.xp,
                pv :req.body.pv || char.pv,
            }

                const bag = {color: 'Brown', capacity: 5, characterId: char.id};
                // Soit on en récupère un via le body
                if(req.body.bag) {
                    bag.color = req.body.bag.color || bag.color;
                    bag.capacity = req.body.bag.capacity || bag.capacity;
                }
            // Si le personnage en base n'a pas de sac, il faut en créer un
            let new_bag;
            if(!char.bag) {
                new_bag = await Bag.create(bag);

            } else {
                new_bag = await Bag.update(bag, {where: {characterId: char.id}});
            }
            updated_character.bag = new_bag;

            const data = await Character.update(updated_character, {
                where: {id: id},
                include: [{ model: Bag, as: 'bag'}]
            });
            res.json(data);
        }


    }

    delete = async (req, res) => {
        const id = req.params.id;
        const data = await Character.destroy({
            where: {id: id},
            include: [{model: Bag, as: 'bag'}]
        });
        res.json(data);
    }
}

module.exports = new CharacterController();
