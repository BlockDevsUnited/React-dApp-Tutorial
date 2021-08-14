import React, { useState, useEffect, useRef } from 'react';
import MetaMaskContext from './MetaMaskContext';
import MetaMaskOnboarding from '@metamask/onboarding';
import { connectionStates } from './connectionStates';
import { ethers } from 'ethers';

const { ONBOARD_PENDING, CONNECTION_PENDING, REJECTED, CONNECTING, CONNECTED } =
  connectionStates;

const MetaMaskContextProvider = (props) => {
  const [provider, setProvider] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [connectionState, setConnectionState] = useState(ONBOARD_PENDING);
  const onboarding = useRef();
  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    setProvider(provider);
  }, []);
  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        setConnectionState(CONNECTED);
        onboarding.current.stopOnboarding();
      } else {
        setConnectionState(CONNECTION_PENDING);
      }
    }
  }, [accounts]);
  useEffect(() => {
    const handleNewAccounts = (newAccounts) => {
      setAccounts(newAccounts);
    };
    const addChangeHandler = () => {
      window.ethereum.addListener('accountsChanged', handleNewAccounts);
    };
    const removeChangeHandler = () => {
      window.ethereum.removeListener('accountsChanged', handleNewAccounts);
    };
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      addChangeHandler();
      return removeChangeHandler;
    }
  }, []);
  const onboard = () => {
    onboarding.current.startOnboarding();
  };
  const connect = async () => {
    setConnectionState(CONNECTING);
    let newAccounts = [];
    try {
      newAccounts = await provider.send('eth_requestAccounts', []);
    } catch (error) {
      if (error.code === 4001) {
        setConnectionState(REJECTED);
        return;
      }
    }
    setProvider(provider);
    setAccounts(newAccounts);
  };
  useEffect(() => {
    const autoConnect = async () => {
      let connectedAccounts = [];
      try {
        connectedAccounts = await provider.listAccounts();
        setAccounts(connectedAccounts);
      } catch (error) {}
    };
    if (connectionState === CONNECTION_PENDING) {
      autoConnect();
    }
  }, [provider, connectionState]);
  return (
    <MetaMaskContext.Provider
      value={{
        accounts,
        connectionState,
        onboard,
        connect,
        provider,
      }}
    >
      {props.children}
    </MetaMaskContext.Provider>
  );
};

export default MetaMaskContextProvider;
