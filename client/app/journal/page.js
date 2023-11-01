'use client';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useContext } from 'react';
import Journal from '../components/journal/Journal';
// export const ReflectContext = React.createContext();
import Wrapper from '../components/global/Wrapper';
import Feeling from '../components/journal/Feeling';
import Container from '../components/global/Container';
// export async function getServerSideProps({ req, res }) {
//   const user = await getUser(req, res);
//   if (user) {
//     return {
//       props: {
//         user,
//       },
//     };
//   }
//   if (!user) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: '/login',
//       },
//       props: {},
//     };
//   }
// }

export default function Reflect() {
  const router = useRouter();
  const [count, setcount] = useState(0);
  const triggerCount = () => {
    setcount((e) => e + 1);
  };
  const user = {
    uid: 10,
  };

  return (
    <>
      <Wrapper>
        <div className="p-3 px-5">
          <div className="flex justify-content-between gap-5 sm:flex-wrap-reverse md:flex-nowrap">
            <Container styles={' basis-full md:basis-2/5 align-self-start '}>
              <Feeling
                user={user}
                trigger={count}
                triggerCount={triggerCount}
              />
            </Container>
            <Container styles={'basis-full md:basis-3/5'}>
              <Journal
                user={user}
                trigger={count}
                triggerCount={triggerCount}
              />
            </Container>
          </div>
        </div>
      </Wrapper>
    </>
  );
}
