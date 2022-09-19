import * as CategoryService from "../../db/service/categories/category.service";

class Categories {
    getById(id: number){
        return CategoryService.getById(id);
    }

    getAll(){
        return CategoryService.getAll();
    }
}

export default Categories;