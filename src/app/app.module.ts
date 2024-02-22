import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Page400Component } from './shared/components/page400/page400.component';
import { Page500Component } from './shared/components/page500/page500.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpRequestInterceptor } from './core/interceptors/http-request-interceptors';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ExceptionHandlerService } from './shared/services/exception-handler.service';
@NgModule({
  declarations: [AppComponent, Page400Component, Page500Component],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 2000,
    }),
  ],
  exports: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
    { provide: MAT_DATE_LOCALE, useValue: 'en-IN' },
    { provide: ErrorHandler, useClass: ExceptionHandlerService }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
