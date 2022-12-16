import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Post } from './post. model';
import { DataService } from '../data.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  @ViewChild('inputTitle') inputTitle: ElementRef;
  @ViewChild('inputArea') inputArea: ElementRef;

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
      title: this.inputTitle.nativeElement.value,
      body: this.inputArea.nativeElement.value,
    };

    this.dataService.uploadPost(data).subscribe(() => {
      // Bad way
      this.inputArea.nativeElement.value = '';
      this.inputTitle.nativeElement.value = '';
    });
  }
}
