import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LocaleContext from '../contexts/LocaleContexts';
import { FiLogOut } from 'react-icons/fi';
import TranslateButton from './TranslateButton';
import ThemeButton from './ThemeButton';

function Navigation({authedUser, logout, name}) {
    const { locale } = useContext(LocaleContext);

    if(authedUser === null) {
        return (
            <nav className="navigation">
                <ul>
                    <li>
                        <Link to="/">{ locale === 'id' ? 'Aplikasi Catatan' : 'Notes App'}</Link>
                    </li>
                </ul>
            </nav>
        )
    }

    return (
        <nav className="navigation">
            <ul>
                <li>
                    <Link to="/">{locale === 'id' ? 'Catatan Aktif' : 'Active Notes'}</Link>
                </li>
                <li>
                    <Link to="/archives">{locale === 'id' ? 'Arsip' : 'Archive'}</Link>
                </li>
                <li>
                    <TranslateButton/>
                </li>
                <li>
                    <ThemeButton/>
                </li>
                <li>
                    <button className='button-logout' onClick={logout} title="Logout"><FiLogOut/> {name}</button>
                </li>
            </ul>
        </nav>
    );
}

Navigation.propTypes = {
    authedUser: PropTypes.object,
    logout: PropTypes.func,
    name: PropTypes.string,
}

export default Navigation;