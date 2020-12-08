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

    time: {
        type: DataTypes.STRING,
        allowNull: true
    },
  
    engineRpm: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  
    oilPressure: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  
    engineHours: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    fuelRate: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    coolantTemp: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    dischargeTemp1: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    dischargeTemp2: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    dischargeTemp3: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    dischargeTemp4: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    dischargePressure: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    suctionTemp: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    suctionPressure: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    load: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },

    engineLoad: {
        type: DataTypes.STRING,
        allowNull: true,
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