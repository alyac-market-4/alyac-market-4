import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import { Button } from '@/shared/ui/button.tsx';

import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Button variant="outline" size="lg">
      Hello World
    </Button>
  </StrictMode>,
);
