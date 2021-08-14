import { createContext } from 'react';
import { connectionStates } from './connectionStates';

const { ONBOARD_PENDING } = connectionStates;

const MetaMaskContext = createContext({
  accounts: [],
  connectionState: ONBOARD_PENDING,
  onboard: () => {},
  connect: () => {},
});

export default MetaMaskContext;
