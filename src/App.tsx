import React, { useState } from 'react';
import { CardofQuestion } from './components/CardofQuestion';
import { fetchQuestion, DifficultyLevel, QuestionJoining } from './components/API';
import { GlobalStyle, Wrapper } from './App.styles';

const totalQuestion = 10;

type selectedAnswer = {
  question: string;
  answer: string;
  rightanswer: boolean;
  correctAnswer: string;
}

function App() {
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState<selectedAnswer[]>([]);
  const [questionNumber, setQuestionNumber] = useState<QuestionJoining[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(fetchQuestion(totalQuestion, DifficultyLevel.EASY));

  const StartingofQuizFunction = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await (fetchQuestion(totalQuestion, DifficultyLevel.EASY));
    setQuestionNumber(newQuestions);
    setScore(0);
    setUserAnswer([]);
    setNumber(0);
    setLoading(false)
  }
  const MovetoNextQuestion = async () => {
    const increaseNumber = number + 1;
    if (increaseNumber === totalQuestion) {
      setGameOver(true);
    }
    else {
      setNumber(increaseNumber);
    }
  };


  const checkAnswer = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;

      const rightanswer = questionNumber[number].correct_answer === answer;
      if (rightanswer) setScore(prev => prev + 1)

      const selectedAnswer = {
        question: questionNumber[number].question,
        answer,
        rightanswer,
        correctAnswer: questionNumber[number].correct_answer,
      }
      setUserAnswer(prev => [...prev, selectedAnswer])
    }
  };

  return (
    <>
      <GlobalStyle/>
      <Wrapper>
        <h1>React Quiz App</h1>
        {gameOver || userAnswer.length === totalQuestion ? (
          <button onClick={StartingofQuizFunction}> Start Quiz </button>) : null}
        {!gameOver ? (
          <p>Score: {score}</p>) : null}

        {loading ? (
          <p> loading </p>
        ) : null}

        {!loading && !gameOver ? (
          <CardofQuestion
            questionNumber={number + 1}
            totatlNumberofQuestion={totalQuestion}
            question={questionNumber[number].question}
            answers={questionNumber[number].answers}
            userAnswer={userAnswer ? userAnswer[number] : undefined}
            callBack={checkAnswer}
          />
        ) : null}
        {!gameOver && !loading && userAnswer.length === number + 1 && number !== totalQuestion - 1 ? (
          <button onClick={MovetoNextQuestion}> Next Question </button>
        ) : null}
      </Wrapper>
    </>
  );
}
export default App;