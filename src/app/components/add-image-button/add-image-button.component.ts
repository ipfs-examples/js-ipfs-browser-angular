import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-image-button',
  templateUrl: './add-image-button.component.html',
  styleUrls: ['./add-image-button.component.css']
})
export class AddImageButtonComponent implements OnInit {
  public imagePath: string | ArrayBuffer = '';

  @Input()
  error: string = '';
  constructor() { }

  ngOnInit(): void {
  }

  public dropped(filesDropped: any): void {
    console.log('files', filesDropped);
    // this.files = files;
    // let extension = this.regex.exec(this.fileName);
    // for (const droppedFile of files) {

    //   // Is it a file?
    //   if (droppedFile.fileEntry.isFile) {
    //     const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
    //     fileEntry.file((file: File) => {

    //       if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
    //         this.error = "Niewłaściwy format pliku. Obsługujemy JPEG i PNG"
    //         return;
    //       }


    //       // Here you can access the real file
    //       const reader = new FileReader();
    //       reader.onload = () => {
    //         this.imagePath = reader.result;
    //         this.loaded.emit(file);
    //       };
    //       reader.readAsDataURL(file);
    //       return this.isFileAllowed;
    //     });
    //   }


    // }

  }

  invokeSelector($event: any, openFileSelected: (event: any) => any) {
    $event.preventDefault();
    $event.stopPropagation();
    this.error = '';
    openFileSelected($event);
  }

}
