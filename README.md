[![Netlify Status](https://api.netlify.com/api/v1/badges/3b7a7742-33fe-4ebd-aba5-b9ba262a3299/deploy-status)](https://app.netlify.com/sites/algo-donate/deploys)

# Algorand donation app built with Algorand and Pipeline-UI

Live demo available at https://algo-donate.netlify.app/

This is a demo and should not be used in a production environment.

## Set up and configuration

Clone this repo and run using npm.
To change the receiver address, update the variable in the .env file

```bash
git clone https://github.com/mnguyen96/algo-donation-demo.git
cd algo-donation-demo
npm install
npm run start
```

## Usage

Upon entering the app the user will be given an AlgoButton to connect to their MyAlgo wallet (with SwitchNet component option). Read <a href="https://wallet.myalgo.com/home">here</a> for more information on MyAlgo.
![Alt text](./images/connect.png?raw=true 'Connect button')

After connecting their wallet users will be shown some information about their wallet as well as options for the donation in a Card component.

Using the componentDidUpdate lifecycle event we can automatically fetch the wallet's balance after connecting. We store that `balance` as well as the `address` in state for updating the ui and executing the transaction later. We also have some Radio buttons and Input fields for the `amount` and `message` on the transaction.

Finally, we have the send button that collects all the information we've inputted so far for sending the donation!

![Alt text](./images/donation.png?raw=true 'Donation Dialogue')

Voila! After sending the transaction users will be given a Toast message with a link to the transaction in AlgoExplorer.
![Alt text](./images/confirmation.png?raw=true 'Confirmation of Transaction')

## Architecture

This app is mainly built around Pipeline-UI.
A majority of the code is in the Wallet component (src/wallet/index.jsx) where the logic for connecting the wallet, fetching balances, and transacting the donation is located. Everything is contained within one class component and information during the session is stored in state.
