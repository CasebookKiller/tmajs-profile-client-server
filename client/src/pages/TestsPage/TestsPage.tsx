import AppTopbar from '@/components/AppTopbar/AppTopbar';
import SignInButton from '@/components/SignInButton/SignInButton';
import WelcomeDialog from '@/components/WelcomeDialog/WelcomeDialog';
import { useAuth } from '@/hooks/useAuth';

import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';

import Chart from '@/components/Chart/Chart';

import React, { useEffect, useState, type FC } from 'react';

const HOST = import.meta.env.VITE_HOST;
const PORT = import.meta.env.VITE_PORT;

const data = [
  {
    category: "Research",
    value1: 1000,
    value2: 588
  },
  {
    category: "Marketing",
    value1: 1200,
    value2: 1800
  },
  {
    category: "Sales",
    value1: 850,
    value2: 1230
  }
];

function fetchWithToken(url: string, token: string): Promise<Response> {  
  const headers: HeadersInit = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
  return fetch(url, { headers });  
}

function fetchInstrument(url: string, query: string, token: string): Promise<Response> {  
  const headers: HeadersInit = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
  const body = { query: query };

  return fetch(url, { method: 'POST', headers, body: JSON.stringify(body)});  
}

export const TestsPage: FC = () => {
  const { user, logout } = useAuth();
  const [accounts, setAccounts] = useState<unknown[]>([]);

  useEffect(() => {
    console.log('accounts: ', accounts);
  },[accounts]);

  return (
    <React.Fragment>
      <AppTopbar/>
      <div className='App-Login'>
        <WelcomeDialog />
        <SignInButton />
      </div>
      <h1>Тесты</h1>
      {
        user?.name &&  
        <React.Fragment>
          <Panel
            header='Приложение'
          >
            <h3>{ user?.name }</h3>
            
            <div className='flex gap-3'>
              <Button label='Тест прайвета' onClick={async () => {
                try {
                  // запрос API
                  if (!user?.token) return;
                  fetchWithToken(`http://${HOST}:${PORT}/private`, user?.token)
                    .then(res => {return res.json();})
                    .then(res => console.log(res));
                } catch (error) {
                  console.log(error);
                }
              }}/>
              <Button label='Тест профиля' onClick={async () => {
                try {
                  // запрос API
                  if (!user?.token) return;
                  fetchWithToken(`http://${HOST}:${PORT}/accounts`, user?.token)
                    .then(res => {return res.json();})
                    .then(res => {
                      //console.log(res);
                      setAccounts(res.result);
                    });
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                } catch (error) {
                  //console.log(error); //if (error instanceof Error) console.error('Ошибка авторизации: ',error.message);
                }
              }}/>
              <Button label='Тест токена' onClick={async () => {
                try {
                  console.log(user?.token);
                  // запрос API
                  if (!user?.token) return;
                  fetchWithToken(`http://${HOST}:${PORT}/about`, user?.token)
                    .then(res => {return res.json();})
                    .then(res => console.log(res));

                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                } catch (error) {
                  //console.log(error); //if (error instanceof Error) console.error('Ошибка авторизации: ',error.message);
                }
              }} />
              <Button label='Запрос инструмента' onClick={async () => {
                if (!user?.token) return;
                fetchInstrument(`http://${HOST}:${PORT}/instrument`, 'SBER', user?.token)
                  .then(res => {
                    return res.json();
                  }).then(res => console.log(res));;
              }} />
              <Button label='Выйти' onClick={logout} />
            </div>
          </Panel>
          <Panel
            header='График'>
            <Chart paddingRight={20} data={data}/>
          </Panel>
        </React.Fragment>
      }
    </React.Fragment  >
  );
} 
