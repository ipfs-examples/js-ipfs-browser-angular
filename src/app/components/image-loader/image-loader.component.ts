import { ImageService } from './../../services/image.service';
import { Component, Input, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-image-loader',
  templateUrl: './image-loader.component.html',
  styleUrls: ['./image-loader.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageLoaderComponent implements OnInit {
  @Input()
  path: string = '';
  base64: SafeResourceUrl | null = null;
  loading = true;
  constructor(private imageService: ImageService, private sanitizer: DomSanitizer, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (this.path) {
      this.imageService.getImage(this.path).subscribe((result) => {
        this.base64 = this.sanitizer.bypassSecurityTrustStyle('url(data:image/png;base64,' + result + ')');
        this.changeDetectorRef.detectChanges();
      });
    }
  }
}
