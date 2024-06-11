import React, { useMemo, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChainId } from '@pancakeswap/sdk'
import { useWeb3React } from '@pancakeswap/wagmi'
import reportWebVitals from './reportWebVitals';

export function Blocklist({ children }: { children: ReactNode }) {
  // const { account } = useWeb3React()
  // // const blocked: boolean = useMemo(() => Boolean(account && BLOCKED_ADDRESSES.indexOf(account) !== -1), [account])
  // const blocked: boolean = useMemo(() => Boolean(account), [account])
  const Acodd = ChainId;
  // if (blocked) {
  //   return <div>Blocked address</div>
  // }
  return <>{children}</>
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
