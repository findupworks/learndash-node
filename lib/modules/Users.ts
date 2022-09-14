import * as UserService from "../../db/service/user.service";

class Users {
    getById(id: number){
        return UserService.getById(id);
    }

    getAll(){
        return UserService.getAll();
    }
}

export default Users;