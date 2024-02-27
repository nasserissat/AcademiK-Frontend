
export type Student = {
    id: number
    picture: string
    firstName: string
    lastName: string,
    gender: Item,
    age: number,
    course: Item
}
export type StudentData = {
    id: number
    picture: string
    firstName: string
    lastName: string,
    genderId: number,
    age: number,
    courseId: number
}
export type Attendance = {
    id: number;
    date: Date;
    attended: boolean;
    student: Item;
    subject: Item;
};
export type AttendanceData = {
    id: number;
    date: Date;
    attended: boolean;
    studentId: number;
    subjectId: number;
};

export type Grade = {
    id: number;
    score: number;
    letterGrade: string;
    student: Item;
    subject: Item;
};
export type GradeData = {
    id: number;
    score: number;
    letterGrade: string;
    studentId: number;
    subjectId: number;
};

export type Item = {
    id: number
    description: string
}