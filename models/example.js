module.exports = function (sequelize, DataTypes) {
  var Events = sequelize.define("Events", {
    eventName: {
      type: DataTypes.STRING,
      validate:{
        notEmpty: true
      }
    },
    eventDateTime: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: true
      }
    },
    lineup: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    cost: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: true
      }
    },
    ticketLink: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    posterLink: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        isURL: true
      }
    },

  });
  return Events;
};