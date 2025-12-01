import { createRoot } from 'react-dom/client'

import 'primereact/resources/themes/lara-dark-cyan/theme.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import './index.css'

import Root from '@/components/Root.tsx';

createRoot(document.getElementById('root')!).render(<Root/>);