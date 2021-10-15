//배포하고 배포 사이트에서 MONGO_URI 키를 생성
module.exports = {
	mongoURI: process.env.MONGO_URI,
	awsAccessKey: process.env.AWS_ACCESS_KEY,
	awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
}
