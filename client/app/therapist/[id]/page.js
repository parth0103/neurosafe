'use client';
import React, { useState, useEffect } from 'react';
import { GlobalWrapper } from '@/app/GlobalWrapper';
import Wrapper from '@/app/components/global/Wrapper';
import axios from 'axios';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import getWeb3 from '@/app/blockchain/logic/getWeb3';
import useWeb3 from '@/app/components/hooks/useWeb3';
export default function page({ params }) {
  const [tid, setid] = useState('');
  const [data, setdata] = useState({});
  const [access, setaccess] = useState(false);

  const [web3, accts, load] = useWeb3();
  //   const { id } = params;
  useEffect(() => {
    setid(params.id);
    axios
      .get('http://localhost:8000/api/users/' + params.id)
      .then((e) => setdata(e.data));
    console.log(localStorage.getItem('uid'));
  }, []);

  useEffect(() => {
    console.log(accts);
    if (load == true) {
      checkAccess();
    }
  }, [load, access]);

  const checkAccess = async () => {
    const uid = localStorage.getItem('uid');
    try {
      const result = await web3.methods
        .checkAccess('0x' + uid, '0x' + tid)
        .call({ from: accts[0] });
      console.log(result);
      setaccess(result);
    } catch (err) {
      console.log(err.innerError.message);
    }
  };

  const changeAccess = async (type) => {
    const uid = localStorage.getItem('uid');
    if (type) {
      const res = await web3.methods
        .grantRecordAccess('0x' + uid, '0x' + tid)
        .send({ from: accts[0], gas: 1000000 });
      checkAccess();
      return;
    }
    const result = await web3.methods
      .revokeRecordAccess('0x' + uid, '0x' + tid)
      .send({ from: accts[0], gas: 1000000 });
    console.log(result);
    checkAccess();
  };
  if (load == false) {
    return (
      <>
        <Wrapper>
          <div className="text-2xl font-semibold text-center">
            Loading .....
          </div>
        </Wrapper>
      </>
    );
  }
  return (
    <>
      <Wrapper>
        <div div className="flex flex-col gap-7 p-5 ">
          <div className="flex gap-10 items-center">
            <img
              src={data.profilePic}
              alt=""
              className="w-52 h-52 rounded-full"
            />
            <div className="flex flex-col gap-5 items-start">
              <h3 className="font-semibold text-2xl">{data.name}</h3>
              <div className="text-md">Email: {data.email}</div>
              <div className="text-md">
                Joined: {moment(data.createdAt).format('Do MMMM YY')}
              </div>
            </div>
          </div>
          <hr className="h-[2px] bg-[#ff7a00] w-1/3 border-0" />
          <div>
            <div className="mb-3 font-semibold text-xl">Bio</div>
            <div className="px-2">{data.bio}</div>
          </div>
          {access == false ? (
            <div className="">
              <Button
                onClick={() => changeAccess(true)}
                variant={'outline-success'}
              >
                Grant Record Access
              </Button>
            </div>
          ) : (
            <div className="">
              <Button
                onClick={() => changeAccess(false)}
                variant={'outline-danger'}
              >
                Revoke Record Access
              </Button>
            </div>
          )}
        </div>
      </Wrapper>
    </>
  );
}
