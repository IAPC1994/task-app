import { useEffect } from 'react';
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom";
import { createTask, deleteTask, getTaskById, updateTask } from "../api/tasks.api";
import { toast } from 'react-hot-toast'

interface FormInput {
  title: string;
  description: string;
  done?: boolean;
}

export const TaskFormPage = () => {

  const { register, handleSubmit, reset, formState:{ errors }, setValue } = useForm<FormInput>();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getTask = async() => {
      if( id ) {
        const { data } = await getTaskById(id);
        setValue('title', data.title);
        setValue('description', data.description);
      }
    }
    getTask();
  }, [])
  

  const onSubmit = async( data:FormInput ) => {
    if( id ){
      await updateTask( id, data );
      toast.success('Task updated!', {position:'bottom-right', style:{ background: "#101010", color: "#fff" }})
    }else{
      await createTask( data );
      toast.success('Task created!', {position:'bottom-right', style:{ background: "#101010", color: "#fff" }})
    }
    navigate('/tasks');
    reset();
  }

  return (
    <div className='max-w-xl mx-auto'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Title" className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' {...register('title', { required: true })} />
        {
          errors.title && <span>Title is required</span>
        }
        <textarea rows={3} placeholder="Description" className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' {...register('description', { required: true })} />
        {
          errors.description && <span>Description is required</span>
        }
        <button className='bg-indigo-500 p-3 rounded-lg block w-full mt-3 hover:bg-indigo-600'>{ id ? 'Update' : 'Create'}</button>
      </form>

        {
          id && <button className='bg-red-500 hover:bg-red-600 p-3 rounded-lg w-full mt-3' onClick={async() => {
            const response = window.confirm('Are you sure to delete the task?')
            if( response ){
              await deleteTask(id);
              toast.success('Task deleted!', {position:'bottom-right', style:{ background: "#101010", color: "#fff" }})
              navigate('/tasks');
            }
          }}>Delete</button>
        }
    </div>
  )
}
