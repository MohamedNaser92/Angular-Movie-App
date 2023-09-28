
import { SearchService } from "../services/search.service";


export class MovieListComponent {
  query: string = "";
  searchQuery: string = "";
  filterdMovie: MovieInterface[] = [];

  constructor(private _SearchService: SearchService) {}

  searchMovies(query: string) {
    this._SearchService.getSearchedItems(query);
    this._SearchService.getMovies().subscribe((val) => {
      this.filterdMovie = val;
    });
    this.searchQuery = query;
  }

import { Component } from '@angular/core';
import { MovieInterface } from '../movie-interface';
import { MovieService } from '../services/movie.service';
import { WatchlistService } from '../services/watchlist.service';
import { ActivatedRoute, Router, Scroll } from '@angular/router';

@Component({
	selector: 'app-movie-list',
	templateUrl: './movie-list.component.html',
	styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent {
	trendingMovies: MovieInterface[] = [];
	currentPage: number = 1;
	totalPages: number = 500;

	posterPrefix: string = 'https://image.tmdb.org/t/p/w500/';
	constructor(
		private movieService: MovieService,
		private watchlist: WatchlistService,
		private router: Router,
		private route: ActivatedRoute,
	) {
		// _MovieService.getPopularMovies(1).subscribe((data) => {
		// 	console.log(data);
		// 	this.trendingMovies = data.results;
		// });
	}

	ngOnInit() {
		// To get pages in home
		this.route.queryParams.subscribe((params) => {
			this.currentPage = +params['page'] || 1;
			this.getPopularMovies();
		});
		// To get Movies Stored in WatchList
		this.watchlist.getWatchlistMovies().subscribe((data) => {});
	}

	// Function fetch Popular Movies From API
	getPopularMovies() {
		this.movieService.getPopularMovies(this.currentPage).subscribe((data) => {
			this.trendingMovies = data.results;
		});
	}

	onPageChange(pageNumber: number) {
		this.router.navigate([], {
			relativeTo: this.route,
			queryParams: { page: pageNumber },
			queryParamsHandling: 'merge',
		});
		this.getPopularMovies();
		window.scrollTo(0, 0);
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

	// To generate Page Numbers
	generatePageNumbers(): number[] {
		const pageNumbers: number[] = [];

		const maxPagesToShow = 5; // You can adjust this value to show a different number of pages

		const startPage = Math.max(
			this.currentPage - Math.floor(maxPagesToShow / 2),
			1
		);
		const endPage = Math.min(startPage + maxPagesToShow - 1, this.totalPages);

		for (let i = startPage; i <= endPage; i++) {
			pageNumbers.push(i);
		}

		return pageNumbers;
	}
}
