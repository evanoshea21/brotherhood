
export function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }

  import imageCompression from 'browser-image-compression';

  export async function handleOptimization(file) {

    const imageFile = file;
    // console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
    // console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    }
    try {
      const compressedFile = await imageCompression(imageFile, options);
      // console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
      // console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

      return compressedFile;
    } catch (error) {
      console.log(error);
    }

  }