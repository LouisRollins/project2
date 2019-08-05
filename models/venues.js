module.exports = function (sequelize, DataTypes) {
  var Venues = sequelize.define("Venues", {
    venueName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    address: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    city: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    state: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    zip: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    }
  });
  Venues.associate = function(models) {
    Venues.hasMany(models.Events, {
      onDelete: "cascade"
    });
  };
  return Venues;
};