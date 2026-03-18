import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { AppContextProvider } from './contexts/TimeContext/TimeContext';

import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';

import 'dayjs/locale/ru';
import dayjs from 'dayjs';

dayjs.locale('ru');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppContextProvider>
      <ConfigProvider locale={ruRU}>
        <App />
      </ConfigProvider>
    </AppContextProvider>
  </StrictMode>,
);
