import { Component, ViewChildren, QueryList, Renderer2 } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { LastSeenService } from '../../core/services/last-seen.service';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { TranslateHelperService } from '../../core/services/translate-helper.service';
import { ApiService } from '../../core/services/api.service';

@Component({
	selector: 'Product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss']
})

export class ProductComponent {
	@ViewChildren('Demo') Demos: QueryList<any>

	mobile = window.innerHeight + window.innerWidth < 2000;

	product: any = {
		model: {},
		subTitle: {},
		params: [],
		specs: [],
		extras: [],
		images: [],
	};
	category: string;

	Images_Array = [];
	Demos_Array = [];

	constructor(
		private router: Router,
		private Renderer: Renderer2,
		private apiService: ApiService,
		private cartService: CartService,
		private productsService: ProductsService,
		private lastSeenService: LastSeenService,
		private translateHelper: TranslateHelperService,
	) {
		this.getProduct();
		this.router.routeReuseStrategy.shouldReuseRoute = () => false;
	}

	get getLanguage() {
		return this.translateHelper.getLanguageCode()
	}

	get getImageLink() {
		return this.apiService.getBaseUrl() + 'static/'
	}

	async getProduct() {
		let split = location.href.split('/');
		this.category = split[split.length - 3];
		this.product = (await this.productsService.getByUrl(split[split.length - 1]))[0];
		this.lastSeenService.addLastSeenItem(this.product);
	}

	showSlides(Slide) {
		this.Images_Array.forEach(Image => {
			this.Renderer.setStyle(Image.nativeElement, 'display', 'none');
		});

		this.Demos_Array.forEach(Demo => {
			this.Renderer.removeClass(Demo.nativeElement, 'Active');
		});

		this.Renderer.setStyle(this.Images_Array[Slide].nativeElement, 'display', 'block')
		this.Renderer.addClass(this.Demos_Array[Slide].nativeElement, 'Active');
	}

	currentSlide(n) {
		this.showSlides(n);
	}

	addToCart() {
		let extras = {};
		for(let counter = 0; counter < this.product.extras.length; counter++) {
			// let radios = document.getElementsByName("5ee283b7793c574b64641822");
			// for(let innerCounter = 0; innerCounter < radios.length; innerCounter++) {
			// 	if((radios[innerCounter] as any).checked) {
			// 		extras[this.product.extras[counter]._id] = this.product.extras[counter].values[innerCounter]._id;
			// 	}
			// }
		}
		this.product.selectedExtras = extras;
		this.cartService.addCartItem(this.product, extras);
		this.router.navigate(['cart']);
	}

	arrows = [
		{
			slide: 'prev',
			class: 'Carousel-Control-Previous carousel-control-prev',
			icon: './assets/images/HomeComponent/Previous.svg'
		},
		{
			slide: 'next',
			class: 'Carousel-Control-Next carousel-control-next',
			icon: './assets/images/HomeComponent/Next.svg'
		}
	];
}