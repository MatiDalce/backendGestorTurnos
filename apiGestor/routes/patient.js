const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const { validatePatientFields } = require('../middlewares/patientValidation');
const authMidd = require("../middlewares/auth");


router.get('/', authMidd, patientController.get);
router.get("/limit",authMidd ,patientController.getOneLimit)
router.get("/search", authMidd,patientController.search)
router.get('/:id',authMidd, patientController.getOne)



router.post('/', authMidd,validatePatientFields, patientController.post);

router.put("/:id",  authMidd,validatePatientFields,  patientController.put);

router.delete("/:id",authMidd, patientController.delete);
router.get("/patient-appointments/:id",authMidd, patientController.patientApointments)
router.get("/patient-appointmentsDSC/:id",authMidd,patientController.patientApointmentsDSC)


module.exports = router