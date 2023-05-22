import React from 'react';
import ReactDOM from 'react-dom';
import InfiniteScrollPage from './components/InfiniteScrollPage/InfiniteScrollPage';
import { StoreProvider } from './stores/imageStore';

import './main.css'

ReactDOM.render(
  <StoreProvider>
    <InfiniteScrollPage />
  </StoreProvider>,
  document.getElementById('root')
);
