import React, { createContext, useState } from 'react'
import { runGemini, runGeminiImage, runGeminiQuizAnalysis } from '../../geminiConfig/gemini';

export const GeminiContext = createContext();

const GeminiContextProvider = (props) => {
  const [quizTopic, setQuizTopic] = useState("")
  const [dificulty, setDifficulty] = useState(1)
  const [numberOfQuestions, setNumberOfQuestions] = useState(10)
  const [showResult, setShowResult] = useState(false)
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [uploadedImage, setUploadedImage] = useState(null)
  const [topics, setTopics] = useState(['Math', 'Science', 'History', 'Geography'])
  const [userAnswers, setUserAnswers] = useState([])
  const [performanceScores, setPerformanceScores] = useState([])
  const [suggestedTopics, setSuggestedTopics] = useState([])

  const sendPrompt = async (topic, numberOfQuestions, difficulty) => {
    let quizPrompt = `Give me a list of ${numberOfQuestions} questions on the topic: ${topic}.
        The difficulty of each of the questions should be ${difficulty}. 
        Difficulty 1 is the easiest while difficulty 10 is the hardest. 
        For each of the questions give me 4 options of which 1 is the write answer. 
        Give the correct answers for each questions as well.
        The format of the response should be as follows:
        The first line of the question should contain the question.
        The second line, should contain four options separeted by a ;.
        The third line, should contain the correct answer.
        The next line should be empty.
        For example, the format should be like this:
        Sample question 1?
        OptionA OptionB OptionC OptionD
        OptionC
        
        Sample question 1?
        OptionA OptionB OptionC OptionD
        OptionC

        Do not include any other text other than the questions, options and answers.
        `

    let response = ""
    setLoading(true)

    if (topic !== undefined) {
      response = await runGemini(quizPrompt);
    }

    console.log(response)
    parseQuestions(response)
    setLoading(false)
    setQuizTopic(topic)
    setSelectedOption(null)
    setCurrentQuestionIndex(0);
    setScore(0);
  }

  const parseQuestions = (response) => {
    const questions = [];
    const lines = response.trim().split('\n');

    for (let i = 0; i < lines.length; i += 4) {
      const questionText = lines[i].trim();
      const optionsText = lines[i + 1].trim().split(';');
      const answerText = lines[i + 2].trim();

      questions.push({
        question: questionText,
        options: optionsText,
        answer: answerText
      });
    }

    setQuestions(questions);
  }

  const uploadImage = async () => {
    if (!uploadedImage) {
      alert("Please select a file to upload.");
      return;
    }

    const reader = new FileReader();
    let prompt = `The file contains my syllabus. 
    Can you analyze it and return the important topics which are essential for study and can be quized.
    Return the topics on new lines.
    For example:
    Topic1
    Topic2
    Topic3
    
    Do not include any other text other than the topic names.`

    reader.onload = async (event) => {
      const base64Data = event.target.result.split(',')[1];

      const imageData = {
        inlineData: {
          data: base64Data,
          mimeType: "image/png",
        },
      }

      let response = await runGeminiImage(prompt, imageData)
      console.log(response)
      parseTopics(response)
    }

    reader.readAsDataURL(uploadedImage);
  }

  const parseTopics = (response) => {
    const topics = [];
    const lines = response.trim().split('\n');

    lines.forEach(line => {
      topics.push(line);
    });

    setTopics(topics)
    console.log(topics)
  }

  const analyzeQuiz = async () => {
    console.log("Entered analyzeQuiz")

    let prompt = `Below is a list of questions, their correct answer and the answer that was selected by the user.
    The format of the questions, correct answer and incorrect answer is as follows:
    Question 1
    Correct Answer
    User Answer
    
    Question 2
    Correct Answer
    User Answer

    The question, correct answer and user answers are each on a new line.
    There is an empty line in between all questions.

    Analyze the answers and identify how the user has performed. 
    Identify the subtopics that the user is both weak and strong. 
    Score the performance of the subtopics on a scale of 1 to 10.
    Score 1 means the user is weakest while score 10 means the user is the strongest.

    Return the subtopics and their scores.
    Each subtopic should be followed by the score sepeareted by a ': '.
    Each subtopic and the score should be present on a new line.
    For example:
    Subtopic 1: score
    Subtopic 2: score

    Also return a message for the user about their performance in one line.

    Do not include any other text other than the subtopics, their scores and the user message.
    `

    questions.forEach((question, index) => {
        const questionText = question.question;
        const correctAnswer = question.answer;
        const userAnswer = userAnswers[index];

        prompt += `Question: ${questionText}\n`;
        prompt += `Correct Answer: ${correctAnswer}\n`;
        prompt += `User Answer: ${userAnswer}\n\n`;
    });

    const response = await runGeminiQuizAnalysis(prompt)
    parseSubtopicsAndScores(response)
    console.log(response)
  }

  const parseSubtopicsAndScores = (response) => {
    console.log("Entered parseSubtopicsAndScores")
    const userScores = [];
    const lines = response.split('\n');

    lines.forEach(line => {
        const match = line.match(/^(.*?): (\d+)$/);
        if (match) {
            const name = match[1].trim();
            const score = parseInt(match[2].trim(), 10);
            userScores.push({ name, score });
        }
    });

    setPerformanceScores(userScores)
  }

  const geminiContextValue = {
    showResult, setShowResult,
    loading, setLoading,
    questions,
    quizTopic,
    sendPrompt,
    dificulty, setDifficulty,
    numberOfQuestions, setNumberOfQuestions,
    currentQuestionIndex, setCurrentQuestionIndex,
    selectedOption, setSelectedOption,
    score, setScore,
    uploadedImage, setUploadedImage,
    uploadImage,
    topics,
    userAnswers, setUserAnswers,
    analyzeQuiz,
    performanceScores
  }

  return (
    <GeminiContext.Provider value={geminiContextValue}>
      {props.children}
    </GeminiContext.Provider>
  )
}

export default GeminiContextProvider