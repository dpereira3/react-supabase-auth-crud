import { useState } from "react";
import { supabase } from '../supabase/client';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(''); // password of the user

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await supabase.auth.signUp({
                email,
                password,
            });
            
        } catch (error) {
            console.error(error);
        }
        
    };

    useEffect(() => {
        const { data, error } = supabase.auth.getSession();
        console.log(data);
        if (data) {
            navigate('/');
            console.log(supabase.auth.getSession())
        }
    }, [navigate]);

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <input 
                type="email" 
                name="email" 
                placeholder="youremail@site.com"
                onChange={(e) => setEmail(e.target.value)} />
                <input
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)} />
                <button>
                    Send
                </button>
            </form>
        </div>
    )
}

export default SignUp