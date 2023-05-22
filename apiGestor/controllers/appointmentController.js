const db = require("../database/models");
const Op = db.Sequelize.Op;
const fs = require('fs');
const path = require("path")
const archiver = require('archiver');
const moment = require('moment');
const rimraf = require('rimraf');

module.exports = {
    get: async (req, res) => {
        try {
            const appointments = await db.Appointment.findAll({
                attributes: { exclude: ['updatedAt', 'createdAt', 'patientId'] },
                include: [{
                    association: "patient", as: "Patient",
                    attributes: { exclude: ['createdAt',
                     'updatedAt',
                      'birthday', 
                      'maritalStatus', 
                      'email', 
                      'socialService', 
                      "maritalStatus", 
                      "contactPhone",
                      "personalPhoneNumber",
                      "academicLevel",
                      "bloodType",
                      "takesMedication",
                      "medication",
                      "hasAllergies",
                      "allergies",
                      "hasChronicDisease",
                      "chronicDisease",
                      "familyMembers",
                      "parents",
                      "children",
                      "siblings"
                    ] }
                }]
            });
            res.status(200).json(appointments);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al obtener los turnos');
        }
    },

    getOne: async (req, res) => {
        const { id } = req.params;
      
        try {
          const appointment = await db.Appointment.findOne({
            where: { id },
            attributes: { exclude: ['updatedAt', 'createdAt', 'patientId'] },
            include: [{
              association: "patient", as: "Patient",
              attributes: { exclude: ['createdAt',
               'updatedAt',
                'birthday', 
                'maritalStatus', 
                'email', 
                'socialService', 
                "maritalStatus", 
                "contactPhone",
                "personalPhoneNumber",
                "academicLevel",
                "bloodType",
                "takesMedication",
                "sexualOrientation",
                "medication",
                "hasAllergies",
                "allergies",
                "hasChronicDisease",
                "chronicDisease",
                "familyMembers",
                "parents",
                "children",
                "siblings"
              ] }
            }]
          });
      
          if (appointment) {
            res.status(200).json(appointment);
          } else {
            res.status(404).json({ message: 'No appointment found for the given ID' });
          }
        } catch (err) {
          console.error(err);
          res.status(500).send('Error al obtener el turno');
        }
      },
    post: async (req, res) => {
        const { day, patient, note, amountToPay, payStatus, sessionStatus } = req.body;

        console.log(req.body)

        try {
            const newAppointment = await db.Appointment.create({
                day,
                patientId : patient,
                note,
                amountToPay,
                payStatus,
                sessionStatus
            });
            res.status(201).json(newAppointment);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error creating appointment record' });
        }
    },
    put: async (req, res) => {

      const { day, patient, note, amountToPay, payStatus, sessionStatus } = req.body;

      try {
          const editedAppointment = await db.Appointment.update({
              day,
              patient,
              note,
              amountToPay,
              payStatus,
              sessionStatus
          },{
            where:{
                id:req.params.id
            }});
          res.status(201).json(editedAppointment);
      } catch (err) {
          console.error(err);
          res.status(500).json({ message: 'Error editing appointment record' });
      }
  },
    
     
    
    
  delete: async (req, res) => {
    try {
      const deletedAppointment = await db.Appointment.destroy({
        where: {
          id: req.params.id
        }
      });
      res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (err) {
      console.error(err.message); // log the error message
      res.status(500).json({ message: 'Error deleting appointment record' });
    }
  }
  
,

    download: async (req, res) => {
        try {
          const appointments = await db.Appointment.findAll({
            attributes: { exclude: ['updatedAt', 'createdAt'] },
            include: [
              {
                model: db.Patient,
                as: "patient",
                attributes: ['id', 'name', 'lastName']
              }
            ]
          });
      
          if (!appointments || appointments.length === 0) {
            console.log("No appointments found");
            return res.status(404).send('No appointments found');
          }
      
          const archive = archiver('zip', { zlib: { level: 9 } });
          archive.on('error', function(err) {
            console.error("Error creating zip archive:", err);
            throw err;
          });
      
          // Create the main directory
          const mainDirectory = 'Historial completo de todos los pacientes';
          if (!fs.existsSync(mainDirectory)) {
            fs.mkdirSync(mainDirectory);
          }
      
          for (let appointment of appointments) {
            const patientId = appointment.patient.id;
            const patientName = appointment.patient.name;
            const patientLastName = appointment.patient.lastName;
            const folderName = `${patientName} ${patientLastName}`;
            const fileName = `${patientName} ${patientLastName} - ${appointment.id} - ${moment(appointment.day).format('YYYY-MM-DD')}.txt`.replace(/\//g, '-');
            const fileContent = `${patientName} ${patientLastName}\nFecha: ${moment(appointment.day).format('YYYY-MM-DD')}\nNota: ${appointment.note}\n\n`;
      
            const patientFolderPath = `${mainDirectory}/${folderName}`;
            if (!fs.existsSync(patientFolderPath)) {
              try {
                fs.mkdirSync(patientFolderPath, { recursive: true });
              } catch (err) {
                console.error(`Error creating directory for patient ${patientId}:`, err);
                throw err;
              }
            }
      
            const filePath = `${patientFolderPath}/${fileName}`;
            if (!fs.existsSync(filePath)) {
              try {
                fs.writeFileSync(filePath, fileContent);
                console.log(`The file ${fileName} has been saved!`);
              } catch (err) {
                console.error(`Error writing to file ${filePath}:`, err);
                throw err;
              }
            }
          }
      
          const outputFilePath = path.join(__dirname, 'appointments.zip');
          const output = fs.createWriteStream(outputFilePath);
          output.on('close', function() {
            console.log(archive.pointer() + ' total bytes');
            console.log('The file has been saved!');
            res.download(outputFilePath, 'appointments.zip', () => {
              fs.unlink(outputFilePath, (err) => {
                if (err) {
                  console.error("Error deleting zip file:", err);
                  throw err;
                }
                console.log('The file has been deleted!');
                // Remove all files and directories
                rimraf(mainDirectory, { glob: false }, (err) => {
                  if (err) {
                    console.error("Error deleting main directory:", err);
                    throw err;
                  }
                  console.log('The folder has been deleted!');
                });
              });
            });
          });
      
          archive.directory(mainDirectory, false);
          archive.pipe(output);
          archive.finalize();
        } catch (err) {
          console.error(err);
          res.status(500).send('Internal server error');
        }
      }
      ,
      downloadOne: async (req, res) => {
        try {
          const appointmentId = req.params.id;
          const appointment = await db.Appointment.findOne({
            where: { id: appointmentId },
            attributes: { exclude: ['updatedAt', 'createdAt'] },
            include: [{
              model: db.Patient,
              as: "patient",
              attributes: ['id', 'name', 'lastName']
            }]
          });
      
          if (!appointment) {
            console.log(`Appointment with id ${appointmentId} not found`);
            return res.status(404).send('Appointment not found');
          }
      
          const patientName = appointment.patient.name;
          const patientLastName = appointment.patient.lastName;
          const appointmentDate = moment(appointment.date).format('YYYY-MM-DD');
          const fileName = `${patientName} ${patientLastName} - ${appointmentDate}.txt`.replace(/\//g, '-');
          const fileContent = `Nombre: ${patientName}\nNota: ${appointment.note}\n\n`;
      
          const outputFilePath = path.join(__dirname, fileName);
          fs.writeFile(outputFilePath, fileContent, (err) => {
            if (err) {
              console.error(`Error writing to file ${outputFilePath}:`, err);
              throw err;
            }
            console.log(`The file ${fileName} has been saved!`);
            res.download(outputFilePath, fileName, () => {
              fs.unlink(outputFilePath, (err) => {
                if (err) {
                  console.error(`Error deleting file ${outputFilePath}:`, err);
                  throw err;
                }
                console.log(`The file ${fileName} has been deleted!`);
              });
            });
          });
        } catch (err) {
          console.error(err);
          res.status(500).send('Internal server error');
        }
      }
      
    ,
  
    search: async (req, res) => {
      try {
        const appointments = await db.Appointment.findAll({
          include: [
            {
              model: db.Patient,
              as: "patient",
              attributes: ['id', 'name', 'lastName']
            }
          ],
          where: {
            [Op.or]: [
              { '$patient.name$': { [Op.like]: `%${req.query.q}%` } }, //EJECUTA SOBRE PATIENT
              { '$patient.lastName$': { [Op.like]: `%${req.query.q}%` } },
              { '$patient.dni$': { [Op.like]: `%${req.query.q}%` } },
              //{ name: { [Op.like]: `%${req.query.q}%` } },  EJECUTA SOBRE APPOINTMENTS
       
            ]
          },
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
  
        console.log("SEARCH APPOINTMENT: OKK")
  
        res.json({ appointments });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' })
        console.log("SEARCH APPOINTMENT : ERROR");
      }
    },

    calendar: async (req,res) => {

      const appointments =  await db.Appointment.findAll({
        attributes: { exclude: ['updatedAt', 'createdAt', 'patientId'] },
        include: [{
            association: "patient", as: "Patient",
            attributes: { exclude: ['createdAt',
             'updatedAt',
              'birthday', 
              'maritalStatus', 
              'email', 
              'socialService', 
              "maritalStatus", 
              "contactPhone",
              "personalPhoneNumber",
              "academicLevel",
              "bloodType",
              "takesMedication",
              "medication",
              "sexualOrientation",
              "hasAllergies",
              "allergies",
              "hasChronicDisease",
              "chronicDisease",
              "familyMembers",
              "parents",
              "children",
              "siblings"
            ] }
        }]
    });

      if (appointments) {
        const appointmentsCalendar = appointments.map(appointment => {
          return {
            id: appointment.id,
            start: appointment.day,
            sessionStatus: appointment.sessionStatus,
            note: appointment.note,
            name: appointment.patient.name + " " +appointment.patient.lastName
          };
        });
        res.json({appointmentsCalendar})


    }
  
    
}}