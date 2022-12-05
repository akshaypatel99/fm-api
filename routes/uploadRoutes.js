import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'images/');
	},
	filename: (req, file, cb) => {
		cb(
			null,
			`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
		);
	},
});

const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/png' || 'image/jpg' || 'image/jpeg') {
		cb(null, true);
	} else {
		cb('Image files only!', false);
	}
};

const upload = multer({
	storage,
	fileFilter,
}).single('image');

router.post('/', upload, (req, res) => {
	res.send(`/${req.file.path}`);
});

export default router;
