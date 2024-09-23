const multer = require('multer');
const path = require('path');


const createMulterStorage = (destinationFolder, fieldName) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null,  destinationFolder);
    },
    filename: (req, file, cb) => {
      
      console.log(file.originalname, "tata");
      cb(null, file.originalname);
    
    }
  });

  return multer({ storage: storage });
};

module.exports = createMulterStorage;
