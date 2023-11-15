import React, { useState, useEffect } from 'react';
import getWeb3 from '@/app/blockchain/logic/getWeb3';
const contractAddress = '0xeD70dE3C54Fe1D044CE0165447084d702c38A029';
import contract from '../../blockchain/build/contracts/HealthRecord.json';

export default function useWeb3() {
  const [Web3, setWeb3] = useState({});
  const [Accts, setAccts] = useState([]);
  const [load, setload] = useState(false);
  useEffect(() => {
    getWeb3().then(async (w) => {
      const contractObj = await new w.eth.Contract(
        contract.abi,
        contractAddress
      );
      contractObj.handleRevert = true;
      setWeb3(contractObj);
      setAccts(await w.eth.getAccounts());
      setload(true);
    });
    return () => {};
  }, []);
  return [Web3, Accts, load];
}
