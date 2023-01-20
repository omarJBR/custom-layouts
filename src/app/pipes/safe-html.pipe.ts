import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})

export class SafeHtmlPipe implements PipeTransform {

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  transform(htmlCode: string) {
    return this.sanitizer.bypassSecurityTrustHtml(htmlCode);
  }
}
