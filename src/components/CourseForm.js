import React, { useState } from 'react';
import { createCourse } from '../Api';
// import '../App.css';
import '../courseForm.css';

function CourseForm({ refreshCourses }) {
    const [title, setTitle] = useState('');
    const [courseCode, setCourseCode] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(''); // Success message state


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !courseCode || !description) {
            setError('All fields are required');
            setSuccess(''); // Clear success message on error
            return;
        }
        try {
            await createCourse({ title, courseCode, description });
            refreshCourses();
            setTitle('');
            setCourseCode('');
            setDescription('');
            setError('');
            setSuccess('Course created successfully!');
            // Clear success message after 3 seconds
            setTimeout(() => {
                setSuccess('');
            }, 3000);
        } catch (err) {
            setError('Failed to create course');
            setSuccess(''); 
        }
    };

    return (
        <form onSubmit={handleSubmit} className="course-form">
            <h2>Create a Course</h2>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>} 
            <input 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Title" 
                className="form-input" 
            />
            <input 
                value={courseCode} 
                onChange={(e) => setCourseCode(e.target.value)} 
                placeholder="Course Code" 
                className="form-input" 
            />
            <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Description" 
                className="form-textarea"
            ></textarea>
            <button type="submit" className="btn-submit">Add Course</button>
        </form>
    );
}

export default CourseForm;
