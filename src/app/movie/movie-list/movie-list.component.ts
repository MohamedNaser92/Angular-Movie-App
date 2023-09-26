import { Component } from '@angular/core';
import { MovieInterface } from '../movie-interface';
import { MovieService } from '../services/movie.service'; 


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent {
  trendingMovies:MovieInterface[] = [];
  posterPrefix:string = 'https://image.tmdb.org/t/p/w500/';
  constructor (_MovieService: MovieService){
    _MovieService.getPopularMovies(1).subscribe ((data) => {
      console.log(data);
      
      this.trendingMovies = data.results;
    });
  }
}
