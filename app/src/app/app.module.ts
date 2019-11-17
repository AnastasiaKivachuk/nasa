import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';

import { ReactiveFormsModule }   from '@angular/forms';
import { TableComponent } from './table/table.component';
import {HttpClientModule} from '@angular/common/http';
import { ServiceService } from './service/service.service';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    TableComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
