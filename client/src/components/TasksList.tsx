import { useEffect, useState } from "react"
import { getAllTasks } from "../api/tasks.api"
import { TaskResponse } from "../interfaces";
import { TaskCard } from "./TaskCard";

export const TasksList = () => {

    const [tasks, setTasks] = useState<TaskResponse[]>([]);

    useEffect(() => {
        const loadTasks = async() => {
            const { data } = await getAllTasks();
            setTasks(data);
        }
        loadTasks()
    }, [])
    

    return (
        <div className="grid grid-cols-3 gap-3">
            {
                tasks!.map( task => (
                    <TaskCard key={ task.id } task={ task }/>
                ))
            }
        </div>
    )
}
