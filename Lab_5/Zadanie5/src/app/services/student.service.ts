import { Injectable } from '@angular/core';

import { Student } from '../students/student';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  students: Student[];
  constructor(private db: AngularFireDatabase) {}

  async createStudent(student: Student) {
    const id = this.db.createPushId();
    await this.db.list('students').set(id, { ...student, key: id });
  }

  async updateStudent(key: string, value: any) {
    await this.db.list('students').set(key, value);
  }

  async deleteStudent(key: string) {
    await this.db.object(`/students/${key}`).remove();
  }

  getStudentsList() {
    const studentsObserver = this.db.list<Student>('students').valueChanges();

    studentsObserver.subscribe((data) => {
      this.students = data;
    });
    return studentsObserver;
  }

  async deleteAll() {
    await this.db.list<Student>('students').remove();
  }
}
