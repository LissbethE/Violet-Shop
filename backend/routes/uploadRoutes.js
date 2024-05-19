import express from 'express';
import path from 'path';
import multer from 'multer';

import Product from '../models/productModel.js';
import User from '../models/userModel.js';

////////////////////////////////

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'frontend/dist/img');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Images only!'), false);
  }
}

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single('image');

////////////////////////////////

const uploadProductImage = (req, res) => {
  uploadSingleImage(req, res, async function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    const image = req.file.filename;
    const data = { image };

    const options = { new: true, runValidators: true };
    await Product.findByIdAndUpdate(req.params.id, data, options);

    res.status(200).send({
      message: 'Image uploaded successfully',
      image: `/${req.file.path}`,
    });
  });
};

const uploadUserImage = (req, res) => {
  uploadSingleImage(req, res, async function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    const image = req.file.filename;
    const data = { image };

    const options = { new: true, runValidators: true };
    await User.findByIdAndUpdate(req.params.id, data, options);

    res.status(200).send({
      message: 'Image uploaded successfully',
      image: `/${req.file.path}`,
    });
  });
};

router.post('/:id/productImage', uploadProductImage);
router.post('/:id/userImage', uploadUserImage);

export default router;

// frontend/public/img
// /${req.file.path.replace(/\\/g, '/')}
