import Users from "./modules/Users";
import Courses from "./modules/Courses";

class LearnDash {
    public users: Users;
    public courses: Courses;

    constructor() {
        this.users = new Users();
        this.courses = new Courses();
    }
}

export default LearnDash;