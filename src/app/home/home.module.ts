import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule, // ReactiveFormsModule module
    HomePageRoutingModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}

//OG CODE
// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { IonicModule } from '@ionic/angular';
// import { FormsModule } from '@angular/forms';
// import { HomePage } from './home.page';
// import { ReactiveFormsModule } from '@angular/forms';


// import { HomePageRoutingModule } from './home-routing.module';


// @NgModule({
//   imports: [
//     CommonModule,
//     FormsModule,
//     IonicModule,
//     ReactiveFormsModule, // ✅ Add the ReactiveFormsModule module
//     HomePageRoutingModule
//   ],
//   declarations: [HomePage]
// })
// export class HomePageModule {}
