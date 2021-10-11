const express = require("express")
const router = express.Router()
const { auth, admin } = require("../middleware/auth")

const {
	getWaitingRegisterUser,
	updateRollUser,
	refuseUser,
} = require("../controllers/adminController")

/////////////////////////////
// api/admin/
/////////////////////////////
router
	.route("/admission")
	.get(auth, admin, getWaitingRegisterUser)
	.put(auth, admin, updateRollUser)
	.delete(auth, admin, refuseUser)

module.exports = router
