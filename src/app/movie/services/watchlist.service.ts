import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class WatchlistService {
	private baseUrl = 'https://api.themoviedb.org/3';
	private accountId = '20494923';
	private token =
		'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNmRlODkyNjAzNDk0YzU0NzBhM2MzNjE4NzRjN2M2YyIsInN1YiI6IjY1MTFiYzI0MzQ0YThlMDk3MDA0ZjNjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VxW4Gzv-4VGkcXlgL0lmTZ6kI91mbZJjDJ0ly1p34S4';

	private watchlist: Set<number> = new Set<number>();

	private watchlistChanges = new BehaviorSubject<Set<number>>(this.watchlist);

	watchListMovies: Observable<Set<number>> =
		this.watchlistChanges.asObservable();

	constructor(private http: HttpClient) {}

	addToWatchlist(movieId: number): Observable<any> {
		// console.log('watchlist', this.watchlist);
		if (this.watchlist.has(movieId)) {
			return this.removeFromWatchlist(movieId);
		}
		const url = `${this.baseUrl}/account/${this.accountId}/watchlist`;
		const body = {
			media_type: 'movie',
			media_id: movieId,
			watchlist: true,
		};

		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: `Bearer ${this.token}`,
		});

		return this.http.post(url, body, { headers }).pipe(
			tap(() => {
				this.watchlist.add(movieId);
				this.watchlistChanges.next(this.watchlist);
			})
		);
	}

	removeFromWatchlist(movieId: number): Observable<any> {
		const url = `${this.baseUrl}/account/${this.accountId}/watchlist`;
		const body = {
			media_type: 'movie',
			media_id: movieId,
			watchlist: false,
		};

		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: `Bearer ${this.token}`,
		});

		return this.http.post(url, body, { headers }).pipe(
			tap(() => {
				this.watchlist.delete(movieId);
				this.watchlistChanges.next(this.watchlist);
			})
		);
	}

	getWatchlistMovies(): Observable<any> {
		const url = `${this.baseUrl}/account/${this.accountId}/watchlist/movies`;
		const headers = new HttpHeaders({
			Authorization: `Bearer ${this.token}`,
		});
		return this.http.get(url, { headers }).pipe(
			tap((response: any) => {
				const watchListMovies = response.results;
				this.watchlist.clear();
				watchListMovies.forEach((movie: any) => {
					this.watchlist.add(movie.id);
				});
				this.watchlistChanges.next(this.watchlist);
			})
		);
	}

	isExistInWatchlist(movieId: number): boolean {
		return this.watchlist.has(movieId);
	}
}
