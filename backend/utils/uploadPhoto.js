import path from 'path';
import multer from 'multer';
import asyncHandler from './asyncHandler.js';

////////////////////////////////

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'frontend/public/img');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}-${path.extname(file.originalname)}`
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

//const uploadSingleImage = upload.single('image');

export const uploadPhoto = function (type) {
  return upload.single(type);
};

/*
export const uploadPhoto = function (type) {
  return asyncHandler(async (req, res, next) => {
    upload.single(type);
    next();
  });
};*/

//   return upload.single(type);
/*
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) cb(null, true);
  else cb(new Error('Not an image! Please upload only images.'), false);
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

export const uploadPhoto = function (type) {
  return upload.single(type);
};*/

/*
export const resizePhoto = function (type) {
  return asyncHandler(async (req, res, next) => {
    if (!req.file) return next();

    req.file.filename = `${type}-${req.user._id}-${Date.now()}.jpeg`;

    console.log('resizePhoto', req.file.filename, req.file);

    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/${type}/${req.file.filename}`);

    next();
  });
};
*/
