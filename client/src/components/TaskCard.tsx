import { TaskResponse } from "../interfaces"
import { useNavigate } from 'react-router-dom';

interface Props {
    task: TaskResponse
}

export const TaskCard = ({ task }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer rounded-md shadow-md" onClick={() => {
      navigate(`/tasks/${ task.id }`)
    }}>
        <h1 className="font-bold uppercase">{ task.title }</h1>
        <p className="text-slate-400">{ task.description }</p>
    </div>
  )
}
