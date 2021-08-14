import logo from './logo.svg';
import './App.css';
import MetaMaskContextProvider from './MetaMaskContextProvider';
import LoginButton from './LoginButton';

function App() {
  return (
    <div className="App">
      <MetaMaskContextProvider>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <LoginButton />
        </header>
      </MetaMaskContextProvider>
    </div>
  );
}

export default App;
