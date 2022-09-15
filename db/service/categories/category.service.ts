import TermTaxonomy from "../../models/TermTaxonomy";
import CategoryOutput from "./dto/category.output";
import Terms from "../../models/Terms";

export const getById = async (id: number): Promise<CategoryOutput> => {
    
    const category = await Terms.findOne({
        where: {
            id: id,
        },
        include: [            
            {
                model: TermTaxonomy,
                as: 'categories',
                where: {
                    taxonomy: "ld_course_category"
                },
                include: [
                    "term"
                ]
            }
        ],
    });

    if (!category) {
        throw new Error('category not found')
    }    
    
    return {
        id: category.id,
        name: category.name
    };
}

export const getAll = async (): Promise<CategoryOutput[]> => {    
    const categories : CategoryOutput[] = await Terms.findAll({        
        include: [            
            {
                model: TermTaxonomy,
                as: 'categories',
                where: {
                    taxonomy: "ld_course_category"
                },
                include: [
                    "term"
                ]
            }
        ],        
    });    

    return categories;
}