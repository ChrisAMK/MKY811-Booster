module.exports = function(sequelize, DataTypes) {

  const literal = sequelize.literal;
  const MKY08 = sequelize.define("MKY08", {
    // The email cannot be null, and must be a proper email before creation
    time: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
  
    engineRPM: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  
    oilPressure: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
  
    engineHours: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  
    coolantTemp: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  
    headPosition: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  
    holeDepth: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  
    rotationRpm: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  
    penetrationRate: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  
    bitWeight: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  
    outsideTemp: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  
    mastAngle: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  
    deckRoll: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  
    deckPitch: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  
    rodLoaderPosition: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  
    headRefPosition: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  
    rotationReversePressure: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  
    rotationForwardPressure: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  
    holdBackPressure: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  
    pulldownPressure: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  
    waterPressure: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  
    mainPumpPressure: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  
    driller: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  
    compressorSumpPressure: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  
    compressorDischargeTemperature: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  
    compressorLinePressure: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  
    compressorInterstagePressure: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  
    DownholeAirPressure: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  
    engineOilTemp: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  
    engineTorque: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  
    intercoolerTemp: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  
    totalFuelUsed: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  
    intakeManifoldTemp: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  
    turboRpm: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  
    electricalPotential: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  
   engineOilLevel: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  
    createdAt: {
      type: 'TIMESTAMP',
      defaultValue: literal('CURRENT_TIMESTAMP'),
      allowNull: false
    },
  
    year: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  
    month: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  
    date: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  
    hour: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  
    minute: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  
    second: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  
  },
    {
      timestamps: false
    }

  );

  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  
  return MKY08;
};
