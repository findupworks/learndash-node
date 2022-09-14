import TopicOutput from "./topic.output";
import QuizOutput from "./quiz.output";


interface LessonsAttributes {
    id: number;
    title: string;
    topics?: TopicOutput[];
    quizes?: QuizOutput[];
    type?: string;
}

export default interface LessonsOutput extends LessonsAttributes {}