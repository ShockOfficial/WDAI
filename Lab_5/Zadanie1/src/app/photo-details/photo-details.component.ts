import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.scss'],
})
export class PhotoDetailsComponent implements OnInit {
  url: string;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.url = this.route.snapshot.queryParams['url'];
  }
}
