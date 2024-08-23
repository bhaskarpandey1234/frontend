import React, { useState } from 'react';
import { fetchInstances, deleteInstance } from '../Api';
import '../App.css';


function InstanceList() {
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('');
    const [instances, setInstances] = useState([]);
    const [error, setError] = useState('');

    const loadInstances = async () => {
        if (!year || !semester) {
            setError('Year and Semester are required');
            return;
        }
        try {
            const response = await fetchInstances(year, semester);
            setInstances(response.data);
            setError('');
        } catch (err) {
            setError('Failed to load instances');
        }
    };

    const handleDelete = async (courseId) => {
        try {
            await deleteInstance(year, semester, courseId);
            loadInstances();
        } catch (err) {
            setError('Failed to delete instance');
        }
    };

    return (
        <div className="instance-list-container">
            <h2>Course Instances</h2>
            {error && <div className="error-message">{error}</div>}
            <input 
                value={year} 
                onChange={(e) => setYear(e.target.value)} 
                placeholder="Year" 
                className="search-input"
            />
            <input 
                value={semester} 
                onChange={(e) => setSemester(e.target.value)} 
                placeholder="Semester" 
                className="search-input"
            />
            <button onClick={loadInstances} className="btn-refresh">List Instances</button>
            <table className="instance-table">
                <thead>
                    <tr>
                        <th>Course ID</th>
                        <th>Semester</th>
                        <th>Year</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {instances.map(instance => (
                        <tr key={instance.id}>
                            <td>{instance.course.id}</td>
                            <td>{instance.semester}</td>
                            <td>{instance.year}</td>
                            <td>
                                <button 
                                    onClick={() => handleDelete(instance.course.id)} 
                                    className="btn-delete"
                                >
                                    🗑️
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default InstanceList;
