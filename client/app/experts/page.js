import Wrapper from '../components/global/Wrapper';
import React from 'react';
import Container from '../components/global/Container';
import Image from 'next/image';
function ExpertCard() {
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
