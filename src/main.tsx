// import { init } from '@telegram-apps/sdk-react';
import { StrictMode } from 'react';
import { isMobile } from 'react-device-detect';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// init();
// backButton.mount();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <App />
    </DndProvider>
  </StrictMode>
);
