import Question from '../models/quiz-questions.js';
import History from '../models/attemptedHistory.js';

function* shuffle(array) {

    let i = array.length;

    while (i--) {
        yield array.splice(Math.floor(Math.random() * (i+1)), 1)[0];
    }

}

export const get = async(req, res) => {
    try {
        const { Tag } = req.body;

        if(!Tag) {
            return res.status(405).json({message: "tag is Missing!"});
        }
        
        const questions = await Question.find({ Tag });
        const arrayNum=[] , n=questions.length;   
        for(let i=0;i<n;i++){
            arrayNum.push(i);
        }
        const ranNums = shuffle(arrayNum);
        const question = [];
        for(let i=0;i<10;i++){
            question.push(questions[ranNums.next().value]);
        }
        
        return res.status(200).json({message: `${question.length} Question Delivered`, data: question});
    } catch(error) {
        return res.status(404).json({message: error.message});
    }
}

export const getHistory = async(req, res) => {
    try {
        const { userID } = req.params;

        if(!userID) {
            return res.status(405).json({message: "user ID is Missing!"});
        }

        const questions = await History.find({ userID });

        return res.status(200).json({message: `${userID} history delivered`, data: questions});
    } catch(error) {
        return res.status(404).json({message: error.message});
    }
}


// https://opentdb.com/api_config.php
export const add = async(req, res) => {
    try {
        const {results} = req.body;
        console.log(results);
        for(const element of results){
        let { category, question, correct_answer, incorrect_answers } = element;
        const Array = [[0,1,2,3],[0,1,3,2],[0,2,1,3],[0,2,3,1],[0,3,1,2],[0,3,2,1],[1,0,2,3],[1,0,3,2],[1,2,0,3],[1,2,3,0],[1,3,0,2],[1,3,2,0],[2,0,1,3],[2,0,3,1],[2,1,0,3],[2,1,3,0],[2,3,0,1],[2,3,1,0],[3,0,1,2],[3,0,2,1],[3,1,0,2],[3,1,2,0],[3,2,0,1],[3,2,1,0]];
        const questionIndex = Array[Math.floor(Math.random() * 24)];
        const answer = questionIndex[0];
        const options = {};
        options[questionIndex[0]]=correct_answer;
        options[questionIndex[1]]=incorrect_answers[0];
        options[questionIndex[2]]=incorrect_answers[1];
        options[questionIndex[3]]=incorrect_answers[2];

        const que = await Question.create({
            Tag: category,
            question,
            options,
            answer
        });}

        return res.status(200).json({message: "Question Added"});
    } catch(error) {
        if(error.name === 'ValidationError') {
            if(error.errors.body) {
                return res.status(404).json({message: "Description length should be less than or equal to 140"});                
            } else if(error.errors.title) {
                return res.status(404).json({message: "Title length should be less than or equal to 50"});                
            }
        }
        return res.status(404).json({message: error.message});
    }
}

