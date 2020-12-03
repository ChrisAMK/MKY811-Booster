// Creating our User model
module.exports = function(sequelize, DataTypes) {
  const MKY811 = sequelize.define("MKY811", {
    clientID: {
      type: DataTypes.STRING,
      allowNull: true
    },

    topic: {
      type: DataTypes.STRING,
      allowNull: true
    },

    temp: {
      type: DataTypes.STRING,
      allowNull: false
    },

    hours: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    createdAt: {
      type: 'TIMESTAMP',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    }

  },
  {
    timestamps: false
  }
  );

  return MKY811

};