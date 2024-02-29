import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Attendance, AttendanceData, CourseDetailed, Grade, GradeData, Student, StudentData } from 'src/Models/models';

@Injectable({providedIn: 'root'})
export class DataService {
   myAppUrl: string;
   constructor(private http: HttpClient) {
      this.myAppUrl = environment.endpoint;
   }
   //  Student endpoints:
   getAllStudents(filters?: {course_id?: number;  gender_id?: number; age?: number}): Observable<Student[]>{
      return this.http.get<Student[]>(this.myAppUrl + '/api/students', { params: filters })
   }

   getStudentById(id: number):Observable<Student>{
      return this.http.get<Student>(this.myAppUrl + `/api/student/${id}`)
   }
   addStudent(student: StudentData): Observable<void>{
      return this.http.post<void>(this.myAppUrl + `/api/student/add`, student)
   }
   updateStudent(id: number, student: StudentData): Observable<void>{
      const url = `${this.myAppUrl}/api/student/${id}`;
      return this.http.put<void>(url, student)
   }
   deleteStudent(id: number): Observable<void>{
      console.log(this.myAppUrl + `/api/student/${id}`)
      return this.http.delete<void>(this.myAppUrl + `/api/student/${id}`)
   }
   getImageUrl(filename: string): string {
      const sanitizedFilename = filename.replace('Resources/', '');
      return `${this.myAppUrl}/api/students/image/${sanitizedFilename}`;
    }
    
   //  Attendances endpoints:
   getAllAttendances(): Observable<Attendance[]>{
   return this.http.get<Attendance[]>(this.myAppUrl + '/api/attendances')
   }
   addAttendance(attendance: AttendanceData): Observable<void>{
      return this.http.post<void>(this.myAppUrl + `/api/attendance/add`, attendance)
   }

   //  Grades endpoints:
   getAllGrades(): Observable<Grade[]>{
   return this.http.get<Grade[]>(this.myAppUrl + '/api/grades')
   }
   addGrade(grade: GradeData): Observable<void>{
      return this.http.post<void>(this.myAppUrl + `/api/grade/add`, grade)
   }
   getStudentsByCourseId(course_id: number): Observable<CourseDetailed>{
      return this.http.get<CourseDetailed>(this.myAppUrl + `/api/students/course/${course_id}`)
   }
 
}