const multer = require("multer")
const sharp = require("sharp")
const fs = require("fs")

let storage = multer.diskStorage({
	// 파일 저장 위치
	destination: (req, file, cb) => {
		cb(null, "uploads/")
	},
	// 파일 저장 이름
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}_${file.originalname}`)
	},
	// 확장자 필터
	fileFilter: (req, file, cb) => {
		const ext = path.extname(file.originalname)
		// 쓰고싶은 확장자를 밑에 옵션으로 추가.
		if (ext !== ".jpg" || ".png") {
			return cb(res.status(400).end("only jpg, png is allowed"), false)
		}
		cb(null, true)
	},
})
const upload = multer({ storage: storage }).single("image")

const uploadImage = (req, res) => {
	upload(req, res, (err) => {
		sharp(req.file.path) // 리사이징할 파일의 경로
			.resize({ width: 800 }) // 원본 비율 유지하면서 width 크기만 설정
			.withMetadata()
			.toFile(`uploads/boardImgs/resize-${req.file.filename}`, (err, info) => {
				if (err) throw err
				fs.unlink(`${req.file.path}`, (err) => {
					// 원본파일은 삭제해줍니다
					// 원본파일을 삭제하지 않을거면 생략해줍니다
					if (err) throw err
				})
				if (err) return res.json({ success: false, err: err })
				return res.json({
					success: true,
					url: `uploads/boardImgs/resize-${req.file.filename}`,
					fileName: res.req.file.filename,
				})
			})
	})
}

module.exports = { uploadImage }
