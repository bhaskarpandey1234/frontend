import React, { useState, useEffect } from 'react';
import CourseForm from './components/CourseForm';
import CourseList from './components/CourseList';
import InstanceForm from './components/InstanceForm';
import InstanceList from './components/InstanceList';
import './App.css';
import { fetchCourses, fetchInstances } from './Api'; // Assuming you have an api.js file for these functions

function App() {
    const [courses, setCourses] = useState([]);
    const [instances, setInstances] = useState([]);

    useEffect(() => {
        loadCourses();
        loadInstances();
    }, []);
    const loadCourses = async () => {
        try {
            const response = await fetchCourses();
            setCourses(response.data);
        } catch (error) {
            console.error('Failed to load courses:', error);
            // You can also set some error state if you want to display an error message to the user
        }
    };
    
    const loadInstances = async () => {
        try {
            const response = await fetchInstances();
            setInstances(response.data);
        } catch (error) {
            console.error('Failed to load instances:', error);
            // You can also set some error state if you want to display an error message to the user
        }
    };
    

    // const loadCourses = async () => {
    //     const response = await fetchCourses();
    //     setCourses(response.data);
    // };

    // const loadInstances = async () => {
    //     const response = await fetchInstances();
    //     setInstances(response.data);
    // };

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Course Management Website</h1>
            <CourseForm refreshCourses={loadCourses} />
            <CourseList courses={courses} refreshCourses={loadCourses} />
            <InstanceForm courses={courses} refreshInstances={loadInstances} />
            <InstanceList instances={instances} refreshInstances={loadInstances} />
        </div>
    );
}

export default App;
