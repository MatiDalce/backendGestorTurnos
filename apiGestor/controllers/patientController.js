const db = require("../database/models");
const Op = db.Sequelize.Op;


module.exports = {
  get: async (req, res) => {
    try {
      const patients = await db.Patient.findAll({
        attributes: { exclude: ['updatedAt', 'createdAt'] } // exclude createdAt field
      });
  
      res.status(200).json(patients);
      console.log("GET PatientController: All patients were returned successfully.");
    } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving patients.');
      console.log("GET PatientController: An error occurred while retrieving patients.");
    }
  },
  getOne: async (req, res) => {
    const { id } = req.params;
  
    try {
      const patient = await db.Patient.findOne({
        where: { id },
        attributes: { exclude: ['updatedAt', 'createdAt'] } // exclude createdAt field
      });
  
      if (patient) {
        res.status(200).json(patient);
        console.log(`GETOnePatientController: Patient with ID ${id} was returned successfully.`);
      } else {
        res.status(404).json({ message: 'No patient record found for the given ID' });
        console.log(`GETOnePatientController: No patient record found for ID ${id}.`);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving patient.');
      console.log(`GETOnePatientController: An error occurred while retrieving patient with ID ${id}.`);
    }
  },
  
  getOneLimit: async (req, res) => {
    try {
      const patients = await db.Patient.findAll({
        attributes: {
          exclude: [
            'updatedAt',
            'createdAt',
            'maritalStatus',
            'birthday',
            'familyMembers',
            'parents',
            'children',
            'siblings',
            'sexualOrientation',
            'personalPhoneNumber',
            'contactPhone',
            'academicLevel',
            'bloodType',
            'takesMedication',
            'medication',
            'hasAllergies',
            'allergies',
            'hasChronicDisease',
            'chronicDisease'
          ]
        }
      });
  
      if (patients) {
        const patientsWithCompleteName = patients.map(patient => {
          return {
            id: patient.id,
            completeName: `${patient.name} ${patient.lastName}`,
            email: patient.email,
            dni: patient.dni
          };
        });
  
        res.status(200).json(patientsWithCompleteName);
        console.log("GET: LimitInfoPatientController: The list of patients with the complete name was returned successfully.");
      } else {
        res.status(404).json({ message: 'Error retrieving patients.' });
        console.log("GET: LimitInfoPatientController: An error occurred while retrieving patients.");
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving patients.');
      console.log("GET: LimitInfoPatientController: An error occurred while retrieving the list of patients with the complete name.");
    }
  },
  
  post: async (req, res) => {
    const {
      name,
      lastName,
      maritalStatus,
      birthday,
      dni,
      familyMembers,
      parents,
      gender,
      father,
      mother,
      children,
      siblings,
      personalPhoneNumber,
      contactPhone,
      sexualOrientation,
      academicLevel,
      bloodType,
      takesMedication,
      medication,
      socialService,
      hasAllergies,
      allergies,
      hasChronicDisease,
      chronicDisease,
      email
    } = req.body;
  
    try {
      const newPatient = await db.Patient.create({
        name,
        lastName,
        maritalStatus,
        birthday,
        dni,
        familyMembers,
        parents,
        gender,
        father,
        mother,
        children,
        siblings,
        personalPhoneNumber,
        contactPhone,
        sexualOrientation,
        academicLevel,
        bloodType,
        takesMedication,
        socialService,
        medication,
        hasAllergies,
        allergies,
        hasChronicDisease,
        chronicDisease,
        email
      });
  
      console.log(`POST patientController: New patient record created: ${newPatient.id}`);
  
      res.status(201).json(newPatient);
    } catch (err) {
      console.error(err);
      console.log(`POST patientController: Error creating patient record: ${err.message}`);
      res.status(500).json({ message: 'Error creating patient record' });
    }
  },
  
  put: async (req, res) => {
    const { id } = req.params;
    const {
      name,
      lastName,
      maritalStatus,
      birthday,
      dni,
      familyMembers,
      parents,
      children,
      siblings,
      gender,
      father,
      mother,
      personalPhoneNumber,
      contactPhone,
      academicLevel,
      bloodType,
      sexualOrientation,
      takesMedication,
      medication,
      socialService,
      hasAllergies,
      allergies,
      hasChronicDisease,
      chronicDisease,
      email
    } = req.body;
  
    try {
      const result = await db.Patient.update(
        {
          name,
          lastName,
          maritalStatus,
          birthday,
          dni,
          familyMembers,
          parents,
          children,
          gender,
          father,
          mother,
          siblings,
          sexualOrientation,
          personalPhoneNumber,
          contactPhone,
          academicLevel,
          bloodType,
          takesMedication,
          medication,
          socialService,
          hasAllergies,
          allergies,
          hasChronicDisease,
          chronicDisease,
          email
        },
        { where: { id } }
      );
  
      const patientUp = await db.Patient.findOne({
        where: { id },
        attributes: { exclude: ['updatedAt', 'createdAt'] } // exclude createdAt field
      });
  
      if (!patientUp) {
        console.log(`PUT patientController: No patient record found for ID ${id}`);
        return res.status(404).send({ message: 'No patient record found for the given ID' });
      } else {
        console.log(`PUT patientController: Patient record updated successfully: ${patientUp.id}`);
        return res.status(201).send(patientUp);
      }
    } catch (err) {
      console.error(err);
      console.log(`PUT patientController: Error updating patient record: ${err.message}`);
      return res.status(500).send('Error updating patient record');
    }
  },
  
  delete: async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await db.Patient.destroy({ where: { id } });
  
      if (result > 0) {
        console.log(`DELETE patientController: Patient record deleted successfully: ${id}`);
        return res.status(200).json({ message: 'Patient record deleted successfully' });
      } else {
        console.log(`DELETE patientController: No patient record found for ID ${id}`);
        return res.status(404).json({ message: 'No patient record found for the given ID' });
      }
    } catch (error) {
      console.error(error);
      console.log(`DELETE patientController: Error deleting patient record: ${error.message}`);
      return res.status(500).json({ message: 'Error deleting patient record' });
    }
  },
  
  search: async (req, res) => {
    try {
      const patients = await db.Patient.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.like]: `%${req.query.q}%` } },
            { dni: { [Op.like]: `%${req.query.q}%` } },
            { lastName: { [Op.like]: `%${req.query.q}%` } }
          ]
        },
        attributes: { exclude: [
          'updatedAt',
          'createdAt',
          'maritalStatus',
          'birthday',
          'familyMembers',
          'parents',
          'children',
          'siblings',
          'personalPhoneNumber',
          'contactPhone', 'sexualOrientation',
          'academicLevel',
          'bloodType',
          'takesMedication',
          'medication',
          'hasAllergies',
          'allergies',
          'hasChronicDisease',
          'chronicDisease'
        ] }
      });
      
      console.log("SEARCH PATIENT: OKK")

      const patientsWithCompleteName = patients.map(patient => {
        return {
          id: patient.id,
          completeName: `${patient.name} ${patient.lastName}`,
          email: patient.email,
          dni: patient.dni
        };
      });

      res.json({ patientsWithCompleteName });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Search patient error' })
      console.log("SEARCH PATIENT : ERROR");
    }
  },
  patientApointments: async (req, res) => {
    const patient = req.params.id;
  
    try {
      const hisAppointments = await db.Appointment.findAll({
        where: {
          patientId: patient,
        },
        order: [['id', 'ASC']],
      });
  
      if (hisAppointments) {
        return res.status(200).json(hisAppointments);
      } else {
        console.log(`patientApointments: No appointments found for patient with ID ${patient}.`);
        return res.status(404).json({ message: 'No appointments found for the given patient' });
      }
    } catch (error) {
      console.error(error);
      console.log(`patientApointments: Error retrieving appointments for patient with ID ${patient}.`);
      return res.status(500).json({ message: 'Error retrieving appointments' });
    }
  },
  
  patientApointmentsDSC: async (req, res) => {
    const patient = req.params.id;
  
    try {
      const hisAppointments = await db.Appointment.findAll({
        where: {
          patientId: patient,
        },
        order: [["id", "DESC"]],
      });
  
      if (hisAppointments) {
        return res.status(200).json(hisAppointments);
      } else {
        console.log(`patientApointmentsDSC: No appointments found for patient with ID ${patient}.`);
        return res.status(404).json({ message: 'No appointments found for the given patient' });
      }
    } catch (error) {
      console.error(error);
      console.log(`patientApointmentsDSC: Error retrieving appointments for patient with ID ${patient}.`);
      return res.status(500).json({ message: 'Error retrieving appointments' });
    }
  }
  
  

}



