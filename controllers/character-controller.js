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
        const data = await Character.findByPk(id);
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
        const char = await Character.findByPk(id);
        const updated_character = {
            name : req.body.name || char.name,
            xp : req.body.xp || char.xp,
            pv :req.body.pv || char.pv
        }
        const data = await Character.update(updated_character, { where: {id: id}});
        res.json(data);
    }

    delete = async (req, res) => {
        const id = req.params.id;
        const data = await Character.destroy({
            where: {id: id}
        });
        res.json(data);
    }
}

module.exports = new CharacterController();
