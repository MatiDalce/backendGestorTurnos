const Patient = require("./Patient");

module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    day: {
      type: DataTypes.STRING,
      allowNull: false
    },
    note: {
      type: DataTypes.STRING,
      allowNull: false
    },
    payStatus: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sessionStatus: {
      type: DataTypes.STRING,
      allowNull: false},
    amountToPay: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false // Disable timestamps for this model
  });

  Appointment.associate = (models) => {
    Appointment.belongsTo(models.Patient, { as: 'patient', foreignKey: 'patientId' });
  };

  return Appointment;
};
