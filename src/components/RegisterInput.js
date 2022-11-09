import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function RegisterInput({register}) {
    const [name, onNameChange] = useInput('');
    const [email, onEmailChange] = useInput('');
    const [password, onPasswordChange] = useInput('');
    const [confirmPassword, onConfirmPasswordChange] = useInput('');

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            alert('Password Anda tidak cocok')
        }
       register({name, email, password});
    }

    return (
        <form className='input-register' onSubmit={onSubmitHandler}>
            <label htmlFor='name'>Name</label>
            <input type="text" id='name' value={name} onChange={onNameChange}/>
            <label htmlFor='email'>Email</label>
            <input type="email" id='email' value={email} onChange={onEmailChange}/>
            <label htmlFor='password'>Password</label>
            <input type="password" id='password' value={password} onChange={onPasswordChange}/>
            <label htmlFor='confirmpassword'>Confirm Password</label>
            <input type="password" id='confirmpassword' value={confirmPassword} onChange={onConfirmPasswordChange}/>
            <button type="submit">Register</button>
        </form>
    )
}

RegisterInput.propTypes = {
    register: PropTypes.func.isRequired,
}

export default RegisterInput;