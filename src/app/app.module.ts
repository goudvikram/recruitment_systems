import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { QuestionsComponent } from './questions/questions.component';

import {QuestionsService} from './questions.service';

import {CategoriesService} from './categories.service';

@NgModule({
  declarations: [
    AppComponent,
    QuestionsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [QuestionsService, CategoriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
