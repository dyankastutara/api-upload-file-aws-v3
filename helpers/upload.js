require('dotenv').config();
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');

const s3 = new S3Client({
	region: process.env.REGION_S3,
    credentials:{
        accessKeyId: process.env.ACCESS_KEY_ID_S3,
        secretAccessKey: process.env.ACCESS_SECRET_KEY_S3,
    }
})

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.BUCKET,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname, originalname: file.originalname});
        },
        key: function (req, file, cb) {
            cb(null, "training/"+Date.now().toString()+"-"+file.originalname)
        }
    })
})

module.exports = {
    upload,
    s3
}