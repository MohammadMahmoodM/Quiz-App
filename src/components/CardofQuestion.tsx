import React from 'react';
import { Wrapper, ButtonWrapper } from './CardofQuestion.styles';

type props = {
    question: string;
    answers: string[];
    userAnswer: any;
    callBack: any;
    questionNumber: number;
    totatlNumberofQuestion: number;
}

export const CardofQuestion: React.FC<props> = ({ question, answers, userAnswer, callBack, questionNumber, totatlNumberofQuestion }) => {

    return (
        <Wrapper>
            <p>
                Question: {questionNumber} / {totatlNumberofQuestion}
            </p>

            <p dangerouslySetInnerHTML={{ __html: question }} />

            {answers.map(answer => (
                <ButtonWrapper
                    correct = { userAnswer?.correctAnswer === answer }
                    userClicked = { userAnswer?.answer === answer }
                >
                    <button disabled={userAnswer} value={answer} onClick={callBack} >

                        <span dangerouslySetInnerHTML={{ __html: answer }} />

                    </button>
                </ButtonWrapper>
            ))}
        </Wrapper>
    )
}