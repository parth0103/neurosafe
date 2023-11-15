'use client';
import React, { useState, useEffect } from 'react';
import Wrapper from '../components/global/Wrapper';
import getWeb3 from '../blockchain/logic/getWeb3';
import { Button } from 'react-bootstrap';
const contractAddress = '0xeD70dE3C54Fe1D044CE0165447084d702c38A029';
import contractAbi from '../blockchain/build/contracts/HealthRecord.json';
export default function () {
  const [inp, setinp] = useState({ a: '', b: '' });
  const [web3, setweb3] = useState(null);
  const [obj, setobj] = useState(null);
  const [accts, setaccts] = useState([]);
  useEffect(() => {
    getWeb3().then(async (e) => {
      setweb3(e);
      setobj(new e.eth.Contract(contractAbi.abi, contractAddress));
      setaccts(await e.eth.getAccounts());
    });
  }, []);

  const addUser = async (type) => {
    const accounts = await web3.eth.getAccounts();
    // console.log(contractObj);
    // console.log(accounts);
    if (type == 't') {
      obj.methods
        .signupTherapist('jai', 'male', 'mental health', '0x' + inp.a)
        .send({ from: accounts[0], gas: 1000000 }, (err, e) => {
          if (err) console.log(err);
          else {
            console.log(e);
          }
        })
        .then((e) => console.log(e));
    } else {
      try {
        const res = await obj.methods
          .signupUser('jai', 'male', '0x' + inp.a)
          .send({ from: accounts[0], gas: 1000000 });
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
    // obj.methods
    //   .getUserData('0x' + inp.a)
    //   .call()
    //   .then((res) => console.log(res));
  };

  const getUserData = async () => {
    const res = await obj.methods
      .getUserData('0x' + inp.a)
      .call({ from: accts[0] });
    console.log(res);
  };

  const getPforT = async () => {
    const res = await obj.methods
      .getPatientsForTherapist('0x' + inp.a)
      .call({ from: accts[0] });
    console.log(res);
  };

  const grantAccess = async () => {
    try {
      const res = await obj.methods
        .grantRecordAccess('0x' + inp.a, '0x' + inp.b)
        .send({ from: accts[0], gas: 1000000 });
      console.log(res);
    } catch (err) {
      console.log(err.innerError.message);
    }
  };

  const getReports = async () => {
    obj.methods
      .getReportsByUser(
        '0x' + '6549e81c2f18b4f07d2d4f81',
        '0x' + '654892861bfbf903785bc796'
      )
      .call({ from: accts[0] })
      .then((res) => console.log(res));
  };

  return (
    <Wrapper>
      <div className="flex gap-10">
        <div className="flex flex-col gap-5 pl-5 w-1/3">
          <Button variant="outline-success" onClick={() => addUser('u')}>
            add user
          </Button>
          <Button variant="outline-success" onClick={() => addUser('t')}>
            add therapist
          </Button>
          <Button variant="outline-success" onClick={grantAccess}>
            grant access
          </Button>
          <Button variant="outline-success">revoke access</Button>
          <Button variant="outline-success" onClick={getUserData}>
            get user data
          </Button>
          <Button variant="outline-success">get t for u</Button>
          <Button variant="outline-success" onClick={getPforT}>
            get u for t
          </Button>
          <Button variant="outline-success" onClick={getReports}>
            get reports
          </Button>
          <Button variant="outline-success">add therapist</Button>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-5">
            <div>
              <input
                type="text"
                className="px-4 py-2"
                value={inp.a}
                onChange={(e) =>
                  setinp((p) => {
                    return { ...p, a: e.target.value };
                  })
                }
              />
            </div>
            <div>
              <input
                type="text"
                className="px-4 py-2"
                value={inp.b}
                onChange={(e) =>
                  setinp((p) => {
                    return { ...p, b: e.target.value };
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
