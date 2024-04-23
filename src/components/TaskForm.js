import { useState } from 'react';
import { supabase } from '../supabase/client';

function TaskForm() {
    const [taskName, setTaskName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await supabase.auth.getUser();
            console.log(user);
            const result = await supabase.from('task').insert({
                name: taskName,
                userid: user.data.user.id,
            })
            console.log(result)
        } catch (error) {
            console.error(error);
        }
        
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="taskName" 
                    placeholder="Write a task name"
                    onChange={(e) => setTaskName(e.target.value)} />
                <button>Add</button>
            </form>
        </div>
    )
}

export default TaskForm