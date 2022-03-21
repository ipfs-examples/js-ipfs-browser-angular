import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToolbarService } from 'src/app/services/toolbar.service';

@Component({
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css'],
})
export class CreateArticleComponent implements OnInit {
  addArticleForm: FormGroup;
  htmlText: string = '';
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
  constructor(private formBuilder: FormBuilder, private toolbarService: ToolbarService) {
    this.addArticleForm = this.formBuilder.group({
      title: ['', Validators.required],
      text: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.toolbarService.setTitle('Create article');
    this.toolbarService.setButtons({
      buttons: [
        {
          icon: 'save',
          label: 'Publish'
        }
      ]
    })
  }

  onSelectionChanged(e: any) {
    console.log('onSelectionChanged', e);
  }

  onContentChanged(e: any) {
    console.log('onContentChanged', e);
  }

}
