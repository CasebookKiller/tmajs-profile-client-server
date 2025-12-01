// https://dev.to/dayvster/use-react-context-for-auth-288g
// https://react-hook-form.com/get-started

import React from 'react';

import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import './App.css'

import { routes } from '@/navigation/routes';

function App() {
  return (
    <React.Fragment>
      <HashRouter>
        <Routes>
          {routes.map((route) => {
            console.log('Route: ', route);
            return (<Route key={route.path} {...route} />);
          })}
          <Route path='*' element={<Navigate to={'/'}/>}/>
        </Routes>
      </HashRouter>
    </React.Fragment>
  )
}

export default App
