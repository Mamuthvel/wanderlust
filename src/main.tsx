import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(
<>
  <div id="isso-thread" data-title="Isso Test">
    <noscript>Javascript needs to be activated to view comments.</noscript>
    </div>
    <App />
</>
);
