'use client';
import Container from './Container';
import React, { useRef, useEffect, useState } from 'react';
import { Popover, OverlayTrigger, Button, Spinner } from 'react-bootstrap';
import Link from 'next/link';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/Navbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faBell, faBars } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import '../ChatBot/chatbot.css';
import MessageParser from '../ChatBot/MessageParser';
import ActionProvider from '../ChatBot/ActionProvider';
import 'react-chatbot-kit/build/main.css';
import Chatbot from 'react-chatbot-kit';
import config from '../ChatBot/config';

// import { Chatbot } from '../ChatBot/Chatbot';
export default function NavbarCommon({ current, signout, user, bot }) {
  const hamburger = useRef('');
  const router = useRouter();
  const [showChatbot, setshowChatbot] = useState(false);
  const [loggingout, setloggingout] = useState(true);

  const signoutHandler = () => {};

  const popover = (
    <Popover id="popover-basic">
      <div>
        <Button variant="danger m-2" onClick={signoutHandler}>
          Logout
        </Button>
      </div>
    </Popover>
  );

  const pages = [
    { name: 'Dashboard', e: 'dash', link: '/dashboard' },
    { name: 'Blogs', e: 'blogs', link: '/blogs' },
    { name: 'Videos', e: 'vids', link: '/videos' },
    { name: 'Appointments', e: 'apps', link: '/appointments' },
    { name: 'Reflect', e: 'reflect', link: '/reflect' },
  ];

  return (
    <>
      {bot && (
        <Container
          handleSubmit={() => setshowChatbot(!showChatbot)}
          styles={
            'fixed bottom-10 right-10 h-16 w-16 rounded-full m-0 p-0 flex justify-center '
          }
        >
          <FontAwesomeIcon icon={faRobot} size={'2x'} styles={'m-0'} />
        </Container>
      )}
      {showChatbot && (
        <div className="fixed bottom-[200px] right-[10px] h-96 w-96 rounded-lg m-0 p-0">
          <Chatbot
            config={config}
            actionProvider={ActionProvider}
            messageParser={MessageParser}
          />
        </div>
      )}
      <div className={styles.navbar}>
        <div className="d-flex justify-content-between align-items-center">
          <div className={styles.hamburger}>
            <FontAwesomeIcon
              icon={faBars}
              onClick={() => {
                hamburger.current.style.display =
                  hamburger.current.style.display == 'none' ? 'flex' : 'none';
              }}
            />
          </div>
          <Link href="/" className="cursor-pointer">
            <div className={styles.brand}>Fortitude</div>
          </Link>
          <li className="lg:flex align-items-center" id="pages-list">
            {pages.map((ele, i) => {
              return (
                <ul key={i} className={current == ele.e ? 'font-bold' : ''}>
                  <Link href={ele.link}>{ele.name}</Link>
                </ul>
              );
            })}
          </li>
          <div className="flex justify-content-between gap-4 sm:gap-2 align-items-center">
            {user ? (
              <>
                <FontAwesomeIcon icon={faGear} />
                <FontAwesomeIcon icon={faBell} />
                <OverlayTrigger
                  trigger="focus"
                  placement="bottom"
                  overlay={popover}
                >
                  <button>
                    <img
                      src={`https://avatars.dicebear.com/api/avataaars/human/${
                        user?.name || ''
                      }.png?mood[]=happy`}
                      width="45px"
                      height="45px"
                      className="rounded-full border-2"
                    ></img>
                  </button>
                </OverlayTrigger>
              </>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className={styles.smallnav} ref={hamburger}>
          {pages.map((ele) => {
            return (
              <div
                className={current == ele.e ? 'font-bold' : 'hover:font-bold'}
              >
                <Link href={ele.link}>{ele.name}</Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
