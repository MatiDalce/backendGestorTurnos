const Appointment = require("./Appointment");

module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define('Patient', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    maritalStatus: {
      type: DataTypes.STRING,
      allowNull: true
    },
    birthday: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dni: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    familyMembers: {
      type: DataTypes.STRING,
      allowNull: true
    },
    mother: {
      type: DataTypes.STRING,
      allowNull: true
    },
    father: {
      type: DataTypes.STRING,
      allowNull: true
    },
    children: {
      type: DataTypes.STRING,
      allowNull: true
    },
    siblings: {
      type: DataTypes.STRING,
      allowNull: true
    },
    personalPhoneNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    contactPhone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    academicLevel: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bloodType: {
      type: DataTypes.STRING,
      allowNull: true
    },
    takesMedication: {
      type: DataTypes.STRING,
      allowNull: true
    },
    medication: {
      type: DataTypes.STRING,
      allowNull: true
    },
    hasAllergies: {
      type: DataTypes.STRING,
      allowNull: true
    },
    allergies: {
      type: DataTypes.STRING,
      allowNull: true
    },
    socialService: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sexualOrientation:{
      type: DataTypes.STRING,
      allowNull: true
    },
    hasChronicDisease: {
      type: DataTypes.STRING,
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true
    },
    chronicDisease: {
      type: DataTypes.STRING,
      allowNull: true
    },
    parents: {type: DataTypes.STRING,
     allowNull:true}
  },{
    timestamps: false // Disable timestamps for this model
  });

  Patient.associate = (models) => {
    Patient.hasMany(models.Appointment, {
      foreignKey: 'patientId',
      as: 'patientAppointments'
    })
  }

  return Patient;
};