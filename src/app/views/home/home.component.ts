import { Component, OnInit } from '@angular/core';
import { MarvelService } from 'src/app/services/marvel.service';

export interface ResultsComics {
  id: number;
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  images: [
    {
      path: string;
      extension: string;
    }
  ];
  description: string;
}

let setOffset = 0;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  allComics: ResultsComics[];
  loadingComics: boolean = false;

  constructor(private marvelApi: MarvelService) {
    this.allComics = [];
  }

  ngOnInit(): void {
    this.loadingComics = true;

    this.getAllComicsList();

    window.addEventListener('scroll', () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      if (clientHeight + scrollTop >= scrollHeight - 5) {
        this.loadMoreComics();
      }
    });
  }

  async getAllComicsList() {
    this.marvelApi.getAllComics(setOffset).subscribe((post) => {
      this.allComics = post.data.results;
      this.loadingComics = false;
    });
  }

  checked() {
    console.log('checked');
  }

  loadMoreComics() {
    this.loadingComics = true;
    setOffset += 21;
    this.marvelApi
      .getAllComics(setOffset)
      .subscribe((post) => {
        this.allComics = this.allComics.concat(post.data.results);
        this.loadingComics = false;
      });
  }
}
