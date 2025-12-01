import { ErrorBoundary } from '@/components/ErrorBoundary';
import { StrictMode, type FC } from 'react';
import { PrimeReactProvider } from 'primereact/api';
import { UserProvider } from '@/context/UserProvider';

import App from '@/components/App';

const ErrorBoundaryError: FC<{ error: unknown }> = ({ error }) => (
  <div>
    <p>Произошла необработанная ошибка:</p>
    <blockquote>
      <code>
        {error instanceof Error
          ? error.message
          : typeof error === 'string'
            ? error
            : JSON.stringify(error)}
      </code>
    </blockquote>
  </div>
);

interface InnerProps {
  Component: FC;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageProps: any;
}

const Inner: FC<InnerProps> = ({ Component, pageProps }) => {
  console.log('Запуск приложения');
  
  return (
    <StrictMode>
      <PrimeReactProvider>
        <UserProvider>
          <Component {...pageProps}/>
        </UserProvider>
      </PrimeReactProvider>
    </StrictMode>
  );
};

export default function Root() {
  return (
    <ErrorBoundary fallback={<ErrorBoundaryError error={undefined} />}>
      <Inner
        Component={App}
        pageProps={{title: 'Клиент Т-Инвестициии'}}
      />
    </ErrorBoundary>
  );
}