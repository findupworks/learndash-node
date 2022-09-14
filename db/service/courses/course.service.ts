import Course, {PostOuput} from "../../models/Post";
import TermTaxonomy from "../../models/TermTaxonomy";
import PostMeta, {PostMetaOuput} from "../../models/PostMeta";
import CourseOutput from "./dto/course.output";
import Post from "../../models/Post";
import CategoriesOutput from "./dto/categories.output";
import LessonsOutput from "./dto/lessons.output";
import TopicOutput from "./dto/topic.output";
import QuizOutput from "./dto/quiz.output";


const getInfoCourse = (id: number, postType: string, metaKey: string): Promise<PostOuput[]> => {
    return Post.findAll({
        where: {
            type: postType,
        },
        include: [
            {
                model: PostMeta,
                where : {
                    meta_key: metaKey,
                    meta_value: id,
                }
            }
        ]
    })
}

export const getById = async (id: number): Promise<CourseOutput> => {
    // Get information Wordpress
    const course = await Post.findOne({
        where: {
            id: id,
            status: "publish",
            type: "sfwd-courses",
        },
        include: [
            {
                model: PostMeta,
                as: "image",
                where: {
                    meta_key: "_thumbnail_id"
                }
            },
            {
                model: TermTaxonomy,
                as: 'categories',
                include: [
                    "term"
                ]
            }
        ],
    });

    if (!course) {
        throw new Error('course not found')
    }

    // Convert to clean organization
    let item: CourseOutput[] = [];
    // Categories
    const listCategories: CategoriesOutput[] = course.categories.map(cat => {
        return {id: cat.term.id, name: cat.term.name}
    });
    /// Lessons and Topics
    const lessonsDb = await getInfoCourse(id, "sfwd-lessons", "course_id");

    let lessons: LessonsOutput[] = [];
    for(const lesson of lessonsDb){
        /// Topics
        const topicsDB = await getInfoCourse(lesson.id, "sfwd-topic", "lesson_id");
        let topics: TopicOutput[] = [];
        topics = topicsDB.map(topic => { return { id: topic.id, title: topic.title}});
        /// Quiz
        const quizDB = await getInfoCourse(lesson.id, "sfwd-quiz", "lesson_id");
        let quizes: QuizOutput[] = [];
        quizes = quizDB.map(quiz => { return { id: quiz.id, title: quiz.title}});
        // Lesson
        lessons.push({ id: lesson.id, title: lesson.title, topics: topics, quizes: quizes, type: "lesson"});
    }

    /// Heading Lessons
    const courseSections = await PostMeta.findOne({
        where: {
            post_id: id,
            meta_key: "course_sections"
        }
    });

    /// Quiz
    const quizDB = await getInfoCourse(id, "sfwd-quiz", "course_id");

    for(const quiz of quizDB){
        const have = await PostMeta.findOne({
            where: {
                post_id: quiz.id,
                meta_key: "lesson_id",
            }
        });

        if(!have){
            lessons.push({ id: quiz.id, title: quiz.title, type: "quiz"});
        }
    }

    if(courseSections) {
        JSON.parse(courseSections?.meta_value!).map((item: any) => {
            lessons.splice(item.order, 0, {
                id: item.ID,
                title: item.post_title,
                type: "section-heading"
            })
        })
    }


    console.log(lessons);
    // Image
    const image = await PostMeta.findOne({
        where: {
            meta_key: "_wp_attached_file",
            post_id: course.image.meta_value
        }
    });
    return {
        id: course.id,
        title: course.title,
        content: course.content.replace(/<\/?[^>]+(>|$)/g, ""),
        categories: listCategories,
        image: `${process.env.DOMAIN_FILES}/wp-content/uploads/${image?.meta_value}`,
        lessons: lessons,
    };
}

export const getAll = async (
    // filters?: GetAllIngredientsFilters
): Promise<CourseOutput[]> => {
    // Get information Wordpress
    const response : PostOuput[] = await Post.findAll({
        where: {
            // ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}})
            status: "publish",
            type: "sfwd-courses",
        },
        include: [
            {
                model: PostMeta,
                as: "image",
                where: {
                    meta_key: "_thumbnail_id"
                }
            },
            {
                model: TermTaxonomy,
                as: 'categories',
                include: [
                    "term"
                ]
            }
        ],
        // ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
    });

    // Convert to clean organization
    let list: CourseOutput[] = [];

    for(const course of response){
        // Categories
        const listCategories: CategoriesOutput[] = course.categories.map(cat => { return {id: cat.term.id, name: cat.term.name} });
        // Image
        const image =  await PostMeta.findOne({
            where: {
                meta_key: "_wp_attached_file",
                post_id: course.image.meta_value
            }
        });
        // Course
        list.push( {
            id: course.id,
            title: course.title,
            content: course.content.replace(/<\/?[^>]+(>|$)/g, ""),
            categories: listCategories,
            image: `${process.env.DOMAIN_FILES}/wp-content/uploads/${image?.meta_value}`,
        });
    }

    return list;
}

