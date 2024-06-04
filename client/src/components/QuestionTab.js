import React, { useState } from 'react';
import './QuestionTab.css';
import SideNav from './SideNav';

const QuestionTab = () => {
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setQuestion(e.target.value);
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError(''); // Clear any previous errors

        const prompt = `
        You are an AI assistant specializing exclusively in providing workout and fitness-related advice. Regardless of the question asked, respond with answers that are strictly related to workouts, fitness routines, exercise techniques, or anything within the scope of physical fitness. Ignore any non-fitness-related inquiries. Here are some example categories you should focus on:

        Workout Routines (e.g., strength training, cardio, flexibility exercises)
        Exercise Techniques (e.g., proper form for squats, how to do a push-up correctly)
        Fitness Tips (e.g., how to stay motivated, benefits of regular exercise)
        Workout Plans (e.g., plans for beginners, intermediate, or advanced levels)
        Fitness Equipment (e.g., how to use dumbbells, kettlebell exercises)
        Recovery (e.g., stretching routines, foam rolling techniques)
        Nutrition for Fitness (e.g., pre-workout meals, post-workout nutrition)

        Always ensure that your responses are concise, clear, and strictly confined to workout and fitness-related topics.
        `;

        try {
            const result = await fetch('http://localhost:5001/api/chatgpt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: `${prompt}\n${question}` }),
            });

            console.log('Response from server:', result);

            if (result.ok) {
                const data = await result.json();
                console.log('Data received:', data);
                setResponse(data.response);
            } else {
                const errorData = await result.json();
                console.error('Error response data:', errorData);
                setError(errorData.error || 'An error occurred');
            }
        } catch (error) {
            console.error('Error fetching ChatGPT response:', error);
            setError('An error occurred while fetching the response.');
        }
        setLoading(false);
    };

    return (
        <div className="question-tab-dashboard">
            <div className="dashboard-grid">
                <SideNav />
                
                <div className="question-tab-content">
                    <h2>Ask a Question</h2>
                    <textarea
                        value={question}
                        onChange={handleChange}
                        placeholder="Type your question here..."
                    />
                    <button onClick={handleSubmit} disabled={loading}>
                        {loading ? 'Loading...' : 'Submit'}
                    </button>
                    {error && (
                        <div className="error">
                            <h3>Error:</h3>
                            <p>{error}</p>
                        </div>
                    )}
                    {response && (
                        <div className="response">
                            <h3>Response:</h3>
                            <p>{response}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuestionTab;
