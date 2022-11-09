import React, { useState, useEffect, useMemo} from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import ArchivedPage from './pages/ArchivedPage';
import DetailPage from './pages/DetailPage';
import AddPageWrapper from './pages/AddPage';
import PageNotFound from './pages/404Pages';
import { getUserLogged, putAccessToken } from './utils/api';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LocaleContext from './contexts/LocaleContexts';
import TranslateButton from './components/TranslateButton';
import ThemeButton from './components/ThemeButton';

function App() {
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [locale, setLocale] = useState(localStorage.getItem('bahasa') || 'id');
  const [theme, setTheme] = useState(localStorage.getItem('tema') || 'dark');

  useEffect(() => {
    async function fetchUserLogged() {
      const { data } = await getUserLogged();
      setAuthedUser(data);
      setInitializing(false);
    };
    fetchUserLogged();
  },[])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  },[theme])

  function toggleLocale () {
    setLocale((prevLocale) => {
      const set = prevLocale === 'id' ? 'en' : 'id';
      localStorage.setItem('bahasa', set);
      return set;
    })
  }

  function toggleTheme() {
    setTheme((prevTheme) => {
      const set = prevTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('tema', set);
      return set;
    })
  }

  const contextValue = useMemo(() => {
    return {
      locale,
      toggleLocale,
      theme,
      toggleTheme
    };
  }, [locale,theme]);

  async function onLoginSuccess({accessToken}) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  }

  function onLogoutHandler() {
    const choice = window.confirm('Yakin ingin keluar aplikasi? ');
    if(choice) {
      setAuthedUser(null)
      putAccessToken('')
    }
    return null;
  }

  if(initializing === true) {
    return null;
  }

  if(authedUser === null) {
    return (
      <LocaleContext.Provider value={contextValue}>
        <div className="app-container">
          <header>
            <Navigation authedUser={authedUser}/>
            <div className='button-action'>
              <TranslateButton/>
              <ThemeButton/>
            </div>
          </header>
          <main>
            <Routes>
              <Route path='/*' element={<LoginPage loginSuccess={onLoginSuccess}/>}/>
              <Route path='/register' element={<RegisterPage/>}/>
            </Routes>
          </main>
      </div>
      </LocaleContext.Provider>
    )
  }

  return (
    <LocaleContext.Provider value={contextValue}>
      <div className="app-container">
        <header>
          <h1>{locale === 'id' ? 'Aplikasi Catatan' : 'Notes App'}</h1>
          <Navigation logout={onLogoutHandler} name={authedUser.name}/>
        </header>
        <main>
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/archives' element={<ArchivedPage/>}/>
            <Route path='/notes/:id' element={<DetailPage/>}/>
            <Route path='/notes/new' element={<AddPageWrapper/>}/>
            <Route path='*' element={<PageNotFound/>}/>
          </Routes>
        </main>
      </div>
    </LocaleContext.Provider>
  );
}

export default App;
