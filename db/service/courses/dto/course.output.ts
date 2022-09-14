import TermTaxonomy from "../../../models/TermTaxonomy";
import CategoriesOutput from "./categories.output";
import LessonsOutput from "./lessons.output";

interface CourseAttributes {
    id: number;
    title: string;
    content: string;
    type?: string;
    status?: string;
    categories?: CategoriesOutput[];
    image?: string;
    lessons?: LessonsOutput[]
}

export default interface CourseOutput extends CourseAttributes {}