import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });
            const data = await response.json();
            if (response.ok) {
                navigate('/login');
            } else {
                alert(data.error || 'Registration failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        // Component JSX form layout
        <div>Register Form</div>
    );
}

export default RegisterPage;
