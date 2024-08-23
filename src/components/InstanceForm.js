import React, { useState } from 'react';
import { createInstance } from '../Api';

function InstanceForm({ courses, refreshInstances }) {
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('');
    const [courseId, setCourseId] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!year || !semester || !courseId) {
            setError('All fields are required');
            setSuccess('');
            return;
        }
        try {
            await createInstance({ year, semester, course: { id: courseId } });
            refreshInstances();
            setYear('');
            setSemester('');
            setCourseId('');
            setError('');
            setSuccess('Instance created successfully!');
            // Clear success message after 3 seconds
            setTimeout(() => {
                setSuccess('');
            }, 3000);
        } catch (err) {
            setError('Failed to add instance');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="instance-form">
            <h2>Register for a Course</h2>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            <input 
                value={year} 
                onChange={(e) => setYear(e.target.value)} 
                placeholder="Year" 
                className="form-input"
            />
            <input 
                value={semester} 
                onChange={(e) => setSemester(e.target.value)} 
                placeholder="Semester" 
                className="form-input"
            />
            <select 
                value={courseId} 
                onChange={(e) => setCourseId(e.target.value)} 
                className="dropdown"
            >
                <option value="">Select Course</option>
                {courses.map(course => (
                    <option key={course.id} value={course.id}>
                        {course.title}
                    </option>
                ))}
            </select>
            <button type="submit" className="btn-submit">Add Instance</button>
        </form>
    );
}

export default InstanceForm;
