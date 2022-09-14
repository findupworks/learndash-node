import * as CourseService from "../../db/service/courses/course.service";
import course from "../../db/models/Post";

class Courses {
    getAll(){
        return CourseService.getAll();
    }

    getById(id: number){
        return CourseService.getById(id);
    }
}

export default Courses;