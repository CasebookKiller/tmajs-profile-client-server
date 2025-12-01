import React, { useState, type FC } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';


const WelcomeDialog:FC = () => {
  const { user } = useAuth();
  const [showMessage, setShowMessage] = useState(false);

  const dialogFooter = <div className="justify-content-center">
    <Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} />
  </div>;

  return (
    <React.Fragment>
      { 
        user?.name && <Dialog
          visible={showMessage}
          onHide={() => setShowMessage(false)}
          position='top'
          footer={dialogFooter}
          showHeader={false}
          breakpoints={{ '960px': '80vw' }}
          style={{ width: '30vw' }}
        >
          <div className='flex justify-content-center flex-column pt-6 px-3'>
              <i
                className='pi pi-check-square'
                style={{ fontSize: '5rem', color: 'var(--primary-color)'/*'var(--green-500)'*/ }}
              />
              <h3>Вы вошли в систему!</h3>
              <p style={{ lineHeight: 1.5 /*, textIndent: '1rem' */}}>
              Теперь вы можете пользоваться всеми возможностями приложения.
              </p>
          </div>
        </Dialog>
      }
    </React.Fragment>
  );
}

export default WelcomeDialog;