//배포하고 배포 사이트에서 MONGO_URI 키를 생성
module.exports = {
	mongoURI: process.env.MONGO_URI,
	AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
	AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
	AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
}
