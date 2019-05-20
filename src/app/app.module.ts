import { BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbdDatepickerPopup} from './components/datepicker-popup/datepicker-popup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchAutoComponent } from './components/search-auto/search-auto.component';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';
import { RecaptchaComponent } from './components/recaptcha/recaptcha.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

@NgModule({
  declarations: [
    AppComponent,
    NgbdDatepickerPopup,
    SearchAutoComponent,
    RecaptchaComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
