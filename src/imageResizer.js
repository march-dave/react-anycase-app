import * as sharp from 'sharp'
function imageResizer(filePath, width, height) {
   return new Promise((resolve, reject) => { 
      const image = sharp(filePath);
      image
         .resize(width, height)
         .toBuffer()
         .then((data) => {
            resolve(data);
         })
         .catch((err) => {
            reject(err);
         });
   
   }
}