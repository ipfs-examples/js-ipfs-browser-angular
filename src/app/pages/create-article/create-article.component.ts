import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';
import { OrbitDbService } from 'src/app/services/orbit-db.service';
import { ToolbarService } from 'src/app/services/toolbar.service';

@Component({
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css'],
})
export class CreateArticleComponent implements OnInit {
  newThumbnail: any;
  addArticleForm: FormGroup;
  htmlText: string = '';
  lock = false;
  quillConfig = {
    //toolbar: '.toolbar',
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['code-block'],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        //[{ 'font': [] }],
        //[{ 'align': [] }],

        ['clean'], // remove formatting button

        ['link', 'image', 'video']
      ],
    },
  };
  constructor(
    private formBuilder: FormBuilder,
    private toolbarService: ToolbarService,
    private orbitDbService: OrbitDbService,
    private imageService: ImageService,
    private router: Router) {
    this.addArticleForm = this.formBuilder.group({
      title: ['', Validators.required],
      html: ['', Validators.required],
      thumbnail: ['']
    });
  }
  ngOnInit(): void {
    this.toolbarService.setTitle('Create article');
    this.toolbarService.setButtons({
      buttons: [
        {
          icon: 'save',
          label: 'Publish',
          callback: () => this.publish()
        }
      ]
    })
  }

  publish(): void {
    this.lock = true;
    if (this.addArticleForm.valid) {
      // TODO: pin thumbnail
      if (this.newThumbnail) {
        this.imageService
          .publishImage(this.newThumbnail)
          .subscribe((result) => {
            console.log('image result', result);
            this.addArticleForm.get('thumbnail')?.setValue(result.path);

            this.orbitDbService
              .saveArticle({
                _id: this.addArticleForm
                  .get('title')!
                  .value.replace(' ', '-')
                  .toLowerCase()
                  .substring(0, 16),
                title: this.addArticleForm.get('title')!.value,
                html: this.addArticleForm.get('html')!.value,
                thumbnail: this.addArticleForm.get('thumbnail')!.value,
                createdAt: Date.now()
              })
              .then((article) => {
                console.log('saved article', article);
                this.router.navigate(['']);
              });
          });
      } else {
        alert('No thumbnail');
      }
    }

  }

  onSelectionChanged(e: any) {
    console.log('onSelectionChanged', e);
  }

  onContentChanged(e: any) {
    this.addArticleForm.controls.html.setValue(e.html);
  }

  loaded($event: any) {
    this.newThumbnail = $event;
  }

}
