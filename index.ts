import dbInit from './db/init';
import LearnDash from "./lib";
dbInit()

const learnDash: LearnDash = new LearnDash()

async function init (){
    let response = await learnDash.courses!.getById(161);
    console.log(response.lessons![0].quizes);
}

init();