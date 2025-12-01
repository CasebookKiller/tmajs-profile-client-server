import React, { type FC } from 'react';

import AppTopbar from '@/components/AppTopbar/AppTopbar';
import SignInButton from '@/components/SignInButton/SignInButton';
import WelcomeDialog from '@/components/WelcomeDialog/WelcomeDialog';

export const HomePage: FC = () => {

  return (
    <React.Fragment>
      <AppTopbar/>
      <div className='App-Login'>
        <WelcomeDialog />
        <SignInButton />
      </div>
      <h1>Главная страница</h1>
    </React.Fragment  >
  );
} 
