module.exports = function(sequelize, DataTypes) {
  const MKY021 = sequelize.define("MKY021", {
    // The email cannot be null, and must be a proper email before creation
    time: {
      type: DataTypes.STRING,
      allowNull: true
  },

  engineRPM: {
    type: DataTypes.STRING,
    allowNull: true
  },

  oilPressure: {
    type: DataTypes.STRING,
    allowNull: true
  },

  engineHours: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  coolantTemp: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  headPosition: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  holeDepth: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  rotationRpm: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  penetrationRate: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  mastAngle: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  deckRoll: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  deckPitch: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  headRackBackProxyStatus: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  footClampPressureSwitch: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  coolantLevelSensor: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  rotationReversePressure: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  rotationForwardPressure: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  holdBackPressure: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  pulldownPressure: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  waterPressure: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  mainPumpPressure: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  winchDownPressure: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  winchUpPressure: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  bitWeight: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  driller: {
    type: DataTypes.STRING,
    allowNull: true,
  }

  // createdAt: {
  //   type: 'TIMESTAMP',
  //   defaultValue: literal('CURRENT_TIMESTAMP'),
  //   allowNull: false
  // }

},
{
  timestamps: false
}

  );

  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  
  return MKY021;
};
