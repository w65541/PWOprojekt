import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'linkify'
})
export class LinkifyPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    if (!value) return '';

    const urlRegex = /(https?:\/\/[^\s]+)/g;

    const escaped = value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    const linked = escaped.replace(urlRegex, (url) => {
      const cleanUrl = url.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
      return `<a href="${cleanUrl}" target="_blank" rel="noopener noreferrer" class="text-primary fw-semibold notif-link">${cleanUrl}</a>`;
    });

    return this.sanitizer.bypassSecurityTrustHtml(linked);
  }
}
