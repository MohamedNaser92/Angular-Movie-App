import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class MovieService {
	private apiKey = '26de892603494c5470a3c361874c7c6c';
	private baseUrl = 'https://api.themoviedb.org/3';

	constructor(private http: HttpClient) { }

	getPopularMovies(page: number): Observable<any> {
		return this.http.get(
			`${this.baseUrl}/movie/popular?api_key=${this.apiKey}&page=${page}`
		);
	}

	getTopRatedMovies(): Observable<any> {
		return this.http.get(
			`${this.baseUrl}/movie/top_rated?api_key=${this.apiKey}&page=1`
		);
	}

	getMovieDetails(movieId: number) {
		return this.http.get(
			`${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}`
		);
	}
	getRecommendedMovies(movieId: number) {
		return this.http.get(
			`${this.baseUrl}/movie/${movieId}/recommendations?api_key=${this.apiKey}`
		);
	}
	searchMovies(query: string) {
		return this.http.get(
			`${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${query}`
		);
	}
}

// Popular movies:
// https://api.themoviedb.org/3/movie/popular?api_key=26de892603494c5470a3c361874c7c6c&page=1

// Top Rated Movies:
// https://api.themoviedb.org/3/movie/top_rated?api_key=26de892603494c5470a3c361874c7c6c&page=1

// Movie Details:
// https://api.themoviedb.org/3/movie/2?api_key=26de892603494c5470a3c361874c7c6c

// Recommended Movies:
//https://api.themoviedb.org/3/movie/2/recommendations?api_key=26de892603494c5470a3c361874c7c6c

//Search Movies:
//https://api.themoviedb.org/3/search/movie?api_key=26de892603494c5470a3c361874c7c6c&query=batman
