import Users from "./modules/Users";
import Courses from "./modules/Courses";
import dbInit from '../db/init';
class LearnDash {
    public users: Users;
    public courses: Courses;

    constructor() {
        dbInit()

        this.users = new Users();
        this.courses = new Courses();
    }
}

export default LearnDash;