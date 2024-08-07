import React, { useContext } from 'react'
import QuizQuestion from '../QuizQuestion/QuizQuestion';
import { useState, useEffect } from 'react';
import './QuizHome.css'
import { GeminiContext } from '../GeminiContext/GeminiContext';
import { FunctionCallingMode } from '@google/generative-ai/server';
import CustomBarChart from '../graphs/BarChart';

const QuizHome = () => {
    const {questions, quizTopic, 
        selectedOption, setSelectedOption,
        currentQuestionIndex, setCurrentQuestionIndex, 
        score, setScore,
        userAnswers, setUserAnswers,
        analyzeQuiz,
        performanceScores,
        
    } = useContext(GeminiContext)

    useEffect(() => {
        if (selectedOption !== null) {
            if (selectedOption === questions[currentQuestionIndex].answer) {
                setScore(score + 1);
            }
            setSelectedOption(null);
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setUserAnswers([...userAnswers, selectedOption]);
            console.log(userAnswers)
        }}, [selectedOption]
    );

    useEffect(() => {
        const analyzeQuizAsync = async () => {
            await analyzeQuiz();
        };

        if (questions.length > 0 && currentQuestionIndex >= questions.length) {
            analyzeQuizAsync();
        }
    }, [currentQuestionIndex]);

    if (questions.length > 0 && currentQuestionIndex >= questions.length) {
        return (
            <>
                <div className="quiz-home">
                    <p>Your score: {score}</p>
                    <div>
                        <h1>Your Performance</h1>
                        <CustomBarChart performanceScores={performanceScores}/>
                    </div>
                </div>
            </>
        );
    }

    return (
        <div className="quiz-home">
            {questions.length !== 0 ?
                <div>
                    <h2>{quizTopic} Quiz</h2>
                    <QuizQuestion
                        question={questions[currentQuestionIndex]}
                        setSelectedOption={setSelectedOption}
                    />
                </div>
                
                : <h2>Please Select a Topic.</h2>
            }

        </div>
    )
}

export default QuizHome
