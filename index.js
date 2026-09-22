const express = require("express")
const app = express();

app.use(express.static("C:/Users/APOORVA/Downloads/Web dev code/quizeapp/frontend"))
app.use(express.json());

let score = 0;

const questions = [
  { id: 1, question: "What is the capital of France?", answer: "Paris" },
  { id: 2, question: "What is 7 x 6?", answer: "42" },
  { id: 3, question: "Who wrote Romeo and Juliet?", answer: "Shakespeare" }
];

app.get("/questions",function(req,res){
    const random = questions[Math.floor(Math.random() * questions.length)];
    res.json({ 
        id: random.id, 
        question: random.question 
    });
})

app.post("/answers",function(req,res){
   const id = req.body.id;
   const answer = req.body.answer;

   const questionObject = questions.find(q => q.id === id);
   const isCorrect = questionObject.answer.toLowerCase() === answer.toLowerCase();
   if(isCorrect){
       score++
   }

   res.json({
      isCorrect : isCorrect,
      correctAnswer:questionObject.answer,
      score : score
   })

})

app.listen(3000);