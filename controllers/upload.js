require('dotenv').config();
const { DeleteObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
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
	createMultiple: async (req, res) => {
		let finalResult = {
			 data: [],
			 success: false,
			 message: ''
		}
		try{
			 if(!req.files){
						throw new Error("File tidak ditemukan")
			 }
			 finalResult.data = req.files;
			 finalResult.success = true;
			 finalResult.message = "File Berhasil diunggah";
			 res.send(finalResult);
		}catch(e){
			 finalResult.message = e.message;
			 res.send(finalResult);
		}
  	},
	deleteOne: async (req, res) => {
		let finalResult = {
			data: null,
			success: false,
			message: ''
		}
		try{
			const command = new DeleteObjectCommand({
				Bucket: process.env.Bucket,
				Key: '/nama-folder/file.ext',
			});
			const response = await s3.send(command);
			finalResult.data = response;
			finalResult.success = true;
			finalResult.message = "File Berhasil dihapus";
			res.send(finalResult);
		}catch(e){
			finalResult.message = e.message;
			res.send(finalResult);
		}
	},
	// deleteMultiple: async (req, res) => {
	// 	let finalResult = {
	// 		deleted: null,
	// 		data: [],
	// 		success: false,
	// 		message: ''
	// 	}
	// 	try{
	// 		const command = new DeleteObjectCommand({
	// 			Bucket: process.env.Bucket,
	// 			Delete: {
	// 					Objects: [{ Key: '/nama-folder/file-1.ext' },{ Key: '/nama-folder/file-2.ext' }],
	// 				},
	// 		});
	// 		const { Deleted } = await client.send(command);
	// 		finalResult.deleted = Deleted.length;
	// 		finalResult.data = Deleted.map(item=>item.Key);
	// 		finalResult.success = true;
	// 		finalResult.message = "Files Berhasil dihapus";
	// 		res.send(finalResult);
	// 	}catch(e){
	// 		finalResult.message = e.message;
	// 		res.send(finalResult);
	// 	}
	// }
}
