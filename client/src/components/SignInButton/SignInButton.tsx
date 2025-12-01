import React, { type FC } from 'react';

import { Button } from 'primereact/button';

import { useAuth } from '@/hooks/useAuth';

import SignIn from '@/components/SignIn/SignIn';

const SignInButton: FC = () => {
  const { user, setLoginVisible } = useAuth();
  return (
    <React.Fragment>
      {!user?.name && <div className='card flex justify-content-center'>
        <Button label='Войти' icon='pi pi-user' onClick={() => setLoginVisible(true)} />
        <SignIn/>
      </div>}  
    </React.Fragment>
  );
}

export default SignInButton;