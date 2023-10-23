require('dotenv').config();
const { DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { s3 } = require('../helpers/upload');

module.exports = {
	createOne: async (req, res) => {
		let finalResult = {
			data: {},
			success: false,
			message: ''
		}
		try{
			if(!req.file){
				throw new Error("File tidak ditemukan")
			}
			finalResult.data = req.file;
			finalResult.success = true;
			finalResult.message = "File Berhasil diunggah";
			res.send(finalResult);
		}catch(e){
			console.log(e.message);
			finalResult.message = e.message;
			res.send(finalResult);
		}
	},
}