import React from 'react';
import { Card, AlgoButton, Pipeline, Input, Radio, SwitchNet, AlgoSendButton, ToastMessage } from 'pipeline-ui';
import { Algo } from '@pipeline-ui/icons';
import styles from './styles.module.scss';

export default class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      balance: '',
      message: '',
      address: '',
      trxId: '',
      amount: '1',
    };
  }

  myAlgoWallet = Pipeline.init();

  timer = setInterval(() => {
    if (this.state.address) {
      Pipeline.balance(this.state.address).then((balance) => {
        this.setState((s) => ({ ...s, balance }));
      });
    }
  }, 10000);

  changeAmount(e) {
    e.persist();
    if (e.target.value >= 0) {
      this.setState((s) => ({ ...s, customAmount: '', amount: e.target.value }));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState?.address && prevState?.address !== this.state.address) {
      Pipeline.balance(this.state.address).then((balance) => {
        this.setState((s) => ({ ...s, balance }));
      });
    }
  }

  render() {
    const recipient = process.env.REACT_APP_RECIPIENT_ADDRESS;
    return (
      <>
        <ToastMessage.Provider ref={(node) => (window.toastProvider = node)} />
        <Card className={styles.card} bg={'grey'} maxWidth={'420px'} mx={'auto'}>
          {this.state.address && (
            <>
              <h3>
                <b>Current address:</b> My Address
              </h3>
              <h3
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <b>Balance:&nbsp;</b> 2 Algos <Algo style={{ marginLeft: '3px' }} color="black" size="15" />
              </h3>
              <div className={styles.donate}>
                <h3 className={styles.heading}>
                  Select amount
                  <Radio
                    label="1 ALGO"
                    value={'1'}
                    checked={this.state.amount === '1'}
                    onChange={this.changeAmount}
                    required={true}
                  />
                  <Radio label="5 ALGO" value={'5'} checked={this.state.amount === '5'} onChange={this.changeAmount} />
                  <Radio
                    label="10 ALGO"
                    value={'10'}
                    checked={this.state.amount === '10'}
                    onChange={this.changeAmount}
                  />
                  <Radio
                    label="20 ALGO"
                    value={'20'}
                    checked={this.state.amount === '20'}
                    onChange={this.changeAmount}
                  />
                  <Radio
                    label="50 ALGO"
                    value={'50'}
                    checked={this.state.amount === '50'}
                    onChange={this.changeAmount}
                  />
                  <Input
                    type="number"
                    required={true}
                    placeholder="Other amount"
                    value={this.state.customAmount}
                    onChange={(e) => {
                      e.persist();
                      if (e.target.value >= 0) {
                        this.setState((s) => ({ ...s, amount: 0, customAmount: e.target.value }));
                      }
                    }}
                    marginTop="10px"
                  />
                </h3>
                <h3 className={styles.heading}>
                  Message <i>(optional)</i>
                  <Input
                    type="text"
                    required={false}
                    onChange={(e) => {
                      e.persist();
                      this.setState((s) => ({ ...s, message: e.target.value }));
                    }}
                    value={this.state.message}
                    width={'100%'}
                  />
                </h3>
                <h3>
                  <b>Recipient:</b> Donation Address
                </h3>
                <div className={styles.send}>
                  <AlgoSendButton
                    recipient={recipient}
                    amount={parseInt(this.state.amount || this.state.customAmount) * 1000000}
                    note={this.state.message || ''}
                    context={this}
                    wallet={this.myAlgoWallet}
                    onChange={(trxId) => {
                      this.setState((s) => ({ ...s, trxId }));
                      window.toastProvider.addMessage('Thanks for donating!', {
                        secondaryMessage: 'Check here to view progress',
                        actionHref:
                          (Pipeline.main ? 'https://algoexplorer.io/tx/' : 'https://testnet.algoexplorer.io/tx/') +
                          trxId,
                        actionText: 'Check',
                        closeElem: true,
                        variant: 'processing',
                      });
                    }}
                  />
                </div>
              </div>
            </>
          )}
          {!this.state.address && (
            <div className={styles.button}>
              <div>
                <AlgoButton wallet={this.myAlgoWallet} context={this} returnTo={'address'} />
                <SwitchNet />
              </div>
            </div>
          )}
        </Card>
      </>
    );
  }
}
