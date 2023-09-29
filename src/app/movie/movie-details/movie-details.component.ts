import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { MovieInterface } from '../movie-interface';
import { CommonModule } from '@angular/common';
import { WatchlistService } from '../services/watchlist.service';

@Component({
	selector: 'app-movie-details',
	templateUrl: './movie-details.component.html',
	styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
	constructor(
		private _ActivatedRoute: ActivatedRoute,
		private _MovieService: MovieService,
		private watchlist: WatchlistService
	) {}
	movieId: any;
	movieDetails!: any;
	posterPrefix: string = 'https://image.tmdb.org/t/p/w500/';
	ngOnInit(): void {
		this._ActivatedRoute.paramMap.subscribe((params) => {
			this.movieId = params.get('id');
		});

		this._MovieService.getMovieDetails(this.movieId).subscribe({
			next: (response) => (this.movieDetails = response),
		});
		// To get Movies Stored in WatchList
		this.watchlist.getWatchlistMovies().subscribe((data) => {});
	}

	// To Add or Remove Movie From Watchlist
	toggleWatchlist(movieId: number) {
		console.log(movieId);
		this.watchlist.addToWatchlist(movieId).subscribe(() => {});
	}
	// To check is the Movie in watchlist
	isExistInWatchlist(movieId: number): boolean {
		console.log();
		return this.watchlist.isExistInWatchlist(movieId);
	}
}
