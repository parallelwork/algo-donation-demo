import React from 'react';
import { Algo } from '@pipeline-ui/icons';
import './App.scss';
import Wallet from './wallet';

export default function App() {
  return (
    <div className="App">
      <div className="panels">
        <div className="info">
          <h1>
            Donate Algorand
            <Algo style={{ marginLeft: '3px' }} color="black" size="50" />
          </h1>
          Welcome to the Algorand example donation app! Please connect your MyAlgo wallet in order to start using the
          app.
        </div>
        <div className="donation">
          <Wallet />
        </div>
      </div>
    </div>
  );
}
