import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WatchlistService } from 'src/app/movie/services/watchlist.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
	watchlistCount: number = 0;
	constructor(private watchlist: WatchlistService) {}

	ngOnInit() {
		this.watchlist.watchListMovies.subscribe((watchlist) => {
			this.watchlistCount = watchlist.size;
			console.log('countwatchlist', this.watchlistCount);
		});
	}
}
