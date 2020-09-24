import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';

declare var $;

@Component({
	selector: 'Category',
	templateUrl: './category.component.html',
	styleUrls: ['./category.component.scss']
})

export class CategoryComponent {
	mobile = window.innerHeight + window.innerWidth < 2000;
	category: any = '';
	products: any = [];
	loading = true;

	constructor(
		private router: Router,
		private productsService: ProductsService
	) {
		router.events.subscribe((val) => {
			if(val instanceof NavigationEnd) {
				this.category = this.router.url.split('/')[2]
				this.getProducts(this.category);
			}
		});
	}

	async getProducts(category) {
		this.loading = true;
		this.products = (await this.productsService.getByCategory(category) as any).sort((a, b) => a.index - b.index).sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
		for(let counter = 0; counter < this.products.length; counter++) {
			this.products[counter].statusContent = await this.getContent(this.products[counter].status);
		}
		if(!this.mobile) {
			setTimeout(() => {
				// Init popovers
				// TODO: FIX THIS
				// $('[data-toggle="popover"]').popover()
			}, 1000)
		}
		this.loading = false;
	}

	async getContent(status) {
		return await this.productsService.getContent(status);
	}
}