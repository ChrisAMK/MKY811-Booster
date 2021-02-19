module.exports = function(sequelize, DataTypes) {
  const MKY021RAW = sequelize.define("MKY021RAW", {
    // The email cannot be null, and must be a proper email before creation
    time: {
      type: DataTypes.INTEGER,
      allowNull: true
  },
  
  engineRPM: {
    type: DataTypes.INTEGER,
    allowNull: true
  },

  oilPressure: {
    type: DataTypes.INTEGER,
    allowNull: true
  },

  engineHours: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  coolantTemp: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  headPosition: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  holeDepth: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  rotationRpm: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  penetrationRate: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  mastAngle: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  deckRoll: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  deckPitch: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  headRackBackProxyStatus: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },

  footClampPressureSwitch: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },

  coolantLevelSensor: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },

  rotationReversePressure: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  rotationForwardPressure: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  holdBackPressure: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  pulldownPressure: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  waterPressure: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  mainPumpPressure: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  winchDownPressure: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  winchUpPressure: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  bitWeight: {
    type: DataTypes.INTEGER,
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
  
  return MKY021RAW;
};
