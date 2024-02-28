
export type Student = {
    id: number
    picture: string
    firstName: string
    lastName: string,
    gender: string,
    age: number,
    courseName: string
}
export type StudentData = {
    Picture?: string
    FirstName: string
    LastName: string,
    Age: number,
    GenderId: number,
    CourseId: number
}
export type Attendance = {
    id: number;
    date: Date;
    status: AttendanceStatusEnum;
    student: {
        id: number
        picture: string
        name: string
    }
    subject: Item;
    course: Item;
};
export type AttendanceData = {
    Date: Date;
    StatusId: number;
    StudentId: number;
    SubjectId: number;
    CourseId: number;
};

export type Grade = {
    id: number;
    score: number;
    letterGrade: string;
    student: {
        id: number
        picture: string
        name: string
        course: Item;
    }
    subject: Item;
};
export type GradeData = {
    id: number;
    score: number;
    letterGrade: string;
    studentId: number;
    subjectId: number;
};
export type Course = Item
export type Subject = Item

export type Item = {
    id: number
    description: string
}

export enum AttendanceStatusEnum {
    Presente = 1,
    Ausente,
    Excusa
}