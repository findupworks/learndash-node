import Users from "./modules/Users";
import Courses from "./modules/Courses";
import Categories from "./modules/Categories";
import dbInit from '../db/init';
class LearnDash {
    public users: Users;
    public courses: Courses;
    public categories: Categories;

    constructor() {
        dbInit()

        this.users = new Users();
        this.courses = new Courses();
        this.categories = new Categories();
    }
}

export default LearnDash;