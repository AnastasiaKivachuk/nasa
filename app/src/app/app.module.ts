import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormComponent} from './form/form.component';

import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ServiceService} from './service/service.service';
import {DetailsComponent} from './details/details.component';
import {StoreModule} from '@ngrx/store';
import {reducer} from './store/reducers/data.reducer';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { DataEffects } from './effect/data.effect';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({
      storeData: reducer
    }),
    StoreDevtoolsModule.instrument({maxAge: 5}),
    EffectsModule.forRoot([DataEffects])
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
