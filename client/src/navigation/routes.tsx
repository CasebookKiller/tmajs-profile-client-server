import type { ComponentType, JSX } from 'react';

import { HomePage } from '@/pages/HomePage/HomePage';
import { TestsPage } from '@/pages/TestsPage/TestsPage';
import { TheoryPage } from '@/pages/TheoryPage/TheoryPage';

export interface Route {
  path: string;
  Component?: ComponentType | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  element?: any | null;
  title?: string;
  icon?: JSX.Element;
}

// Страницы
const home: Route = { path: '/', Component: HomePage, title: 'Главная' };
const tests: Route = { path: '/tests', Component: TestsPage, title: 'Тесты' };
const theory: Route = { path: '/theory', Component: TheoryPage, title: 'Теория' };

export const routes: Route[] = [];

// Добавление страниц
routes.push(home);
routes.push(tests);
routes.push(theory);
