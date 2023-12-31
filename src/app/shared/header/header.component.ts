import { Component, HostListener } from '@angular/core';
import { RouterModule, RouterLink } from '@angular/router';
import { WatchlistService } from 'src/app/movie/services/watchlist.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
	watchlistCount: number = 0;
	constructor(private watchlist: WatchlistService) {}

	@HostListener('window:scroll', ['$event'])
	onWindowScroll() {
		let element = document.querySelector('nav') as HTMLElement;
		if (window.pageYOffset > element.clientHeight) {
			element.classList.add('nav-scroll');
		} else {
			element.classList.remove('nav-scroll');
		}
	}
	ngOnInit() {
		this.watchlist.watchListMovies.subscribe((watchlist) => {
			this.watchlistCount = watchlist.size;
		});
	}
}
