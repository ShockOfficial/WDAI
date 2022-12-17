import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.scss'],
})
export class PhotoDetailsComponent implements OnInit {
  url: string;
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.url = this.route.snapshot.queryParams['url'];

    if (this.url === undefined) {
      const id = this.route.snapshot.url[1].path;
      this.dataService.fetchPhoto(id).subscribe((photo) => {
        this.url = photo.url;
      });
    }
  }
}
