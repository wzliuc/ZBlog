import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'zblog-project-pdf',
  templateUrl: './project-pdf.component.html',
  styleUrls: ['./project-pdf.component.css']
})
export class ProjectPdfComponent implements OnInit {
  @ViewChild('viewer') pdfEle: ElementRef;
  pdfName: string;
  pdfUrl: SafeResourceUrl;

  constructor(private route: ActivatedRoute,
              private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( p => {
      this.pdfName = p.get('pdfName');
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl('../../../assets/pdf/' + this.pdfName);
    });
  }
}
