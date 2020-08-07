import React from 'react';

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
        <div>
            <p>
                Question: {questionNumber} / {totatlNumberofQuestion}
            </p>

            <p dangerouslySetInnerHTML={{ __html: question }} />

            {answers.map(answer => (
                <div>
                    <button disabled={userAnswer} value={answer} onClick={callBack} >

                        <span dangerouslySetInnerHTML={{ __html: answer }} />

                    </button>
                </div>
            ))}
        </div>
    )
}