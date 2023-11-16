'use client';
import Wrapper from '../components/global/Wrapper';
import React, { useEffect } from 'react';
import Container from '../components/global/Container';
import Image from 'next/image';
import axios from 'axios';
function ExpertCard() {
  useEffect(() => {
    console.log(window.ethereum);
    if (window.ethereum) {
      // window.ethereum
      //   .request({
      //     method: 'wallet_requestPermissions',
      //     params: [{ eth_accounts: {} }],
      //   })
      //   .then((e) => console.log(e));
      // const res = window.ethereum
      //   .request({
      //     method: 'eth_sendTransaction',
      //     params: [
      //       {
      //         to: '0x84D6738828CbC1abcD2844BdC80A754BBa059c93',
      //         from: '0xCBF7fF7B93f77ee6B1431B3BF4aE924B5FAc751B',
      //         gas: Number(21000).toString(16),
      //         gasPrice: Number(2500000).toString(16),
      //         value: Number(100000000000).toString(16),
      //       },
      //     ],
      //   })
      //   .then((e) => console.log(e))
      //   .catch((err) => console.log(err));
    }
  }, []);
  return (
    <div className="flex flex-col p-3 gap-3 bg-white shadow-sm border-1 rounded-lg ">
      <div className="flex justify-center rounded-full ">
        <img
          className="rounded-full"
          src="https://picsum.photos/300/300/"
          width={160}
          height={160}
          alt="Picture of the author"
        />
      </div>
      <div className="font-semibold text-md text-center">
        Domain{' '}
        <div className="font-normal text-sm">
          Mental Well-Being, Teen Health
        </div>
      </div>
      <div className="font-semibold text-md text-center">
        Experience <div className="font-normal text-sm">21 years</div>
      </div>
    </div>
  );
}

export default function page() {
  useEffect(() => {
    axios
      .post('http://localhost:5000/predict', {
        input: 'nice day is not it',
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Wrapper>
        <div className="m-2 p-2 ">
          <div className="text-xl font-semibold">Recommended for you</div>
          <div className="grid grid-cols-5 p-2 gap-5">
            <ExpertCard />
            <ExpertCard />
          </div>
          <div className="mt-4 text-xl font-semibold">High Rated</div>
          <div className="grid grid-cols-5 p-2 gap-5">
            <ExpertCard />
            <ExpertCard />
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
