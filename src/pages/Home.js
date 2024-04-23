import React from 'react';
import { useEffect } from 'react';
import { supabase } from '../supabase/client';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import { useTask } from '../context/TaskContext';
import TaskList from '../components/TaskList';

function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        const { data, error } = supabase.auth.getSession()
        if (!data) {
            navigate('/login');
        }
    }, [navigate])

    return (
        <div>
            <h1>Home</h1>
            <button onClick={() => supabase.auth.signOut()}>
                Logout
            </button>
            <TaskForm />
            <TaskList />
        </div>
    )
}

export default Home;