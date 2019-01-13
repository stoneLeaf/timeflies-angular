import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LobbyRoutingModule } from './lobby-routing.module';

import { IntroductionComponent } from './components/introduction/introduction.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { PageOutletComponent } from './components/page-outlet/page-outlet.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    IntroductionComponent,
    SignUpComponent,
    TopBarComponent,
    PageOutletComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    LobbyRoutingModule,
    FormsModule
  ]
})
export class LobbyModule { }
