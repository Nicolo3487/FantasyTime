import { Component,OnInit } from '@angular/core';
import { ImageService } from 'src/app/service/image/image.service';
import { PostService } from 'src/app/service/post/post.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  images: {url: string, name: string }[] = [];
  searchTerm: string = "";
  //images: { url: string; }[] = [];
  filteredImages: { url: string, name: string }[] = [];
  searchUrl: string = "";
  imageNotFound: boolean = false;
  
  constructor(private imageService: ImageService, private router: Router) {}

  ngOnInit(): void {

    this.imageService.getImages().then((images) => {
      this.images = images;
    });
  }
 
  submitArchivio($event: any) {
    const file = $event.target.files[0];
    this.imageService.uploadImage(file);
  }

  submitForm(iForm: NgForm) {
    if (iForm.valid) {
      location.reload();
    } else {
      alert('L\'immagine è obbligatoria.');
    }
  }

  openImage(imageUrl: string, imageName: string ) {
    this.router.navigate(['/detail'], { queryParams: { image: imageUrl, name: imageName} });
  }

  /*searchImage(){
    this.filterImages();
  }

  filterImages() {
    this.filteredImages = this.images.filter((image) =>
      image.url.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }*/

  searchImageByName(name: string){
    this.filteredImages = this.images.filter((image) =>
    image.name.toLowerCase().includes(name.toLowerCase())
    );
    this.imageNotFound = this.filteredImages.length === 0;
  }
}

