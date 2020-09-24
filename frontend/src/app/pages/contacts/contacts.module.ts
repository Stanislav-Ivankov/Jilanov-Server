import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { GoogleMapsModule } from '@angular/google-maps';

import { ContactsComponent } from './contacts.component';

const ComponentRoutes: Routes = [
	{
		path: '', component: ContactsComponent
	}
];

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		TranslateModule,
		GoogleMapsModule,
		RouterModule.forChild(ComponentRoutes)
	],
	declarations: [
		ContactsComponent
	],
	exports: [
		ContactsComponent
	]
})



export class ContactsModule {}