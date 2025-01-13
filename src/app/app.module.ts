// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes), 
    HttpClientModule,
    FormsModule, 
  ],
  providers: [provideHttpClient()],
  // bootstrap: [AppComponent]
})
export class AppModule { }
