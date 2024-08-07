import React, { useContext } from 'react'
import './QuizActionBar.css'
import {GeminiContext} from '../GeminiContext/GeminiContext';
import Slider from '../Slider/Slider';

const QuizActionBar = () => {

    // const topics = ['Math', 'Science', 'History', 'Geography'];
    const {sendPrompt, difficulty, setDifficulty, numberOfQuestions, setNumberOfQuestions, uploadedImage, setUploadedImage, uploadImage, topics} = useContext(GeminiContext)

    // loadPrompt = async (topic) => {
    //     await sendPrompt(topic)
    // }

    const handleFileChange = (event) => {
        setUploadedImage(event.target.files[0])
    }

    const handleUpload = async () => {
        await uploadImage()
    }

    return (
        <div className='quiz-action-bar'>
            <h2>Upload Photo of your syllabus: </h2>
            <input className='file-input-wrapper' type="file" onChange={handleFileChange} accept="image/*" />
            <button className='upload-button' onClick={handleUpload}>Upload</button>

            <h2>Topics</h2>
            {topics.map((topic, index) => {
                return (
                    <div onClick={async () => await sendPrompt(topic, numberOfQuestions, difficulty)} className="quiz-topic" key={topic}>
                        {topic}
                    </div>
                )
            })}

            <h3>Adjust Difficulty</h3>
            <Slider min={1} max={10} step={1} value={difficulty} setValue={setDifficulty} />

            <h3>Adjust number of questions</h3>
            <Slider min={1} max={10} step={1} value={numberOfQuestions} setValue={setNumberOfQuestions} />
        </div>
    )
}

export default QuizActionBar
