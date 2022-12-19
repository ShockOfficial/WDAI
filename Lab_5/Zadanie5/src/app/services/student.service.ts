import { Injectable } from '@angular/core';

import { Student } from '../students/student';

import { FirebaseDatabase } from '@angular/fire';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
	providedIn: 'root',
})
export class StudentService {
	constructor(private db: AngularFireDatabase) {}

	createStudent(student: Student): void {
		// this.fireStore.collection('students').doc(id).set({ data: 'ss' });
		console.log('sukces');
	}

	updateStudent(key: string, value: any) {}

	deleteStudent(key: string) {}

	getStudentsList() {}

	deleteAll() {}
}

