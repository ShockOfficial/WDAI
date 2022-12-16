import { Injectable } from '@angular/core';
import { Photo } from './photos/photo.model';
import { HttpClient } from '@angular/common/http';
import { Post } from './posts/post. model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  fetchPhotos() {
    return this.http.get<Photo[]>(
      'https://jsonplaceholder.typicode.com/photos'
    );
  }

  fetchPosts() {
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
  }

  uploadPost(data: { title: string; body: string; id: number }) {
    return this.http.post('https://jsonplaceholder.typicode.com/posts', data);
  }
}
