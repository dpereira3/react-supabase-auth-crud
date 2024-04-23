import { createContext, useContext, useState } from "react";
import { supabase } from "../supabase/client";

export const TaskContext = createContext()

export const useTasks = () => {
    const context = useContext(TaskContext);
    if(!context) 
        throw new Error('useTask must be used within a TaskContextProvider');
    return context;
};

export const TaskContextProvider = ({children}) => {
    
    const [tasks, setTasks] = useState([]);

    const getTasks = async (done = false) => {
        const user = await supabase.auth.getUser();
        const {error, data} = await supabase
            .from("task")
            .select()
            .eq("userid", user.data.user.id)
            .eq("done", done)
            .order("id", { ascending: true });

        if (error) throw error;
        setTasks(data);
    }

    return <TaskContext.Provider value={{tasks, getTasks}}>
            {children}
        </TaskContext.Provider>
}