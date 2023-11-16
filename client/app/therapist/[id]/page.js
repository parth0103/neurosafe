'use client';
import React, { useState, useEffect } from 'react';
import { GlobalWrapper } from '@/app/GlobalWrapper';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import Wrapper from '@/app/components/global/Wrapper';
import moment from 'moment';
import axios from 'axios';
import { InputGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import getWeb3 from '@/app/blockchain/logic/getWeb3';
import { Form } from 'react-bootstrap';
import useWeb3 from '@/app/components/hooks/useWeb3';
import { DateTimePicker } from '@mui/x-date-pickers';

export default function page({ params }) {
  const [tid, setid] = useState('');
  const [date, setDate] = useState(new Date());
  const [data, setdata] = useState({});
  const [access, setaccess] = useState(false);
  const [reason, setreason] = useState('');
  const [appointments, setappointments] = useState([]);

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

  const bookApp = async () => {
    console.log(moment(date).unix());
    console.log(reason, date);
  };

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
        <div className="flex gap-10 justify-between px-6">
          <div div className="flex flex-col gap-7 p-5 w-1/2">
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
            <hr className="h-[2px] bg-[#ff7a00] w-full border-0 self-center" />
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
          <div className="flex flex-col gap-4 items-center p-5 w-1/2">
            <div className="font-semibold text-xl mb-5">
              Book an Appointment
            </div>
            <div className="mx-auto">
              <DateTimePicker
                disabled={appointments.length ? true : false}
                value={data}
                label="Choose Date and Time"
                onChange={(e) => setDate(e.$d)}
              />
            </div>
            <div className="w-1/2 mx-auto">
              <InputGroup>
                <Form.Control
                  onChange={(e) => setreason(e.target.value)}
                  placeholder="Reason for appointment (optional)"
                  aria-label="With textarea"
                />
              </InputGroup>
            </div>

            <div className="mt-4">
              <Button
                variant="outline-primary"
                onClick={bookApp}
                disabled={appointments.length ? true : false}
              >
                Book
              </Button>
            </div>
            <div className="flex-col mt-5">
              <div className="text-xl font-semibold text-center">
                Upcoming Appointment
              </div>
              <div className="px-3 flex justify-center mt-4">
                <div className="rounded-md bg-white px-3 py-2">
                  {moment(new Date()).format('Do MMM YY hh:mm')}
                </div>
              </div>
              <div className="text-xl font-semibold mt-4 text-center">
                Previous Appointments
              </div>
              <div className="px-3 flex flex-wrap gap-4 mt-4">
                <PastAppointments />
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
}

const PastAppointments = () => {
  const date = moment.unix(new Date());

  return (
    <div className="flex flex-row px-5 py-5 bg-white rounded-md justify-between items-center">
      <div className="space-y-[6px]">
        <div className="font-semibold text-neurosafe-primary text-lg">
          {'nice'}
        </div>
        <div className="flex flex-row space-x-10">
          <div className="">Date: {date.format('L')}</div>
          <div className="">Time: {date.format('LT')}</div>
        </div>
      </div>
      <div className="">
        <button
          className="bg-neurosafe-primary px-2 py-2 text-sm rounded-md text-white border-2 border-neurosafe-primary hover:bg-white hover:text-neurosafe-primary duration-150 transition-all"
          onClick={() => {}}
        >
          View Details
        </button>
      </div>
    </div>
  );
};
