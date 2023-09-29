import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.css'],
})
export class InputComponent {
	query: any = '';
	@Output() searchMovie = new EventEmitter<string>();
	constructor(
		public _SearchService: SearchService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {}

	ngOnInit() {
		this.activatedRoute.url.subscribe((segments) => {
			const isSearchRoute = segments.some(
				(segment) => segment.path === 'search'
			);

			if (!isSearchRoute) {
				this.query = '';
			} else {
				this._SearchService.searchQuery.subscribe((query) => {
					this.query = query;
				});
			}
		});
	}

	searchData(query: string) {
		this._SearchService.setSearchQuery(query);
		this.searchMovie.emit(query);
	}
}
