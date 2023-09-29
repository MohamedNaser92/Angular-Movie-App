import { Component } from '@angular/core';
import { MovieInterface } from '../movie-interface';
import { SearchService } from '../services/search.service';
import { WatchlistService } from '../services/watchlist.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css'],
})
export class SearchComponent {
	query: string = '';
	searcValue: string = '';
	filterdMovie: MovieInterface[] = [];
	posterPrefix: string = 'https://image.tmdb.org/t/p/w500/';
	currentPage: number = 1;
	totalPages: number = 1;
	totalResults: string = '';

	results: any[] = [];

	constructor(
		public _SearchService: SearchService,
		private watchlist: WatchlistService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this._SearchService.getMovies().subscribe((val) => {
			this.filterdMovie = val;
		});
		this._SearchService.getMoviesSearchPages().subscribe((pages) => {
			this.totalPages = pages;
		});
		this._SearchService.getMoviesSearchResults().subscribe((results) => {
			this.totalResults = results;
		});

		// To get Movies Stored in WatchList
		this.watchlist.getWatchlistMovies().subscribe((data) => {});
		this._SearchService.getSearchQuery().subscribe((data) => {
			this.query = data;
		});
	}

	searchMovies(query: string) {
		this._SearchService.getSearchedItems(query, (this.currentPage = 1));
		this._SearchService.getMovies().subscribe((val) => {
			this.filterdMovie = val;
			this.query = query;
		});
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

	//Pagination and other pages:

	loadOtherPage(page: number) {
		if (page >= 1 && page <= this.totalPages) {
			this.currentPage = page;
			this._SearchService

				.getSearchedItemsOtherPages(this.query, this.currentPage)
				.subscribe((res) => {
					this.filterdMovie = res.results;
					console.log('from load', this.query, this.currentPage);
					console.log(this.filterdMovie);
				});
		}
	}

	top() {
		window.scrollTo(0, 0);
	}

	onPageChange(pageNumber: number) {
		this.router.navigate([], {
			relativeTo: this.route,
			queryParams: { page: pageNumber },
			queryParamsHandling: 'merge',
		});
		this.currentPage = pageNumber;
		this.loadOtherPage(this.currentPage);
		window.scrollTo(0, 0);
	}

	generatePageNumbers(): number[] {
		let pageNumbers: number[] = [];

		let maxPagesToShow = 5;

		let startPage = Math.max(
			this.currentPage - Math.floor(maxPagesToShow / 2),
			1
		);

		let endPage = Math.min(startPage + maxPagesToShow - 1, this.totalPages);

		for (let i = startPage; i <= endPage; i++) {
			pageNumbers.push(i);
		}

		return pageNumbers;
	}
}
