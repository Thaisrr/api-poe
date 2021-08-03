'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Job.belongsToMany(models.Character, {
        through: 'Characters_Jobs', // Nom de la table intermédiaire
        foreignKey: 'jobId', // Nom de la clef étrangère qui se réfère à ce model
        otherKey: 'characterId', // Deuxième clef étrangère de la table
        as: 'characters' // Alias pour pouvoir faire job.characters
      })
    }
  };
  Job.init({
    name: DataTypes.STRING,
    defense: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};
