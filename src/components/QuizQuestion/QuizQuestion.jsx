import React from 'react'
import './QuizQuestion.css'

const QuizQuestion = ({ question, setSelectedOption }) => {
    return (
        <div>
            <div className="question">
                <h3>{question.question}</h3>
                    {question.options.map((option, index) => {
                        return(
                            <div className='options' key={index} onClick={() => setSelectedOption(option)}>
                                {option}
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default QuizQuestion
