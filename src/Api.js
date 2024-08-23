import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8080/api';
const API_BASE_URL = 'http://192.168.99.100:8080/api';

export const fetchCourses = () => axios.get(`${API_BASE_URL}/courses`);
export const createCourse = (course) => axios.post(`${API_BASE_URL}/courses`, course);
export const deleteCourse = (id) => axios.delete(`${API_BASE_URL}/courses/${id}`);

export const fetchInstances = (year, semester) => axios.get(`${API_BASE_URL}/instances/${year}/${semester}`);
export const createInstance = (instance) => axios.post(`${API_BASE_URL}/instances`, instance);
export const deleteInstance = (year, semester, courseId) => axios.delete(`${API_BASE_URL}/instances/${year}/${semester}/${courseId}`);
