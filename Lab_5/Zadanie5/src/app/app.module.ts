import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StudentDetailsComponent } from './students/student-details/student-details.component';
import { StudentsListComponent } from './students/students-list/students-list.component';
import { CreateStudentComponent } from './students/create-student/create-student.component';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

@NgModule({
  declarations: [
    AppComponent,
    StudentDetailsComponent,
    StudentsListComponent,
    CreateStudentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
