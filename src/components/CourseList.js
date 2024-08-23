// import React, { useEffect, useState } from 'react';
// import { fetchCourses, deleteCourse } from '../Api';

// function CourseList() {
//     const [courses, setCourses] = useState([]);

//     const loadCourses = async () => {
//         const response = await fetchCourses();
//         setCourses(response.data);
//     };

//     const handleDelete = async (id) => {
//         await deleteCourse(id);
//         loadCourses();
//     };

//     useEffect(() => {
//         loadCourses();
//     }, []);

//     return (
//         <div>
//             <h2>All Courses</h2>
//             <ul>
//                 {courses.map(course => (
//                     <li key={course.id}>
//                         {course.title} - {course.courseCode}
//                         <button onClick={() => handleDelete(course.id)}>Delete</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default CourseList;






//2nd

import React, { useState,useEffect} from 'react';
import { fetchCourses, deleteCourse } from '../Api';
import '../App.css';
// import { fetchCourses, deleteCourse } from '../Api';

// function CourseList() {
//     const [courses, setCourses] = useState([]);
//     const [showCourses, setShowCourses] = useState(false);

//     const loadCourses = async () => {
//         const response = await fetchCourses();
//         setCourses(response.data);
//     };

//     const handleDelete = async (id) => {
//         await deleteCourse(id);
//         loadCourses(); // Reload courses after deletion
//     };

//     const handleShowCourses = () => {
//         if (!showCourses) {
//             loadCourses(); // Load courses when showing them for the first time
//         }
//         setShowCourses(!showCourses); // Toggle visibility
//     };

//     return (
//         <div>
//             <button onClick={handleShowCourses}>
//                 {showCourses ? 'Hide Courses' : 'Show Courses'}
//             </button>
//             {showCourses && (
//                 <div>
//                     <h2>All Courses</h2>
//                     <ul>
//                         {courses.map(course => (
//                             <li key={course.id}>
//                                 {course.title} - {course.courseCode}
//                                 <button onClick={() => handleDelete(course.id)}>Delete</button>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default CourseList;
// CourseList.js


// function CourseList() {
//     const [courses, setCourses] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [showCourses, setShowCourses] = useState(false);

//     useEffect(() => {
//         if (showCourses) {
//             loadCourses();
//         }
//     }, [showCourses]);

//     const loadCourses = async () => {
//         const response = await fetchCourses();
//         setCourses(response.data);
//     };

//     const handleDelete = async (id) => {
//         await deleteCourse(id);
//         loadCourses(); // Reload courses after deletion
//     };

//     const handleShowCourses = () => {
//         setShowCourses(!showCourses); // Toggle visibility
//     };

//     const handleSearch = (e) => {
//         setSearchTerm(e.target.value);
//     };

//     const filteredCourses = courses.filter(course => 
//         course.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <div className="course-list-container">
//             <div className="header">
//                 <button onClick={handleShowCourses} className="btn-toggle">
//                     {showCourses ? 'Hide Courses' : 'Show Courses'}
//                 </button>
//                 {showCourses && (
//                     <>
//                         <input 
//                             type="text" 
//                             placeholder="Search..." 
//                             value={searchTerm} 
//                             onChange={handleSearch} 
//                             className="search-input" 
//                         />
//                         <button onClick={loadCourses} className="btn-refresh">Refresh</button>
//                     </>
//                 )}
//             </div>
//             {showCourses && (
//                 <table className="course-table">
//                     <thead>
//                         <tr>
//                             <th>Title</th>
//                             <th>Course Code</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredCourses.map(course => (
//                             <tr key={course.id}>
//                                 <td>{course.title}</td>
//                                 <td>{course.courseCode}</td>
//                                 <td>
//                                     <button 
//                                         onClick={() => handleDelete(course.id)} 
//                                         className="btn-delete"
//                                     >
//                                         🗑️
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// }

// export default CourseList;

function CourseList() {
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showCourses, setShowCourses] = useState(false);

    useEffect(() => {
        if (showCourses) {
            loadCourses();
        }
    }, [showCourses]);

    const loadCourses = async () => {
        try {
            const response = await fetchCourses();
            setCourses(response.data);
        } catch (err) {
            console.error("Failed to load courses:", err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteCourse(id);
            loadCourses(); // Reload courses after deletion
        } catch (err) {
            console.error("Failed to delete course:", err);
        }
    };

    const handleShowCourses = () => {
        setShowCourses(!showCourses); // Toggle visibility
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredCourses = courses.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="course-list-container">
            <div className="header">
                <button onClick={handleShowCourses} className="btn-toggle">
                    {showCourses ? 'Hide Courses' : 'List Courses'}
                </button>
                {showCourses && (
                    <div className="search-bar">
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            value={searchTerm} 
                            onChange={handleSearch} 
                            className="search-input" 
                        />
                        <button onClick={loadCourses} className="btn-refresh">Refresh</button>
                    </div>
                )}
            </div>
            {showCourses && (
                <table className="course-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Course Code</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCourses.map(course => (
                            <tr key={course.id}>
                                <td>{course.title}</td>
                                <td>{course.courseCode}</td>
                                <td>
                                    <button 
                                        onClick={() => handleDelete(course.id)} 
                                        className="btn-delete"
                                    >
                                        🗑️
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default CourseList;
