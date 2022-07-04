import React from 'react';
import { Algo } from '@pipeline-ui/icons';
import './App.scss';
import Wallet from './wallet';

export default function App() {
  return (
    <div className="App">
      <div className="panels">
        <div className="info">
          <div className="description">
            <h1>
              Donate Algorand
              <Algo style={{ marginLeft: '3px' }} color="black" size="50" />
            </h1>
            Connect your wallet to donate Algo to the designated charity.<br />
            If you don't have a wallet you can use Magic to create on instantly with your email.
          </div>
        </div>
        <div className="donation">
          <Wallet />
        </div>
      </div>
    </div>
  );
}
