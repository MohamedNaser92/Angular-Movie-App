import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MovieInterface } from '../movie-interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class SearchService {
	private apiKey = '26de892603494c5470a3c361874c7c6c';
	private baseUrl = 'https://api.themoviedb.org/3/search/movie';

	constructor(private http: HttpClient) {}

	movies = new BehaviorSubject<MovieInterface[]>([]);
	moviesSearchPages = new BehaviorSubject<number>(1);
	searchQuery = new BehaviorSubject<string>('');
	totalResults = new BehaviorSubject<string>('');

	getSearchedItemsOtherPages(query: string, page: number): Observable<any> {
		const params = new HttpParams()
			.set('api_key', this.apiKey)
			.set('query', query)
			.set('page', page.toString());

		return this.http.get(this.baseUrl, { params });
	}
	getSearchedItems(query: string, page: number) {
		this.getSearchedItemsOtherPages(query, page).subscribe((res) => {
			this.movies.next(res.results);
			this.moviesSearchPages.next(res.total_pages);
			this.totalResults.next(res.total_results);
		});
	}

	getMovies() {
		return this.movies.asObservable();
	}

	getMoviesSearchPages() {
		return this.moviesSearchPages.asObservable();
	}
	getMoviesSearchResults() {
		return this.totalResults.asObservable();
	}
	setSearchQuery(query: string) {
		this.searchQuery.next(query);
	}

	getSearchQuery() {
		return this.searchQuery.asObservable();
	}
}
