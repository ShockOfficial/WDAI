import { Component, Input, OnInit } from '@angular/core';
import { Post } from './post. model';
import { DataService } from '../data.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  @Input() inputTitleValue: string;
  @Input() inputAreaValue: string;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.fetchPosts().subscribe((res) => {
      this.posts = res;
    });
  }

  onSubmit(e: SubmitEvent) {
    e.preventDefault();
    const data = {
      id: Date.now(),
      title: this.inputTitleValue,
      body: this.inputAreaValue,
    };

    this.dataService.uploadPost(data).subscribe(() => {
      this.inputAreaValue = '';
      this.inputTitleValue = '';
    });
  }
}
