var bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.addHook("beforeCreate", function (user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return User;
};