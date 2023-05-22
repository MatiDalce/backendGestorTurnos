const express = require ('express') ;
const router = express.Router () ;
const appointmentController = require ('../controllers/appointmentController') ;
const { appointmentValidationPost } = require("../middlewares/appointmentsValidation")
const authMidd = require("../middlewares/auth")

router.get("/", authMidd,appointmentController.get);
router.get("/search",authMidd, appointmentController.search)
router.get("/calendar",authMidd, appointmentController.calendar)
router.get('/download', authMidd,appointmentController.download);
router.get('/download/:id',authMidd, appointmentController.downloadOne);
router.get("/:id", authMidd,appointmentController.getOne)



router.post("/", authMidd,appointmentValidationPost ,appointmentController.post)
router.put("/:id", authMidd,appointmentValidationPost , appointmentController.put)

router.delete("/:id",authMidd, appointmentController.delete)


module.exports = router