import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-add-image-button',
  templateUrl: './add-image-button.component.html',
  styleUrls: ['./add-image-button.component.css']
})
export class AddImageButtonComponent implements OnInit {
  public imagePath: string | ArrayBuffer | null = null;
  private file: NgxFileDropEntry | null = null;
  @Output()
  loaded = new EventEmitter<File>();

  @Output()
  error = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit(): void {
  }

  public dropped(files: NgxFileDropEntry[]): void {
    this.file = files[0];
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          const reader = new FileReader();
          reader.onload = () => {
            this.imagePath = reader.result;
            this.loaded.emit(file);
          };
          reader.onerror = (e: any) => {
            this.error.next(e);
          }
          reader.readAsDataURL(file);
        });
      }


    }

  }

  invokeSelector($event: any, openFileSelected: (event: any) => any) {
    $event.preventDefault();
    $event.stopPropagation();
    openFileSelected($event);
  }

}
