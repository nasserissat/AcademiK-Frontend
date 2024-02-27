
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
    student: {
        id: number
        picture: string
        name: string
    }
    subject: Item;
    course: Item;
};
export type AttendanceData = {
    id: number;
    date: Date;
    attended: boolean;
    studentId: number;
    subjectId: number;
    courseId: number;
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