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
        userAnalytics,
        sendPrompt,
        numberOfQuestions,
        difficulty
        
    } = useContext(GeminiContext)

    useEffect(() => {
        if (selectedOption !== null) {
            if (selectedOption === questions[currentQuestionIndex].answer) {
                setScore(prevScore => prevScore + 1);
            }
            setSelectedOption(null);
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setUserAnswers([...userAnswers, selectedOption]);
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
        const { performanceScores = [], userMessage = "", suggestedTopics = [] } = userAnalytics || {};

        return (
            <>
                <div className="quiz-home">
                    <p>Your score: {score} / {numberOfQuestions}</p>
                    <h4>{userAnalytics.userMessage}</h4>

                    <hr />
                    
                    <div className='bar-graph'>
                        <h1>Your Performance</h1>
                        <CustomBarChart performanceScores={userAnalytics.performanceScores}/>
                    </div>

                    <hr />

                    <h4>Suggested Topics</h4>
                    <div className='suggested-topics'>
                            {suggestedTopics.length > 0 ? (suggestedTopics.map((topic, index) => (
                                <div onClick={async () => await sendPrompt(topic, numberOfQuestions, difficulty)} className='suggested-topic' key={index}>
                                    {topic}
                                </div>
                            )))
                            :
                                <h4>Suggesting...</h4>
                            }
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
