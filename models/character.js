'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Character.hasOne(models.Bag, {
        foreignKey: 'characterId',
        as: 'bag',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE' // ??
      })
      Character.hasMany(models.Weapon, {
        foreignKey: 'characterId',
        as: 'weapons',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE' // ???
      })

      Character.belongsToMany(models.Job, {
        through: 'Characters_Jobs', // Nom de la table intermédiaire
        foreignKey: 'characterId', // référence à lui même dans la table intermédiaire
        otherKey: 'jobId', // référence de la table associée
        as: 'jobs' // alias dans Character
      })


    }
  };
  Character.init({
    name: DataTypes.STRING,
    xp: DataTypes.INTEGER,
    pv: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Character',
  });
  return Character;
};

/*
Reprendre le projet d'exercice :
- Créer son controller avec CRUD
- Ajouter une adresse : un user peut avoir une adresse
( numero, rue, code postal, ville )
 */
