require('dotenv').config();
const { DeleteObjectCommand, DeleteObjectsCommand } = require('@aws-sdk/client-s3');
const { Upload } = require("@aws-sdk/lib-storage");
const axios = require("axios");
const sharp = require('sharp');
const { s3 } = require('../helpers/upload');

module.exports = {
	createFromUrl : async (req, res) => {
		let result = {
      location: '',
  		success: false,
  		error: false
  	}
    try{
      const response = await axios({method: 'get', url: req.body.url, responseType: 'stream'})
      let bodyConvert = response.data.pipe(sharp())
      const params = {
        Key: req.body.key,
        Bucket: process.env.BUCKET,
        Body: bodyConvert,
  			ACL:'public-read'
  		};
      const parallelUploads3 = new Upload({
  			client: s3,
  			params
  		});
      parallelUploads3.on("httpUploadProgress", (progress) => {});
      await parallelUploads3.done();
      result.location = parallelUploads3.singleUploadResult.Location;
      result.success = true;
  		res.status(200).json(result);
    }catch(e){
      result.error = true;
			res.status(200).json(result);
    }
	},
	createOne: async (req, res) => {
		let finalResult = {
			key: '',
			data: {},
			success: false,
			message: ''
		}
		try{
			if(!req.file){
				throw new Error("File tidak ditemukan")
			}
			const { pathname } = new URL(req.file.location);
			finalResult.key = pathname.substr(1);
			finalResult.data = req.file;
			finalResult.success = true;
			finalResult.message = "File Berhasil diunggah";
			res.send(finalResult);
		}catch(e){
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
	deleteMultiple: async (req, res) => {
		let finalResult = {
			deleted: null,
			data: [],
			success: false,
			message: ''
		}
		try{
			const command = new DeleteObjectsCommand({
				Bucket: process.env.Bucket,
				Delete: {
						Objects: [{ Key: '/nama-folder/file-1.ext' },{ Key: '/nama-folder/file-2.ext' }],
					},
			});
			const { Deleted } = await client.send(command);
			finalResult.deleted = Deleted.length;
			finalResult.data = Deleted.map(item=>item.Key);
			finalResult.success = true;
			finalResult.message = "Files Berhasil dihapus";
			res.send(finalResult);
		}catch(e){
			finalResult.message = e.message;
			res.send(finalResult);
		}
	}
}
