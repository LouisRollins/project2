module.exports = function(sequelize, DataTypes) {
  var Events = sequelize.define("Events", {
    eventName: {
      type: Sequelize.STRING,
      validate:{
        notEmpty: true
      }
    },
    eventDateTime: {
      type: Sequelize.DATE,
      validate: {
        notEmpty: true
      }
    },
    lineup: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true
      }
    },
    cost: {
      type: Sequelize.STRING,
      validate: {
        isNumeric: true
      }
    },
    ticketLink: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true
      }
    },
    posterLink: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
        isURL: true
      }
    },
    
  });
  return Events;
};
