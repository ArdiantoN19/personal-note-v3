import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import { login } from '../utils/api';
import LocaleContext from '../contexts/LocaleContexts';

function LoginPage({loginSuccess}) {
    const { locale } = useContext(LocaleContext);

    async function onLoginHandler({email, password}) {
        const { error, data} = await login({email, password});
        if(!error) {
            loginSuccess(data);
        }
    }

    return (
        <section>
            <h2>Form Login</h2>
            <p>{locale === 'id' ? 'Login untuk gunakan aplikasi' : 'Login for use this app'}</p>
            <LoginInput login={onLoginHandler}/>
            {
                locale === 'id' ? 
                <p>Belum punya akun? <Link to='/register'>Register</Link></p> :
                <p>Haven't account? <Link to='/register'>Register</Link></p>
            }
        </section>
    )
}

LoginPage.propTypes = {
    loginSuccess: PropTypes.func.isRequired,
}

export default LoginPage;