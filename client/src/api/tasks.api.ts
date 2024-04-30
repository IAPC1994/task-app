import axios from "axios"
import { TaskForm, TaskResponse } from "../interfaces";

const taskApi = axios.create({
    baseURL: 'http://localhost:8000/tasks/api/v1/tasks/'
})

export const getAllTasks = async() => {
    return taskApi.get<TaskResponse[]>('/');
}

export const getTaskById = async(id: string) => {
    return taskApi.get<TaskResponse>(`/${id}`);
}

export const createTask = async( task:TaskForm ) => {
    return taskApi.post<TaskResponse[]>('/', task);
}

export const updateTask = async( id: string, task:TaskForm ) => {
    return taskApi.put<TaskResponse>(`/${id}/`, task);
}

export const deleteTask = async( id: string ) => {
    return taskApi.delete(`/${id}`);
}

