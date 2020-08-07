import {shuffeledarray} from './utilities';
export const  fetchQuestion = async ( amount : number, difficulty : DifficultyLevel) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const data = await(await fetch(endpoint)).json(); 
    return data.results.map((question:Question)=>(
        {
            ...question,
            answers : shuffeledarray([ ...question.incorrect_answers, question.correct_answer ])
        }
    ))
};

export enum DifficultyLevel {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
};

 export type Question = {
     category : string,
     correct_answer : string,
     difficulty : string,
     incorrect_answers : string[],
     question : string,
     type : string;
 };

 export type QuestionJoining = Question & { answers: string[] };