// Creating our User model
module.exports = function(sequelize, DataTypes) {
  const MKY811 = sequelize.define("MKY811", {
    // The email cannot be null, and must be a proper email before creation
    hours: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    temp: {
      type: DataTypes.STRING,
      allowNull: false
    }

  });

  return MKY811

};