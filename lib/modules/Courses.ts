import * as CourseService from "../../db/service/courses/course.service";
class Courses {
    getAll(){
        return CourseService.getAll();
    }

    getById(id: number){
        return CourseService.getById(id);
    }
}

export default Courses;