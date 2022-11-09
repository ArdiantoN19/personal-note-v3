import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { register } from '../utils/api';

function RegisterPage() {
    const navigate = useNavigate();

    async function onRegisterHandler(user) {
        const { error } = await register(user);
        if(!error) {
            navigate('/');
        }
    }

    return (
        <section>
            <h2>Form Register</h2>
            <RegisterInput register={onRegisterHandler}/>
            <p>Sudah punya akun? <Link to='/'>Masuk</Link></p>
        </section>
    )
}

export default RegisterPage;