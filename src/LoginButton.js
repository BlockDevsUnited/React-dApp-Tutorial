import React, { useContext } from 'react';
import MetaMaskContext from './MetaMaskContext';
import { connectionStates } from './connectionStates';

const { ONBOARD_PENDING, CONNECTION_PENDING, CONNECTED, CONNECTING, REJECTED } =
  connectionStates;

const buttonLabel = {
  [ONBOARD_PENDING]: 'Install MetaMask',
  [CONNECTION_PENDING]: 'Connect',
  [CONNECTED]: 'Connected',
  [CONNECTING]: 'Connecting',
  [REJECTED]: 'Retry',
};

const LoginButton = () => {
  const { connectionState, onboard, connect } = useContext(MetaMaskContext);
  const label = buttonLabel[connectionState];
  const isDisabled =
    connectionState === CONNECTED || connectionState === CONNECTING;
  const onClick = () => {
    if (connectionState === ONBOARD_PENDING) {
      onboard();
    } else if (
      connectionState === CONNECTION_PENDING ||
      connectionState === REJECTED
    ) {
      connect();
    }
  };
  return (
    <button onClick={onClick} disabled={isDisabled}>
      {label}
    </button>
  );
};

export default LoginButton;
