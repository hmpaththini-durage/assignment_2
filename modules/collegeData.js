const fs = require('fs');
const path = require('path');

class Data {
    constructor(students, courses) {
        this.students = students;
        this.courses = courses;
    }
}

let dataCollection = null;

module.exports.initialize = function() {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, '../data/students.json'), 'utf8', (err, studentData) => {
            if (err) {
                reject("unable to read students.json");
                return;
            }
            const students = JSON.parse(studentData);

            fs.readFile(path.join(__dirname, '../data/courses.json'), 'utf8', (err, courseData) => {
                if (err) {
                    reject("unable to read courses.json");
                    return;
                }
                const courses = JSON.parse(courseData);
                dataCollection = new Data(students, courses);
                resolve();
            });
        });
    });
};

module.exports.getAllStudents = function() {
    return new Promise((resolve, reject) => {
        if (dataCollection.students.length > 0) {
            resolve(dataCollection.students);
        } else {
            reject("no results returned");
        }
    });
};

module.exports.getTAs = function() {
    return new Promise((resolve, reject) => {
        const TAs = dataCollection.students.filter(student => student.TA === true);
        if (TAs.length > 0) {
            resolve(TAs);
        } else {
            reject("no results returned");
        }
    });
};

module.exports.getCourses = function() {
    return new Promise((resolve, reject) => {
        if (dataCollection.courses.length > 0) {
            resolve(dataCollection.courses);
        } else {
            reject("no results returned");
        }
    });
};
