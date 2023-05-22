const db = require("../database/models");
const Op = db.Sequelize.Op;


module.exports = {
  get: async (req, res) => {
    try {
      const patients = await db.Patient.findAll({
        attributes: { exclude: ['updatedAt', 'createdAt'] } // exclude createdAt field
      });
     
      res.status(200).json(patients);
      
      console.log("GET PatientController : All patients were returned successfully.");
    } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving patients.');
      console.log("GET : PatientController: An error occurred while retrieving patients.");
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
        console.log(`GETOnePatientController s: Patient with ID ${id} was returned successfully.`);
      } else {
        res.status(404).json({ message: 'No patient record found for the given ID' });
        console.log(`GETOnePatientController : No patient record found for ID ${id}.`);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving patient.');
      console.log(`getOnePatientController: An error occurred while retrieving patient with ID ${id}.`);
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
        console.log("GET : LimitInfoPatientController: The list of patients with the complete name was returned successfully.");
      } else {
        res.status(404).json({ message: 'Error retrieving patients.' });
        console.log("GET : LimitInfoPatientController: An error occurred while retrieving patients.");
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving patients.');
      console.log("GET : LimitInfoPatientController: An error occurred while retrieving the list of patients with the complete name.");
    }
  },
  post: async (req, res) => {
    const { name,
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
      chronicDisease, email } = req.body;
      
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
      console.log(`POST patientController : New patient record created: ${newPatient.id}`);

      res.status(201).json(newPatient);
    } catch (err) {
      console.error(err);
      console.log(`POST patientController : Error creating patient record: ${err}`);
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
        }, { where: { id } }
      );

      const patientUp = await db.Patient.findOne({
        where: { id },
        attributes: { exclude: ['updatedAt', 'createdAt'] } // exclude createdAt field
      });

      if (!patientUp) {
       return  res.status(404).send({ message: 'ERROR' });
      } else {
        return res.status(201).send(patientUp);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send('Error updating patient record');
    }

  },
  delete: async (req, res) => {
    const { id } = req.params;

    try {
      const result = await db.Patient.destroy({ where: { id } });

      if (result > 0) {
        res.status(200).json({ message: 'Patient record deleted successfully' });
        
      } else {
        res.status(404).json({ message: 'No patient record found for the given ID' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
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
      res.status(500).json({ message: 'Server error' })
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
  
      return res.status(200).json(hisAppointments);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
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
      });;
  
      return res.status(200).json(hisAppointments);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  

}



