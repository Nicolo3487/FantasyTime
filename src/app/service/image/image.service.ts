import { Injectable } from '@angular/core';
import { Storage, ref, listAll, getDownloadURL, uploadBytes } from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})
export class ImageService {

  images: {url:string, name:string }[] = [];
  //images: { url: string }[] = [];
  //images: string[] = [];
  
  constructor(private storage: Storage) { }

  getImages() {
    const imagesRef = ref(this.storage, 'images');

    return listAll(imagesRef).then(async (images) => {
      this.images = [];
      for(let image of images.items) {
        const url = await getDownloadURL(image);
        const name = image.name;

        const currentDate = new Date();
        //this.images.push(url});
        this.images.push({url, name});
        console.log(url, currentDate);
      }
      return this.images;
    });
  }

  uploadImage(file: File) {
    const imgRef = ref(this.storage, `images/${file.name}`);
    console.log(file);

    return uploadBytes(imgRef, file).then((x) => {
      console.log(x)
    })
  }

  searchImagesByUrl(url: string) {
    return this.images.filter((image) =>
      image.url.toLowerCase() === url.toLowerCase()
    );
  }

  searchImagesByName(name: string) {
    return this.images.filter((image) =>
      image.name.toLowerCase().includes(name.toLowerCase())
    );
  }
}
