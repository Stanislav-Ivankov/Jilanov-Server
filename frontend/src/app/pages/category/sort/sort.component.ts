import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
	selector: 'Sort',
	templateUrl: './sort.component.html',
	styleUrls: ['./sort.component.scss']
})



export class SortComponent {

	@Input() products = [];

	Available_Promotion = true;
	Available_New_Product= true;

	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {

	}

	Sort_Products(Criteria) {

		switch (Criteria.ID) {
			case 'Promotions':
				console.log('Sort By : Promotions.');
				this.addParameters({
					sortBy: 'promotions'
				  })
				break;
			case 'Price-Ascending':
				console.log('Sort By : Price-Ascending.');
				this.addParameters({
					sortBy: 'priceAsc'
				  })
				break;

			case 'Price-Descending':
				console.log('Sort By : Price-Descending.');
				this.addParameters({
					sortBy: 'priceDesc'
				  })
				break;

			case 'New-Products':
				console.log('Sort By : New-Products.');
				this.addParameters({
					sortBy: 'newProducts'
				  })
				break;

			case 'Alphabetically':
				console.log('Sort By : Alphabetically');
				this.addParameters({
					sortBy: 'alphabetically'
				  })
				break;
		}
	}

	addParameters(params) {
		this.router.navigate(
			[], 
			{
			  relativeTo: this.activatedRoute,
			  queryParams: params,
			  queryParamsHandling: 'merge'
			});
	}

	Sort_Criteria = [
		{
			ID: 'Promotions',
			For: 'Promotions',
			Label: 'Promotions'
		},
		{
			ID: 'Price-Ascending',
			For: 'Price-Ascending',
			Label: 'Price Ascending'
		},
		{
			ID: 'Price-Descending',
			For: 'Price-Descending',
			Label: 'Price Descending'
		},
		{
			ID: 'New-Products',
			For: 'New-Products',
			Label: 'New Products'
		},
		{
			ID: 'Alphabetically',
			For: 'Alphabetically',
			Label: 'Alpabetically'
		}
	];
}