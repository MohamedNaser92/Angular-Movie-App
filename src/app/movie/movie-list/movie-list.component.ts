import { Component } from '@angular/core';
import { MovieInterface } from '../movie-interface';
import { MovieService } from '../services/movie.service';
import { WatchlistService } from '../services/watchlist.service';

@Component({
	selector: 'app-movie-list',
	templateUrl: './movie-list.component.html',
	styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent {
	trendingMovies: MovieInterface[] = [];

	posterPrefix: string = 'https://image.tmdb.org/t/p/w500/';
	constructor(
		_MovieService: MovieService,
		private watchlist: WatchlistService
	) {
		_MovieService.getPopularMovies(1).subscribe((data) => {
			console.log(data);

			this.trendingMovies = data.results;
		});
	}
	ngOnInit() {
		this.watchlist.getWatchlistMovies().subscribe((data) => {});
	}

	toggleWatchlist(movieId: number) {
		console.log(movieId);
		this.watchlist.addToWatchlist(movieId).subscribe(() => {});
	}

	isExistInWatchlist(movieId: number): boolean {
		console.log();
		return this.watchlist.isExistInWatchlist(movieId);
	}
}
