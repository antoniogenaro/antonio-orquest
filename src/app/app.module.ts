import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
  ],
  providers: [
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { timezone: 'GMT+0100' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
