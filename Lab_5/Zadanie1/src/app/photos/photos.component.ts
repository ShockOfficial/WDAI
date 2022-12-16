import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Photo } from './photo.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnInit {
  photos: Photo[] = [];
  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.dataService.fetchPhotos().subscribe((res) => {
      this.photos = res;
    });
  }

  navigateToDetails(id: number, url: string) {
    this.router.navigate([`photos`, id], { queryParams: { url } });
  }
}
