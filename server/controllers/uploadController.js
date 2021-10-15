const multer = require("multer")
const multerS3 = require("multer-sharp-s3")
const AWS = require("aws-sdk")

const config = require("../config/key")

const s3 = new AWS.S3({
	accessKeyId: config.AWS_ACCESS_KEY,
	secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
	region: "us-east-2",
})

let storage = multerS3({
	s3: s3,
	Bucket: "elasticbeanstalk-us-east-2-229674681585",
	contentType: multerS3.AUTO_CONTENT_TYPE,
	ACL: "public-read",
	resize: {
		width: 800,
	},
	max: true,
	Key: function (req, file, cb) {
		cb(null, `images/${Date.now()}_${file.originalname}`)
	},
})

const upload = multer({ storage: storage }).single("image")

const uploadImage = (req, res) => {
	upload(req, res, (err) => {
		console.log(req)
		if (err) return res.json({ success: false, err: "this" })
		return res.json({
			success: true,
			url: res.req.file.Location,
			fileName: res.req.file.key,
		})
	})
}

module.exports = { uploadImage }
