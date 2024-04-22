import { useState } from "react";
import { supabase } from '../supabase/client';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await supabase.auth.signInWithOtp({
                email,
            });
            
        } catch (error) {
            console.error(error);
        }
        
    };

    useEffect(() => {
        if (supabase.auth.getUser()) {
            navigate('/');
            console.log(supabase.auth.getUser(data.user))
        }
    }, [navigate]);

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input 
                type="email" 
                name="email" 
                placeholder="youremail@site.com"
                onChange={(e) => setEmail(e.target.value)} />
                <button>
                    Send
                </button>
            </form>
        </div>
    )
}

export default Login