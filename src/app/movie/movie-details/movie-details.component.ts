import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { MovieInterface } from '../movie-interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  constructor(private _ActivatedRoute: ActivatedRoute,
              private _MovieService: MovieService) {}
  movieId: any;
  movieDetails!: MovieInterface;
  posterPrefix:string = 'https://image.tmdb.org/t/p/w500/';
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe ((params) => {
      this.movieId = params.get('id');
    });

    this._MovieService.getMovieDetails(this.movieId).subscribe({
      next: (response) => this.movieDetails = response
    })
  }

}
