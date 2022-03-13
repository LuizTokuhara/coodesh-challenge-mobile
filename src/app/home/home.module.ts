import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { UserCardComponent } from '../components/user-card/user-card.component';
import { UserCardModalComponent } from '../components/user-card-modal/user-card-modal.component';
import { GenderSelectComponent } from '../components/gender-select/gender-select.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    HomePage,
    UserCardComponent,
    UserCardModalComponent,
    GenderSelectComponent,
  ],
})
export class HomePageModule {}
