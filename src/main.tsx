//! index.scss must be imported before CoreProvider because of CSS Variables
import './index.scss';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
    <StrictMode>
            <App />
    </StrictMode>
);
