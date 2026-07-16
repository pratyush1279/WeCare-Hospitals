// Safe defensive polyfill for MessageChannel in iframe contexts where native MessageChannel throws "Illegal constructor"
try {
  new window.MessageChannel();
} catch (e) {
  console.warn("Native MessageChannel throws 'Illegal constructor'. Polyfilling MessageChannel.");
  class MessagePortPolyfill {
    public onmessage: ((ev: any) => any) | null = null;
    public otherPort: MessagePortPolyfill | null = null;
    public postMessage(data: any) {
      if (this.otherPort && this.otherPort.onmessage) {
        setTimeout(() => {
          if (this.otherPort && this.otherPort.onmessage) {
            this.otherPort.onmessage({ data });
          }
        }, 0);
      }
    }
    public start() {}
    public close() {}
  }
  (window as any).MessageChannel = class {
    public port1: MessagePortPolyfill;
    public port2: MessagePortPolyfill;
    constructor() {
      const p1 = new MessagePortPolyfill();
      const p2 = new MessagePortPolyfill();
      p1.otherPort = p2;
      p2.otherPort = p1;
      this.port1 = p1;
      this.port2 = p2;
    }
  };
}

window.addEventListener('error', (event) => {
  console.error('GLOBAL ERROR DETECTED:', event.error);
  if (event.error && event.error.stack) {
    console.error('GLOBAL ERROR STACK:', event.error.stack);
  }
});
window.addEventListener('unhandledrejection', (event) => {
  console.error('UNHANDLED REJECTION DETECTED:', event.reason);
  if (event.reason && event.reason.stack) {
    console.error('UNHANDLED REJECTION STACK:', event.reason.stack);
  }
});

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './components/AuthContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);

