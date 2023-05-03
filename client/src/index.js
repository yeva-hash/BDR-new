import { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import DeviceStore from './store/DeviceStore';
import UserStore from './store/UserStore';
import SocketClient from './http/socket';

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
      user: new UserStore(),
      device: new DeviceStore(),
      SocketClient: SocketClient
    }}>
      <App />
    </Context.Provider>,
);


