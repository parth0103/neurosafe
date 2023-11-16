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
import { BsClockFill } from 'react-icons/bs';

export default function page({ params }) {
  const [tid, setid] = useState('');
  const [date, setDate] = useState(new Date());
  const [data, setdata] = useState({});
  const [access, setaccess] = useState(false);
  const [reason, setreason] = useState('');
  const [appointments, setappointments] = useState({});

  const [web3, accts, load] = useWeb3();
  //   const { id } = params;
  useEffect(() => {
    setid(params.id);
    axios
      .get('http://localhost:8000/api/users/' + params.id)
      .then((e) => setdata(e.data));
    console.log(localStorage.getItem('uid'));

    axios
      .get(
        'http://localhost:8000/api/appointment/patient/' +
          localStorage.getItem('uid')
      )
      .then((e) => {
        console.log(e.data);
        setappointments(e?.data);
      });
  }, []);

  useEffect(() => {
    console.log(accts);
    if (load == true) {
      checkAccess();
    }
  }, [load, access]);

  const bookApp = async () => {
    const dateTime = moment(date).toISOString();
    console.log(dateTime);
    const comment = reason;
    axios
      .post('http://localhost:8000/api/appointment', {
        date: dateTime,
        comment,
        patient: localStorage.getItem('uid'),
        therapist: tid,
      })
      .then((el) => console.log(el));
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
                <div>
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
              </div>

              <div></div>
            </div>
            <hr className="h-[2px] bg-[#ff7a00] w-full border-0 self-center" />
            <div className="flex gap-5">
              <div className="w-1/3">
                <div>
                  <div className="mb-3 font-semibold text-xl">Bio</div>
                  <div className="px-2">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Expedita, repellendus.
                  </div>
                </div>
              </div>
              <div className=" flex flex-col w-1/2 items-center gap-4 ">
                <div className="font-semibold text-xl mb-5">
                  Book an Appointment
                </div>
                <div className="mx-auto">
                  <DateTimePicker
                    disabled={
                      appointments?.upcomingAppointments?.length ? true : false
                    }
                    value={data}
                    label="Choose Date and Time"
                    onChange={(e) => setDate(e.$d)}
                  />
                </div>
                <div className="w-full mx-auto">
                  <InputGroup>
                    <Form.Control
                      onChange={(e) => setreason(e.target.value)}
                      placeholder="Reason for appointment (optional)"
                      aria-label="With textarea"
                      className="border-neurosafe-primary border-2"
                    />
                  </InputGroup>
                </div>

                <div className="mt-4">
                  <Button
                    variant="outline-primary"
                    onClick={bookApp}
                    disabled={
                      appointments?.upcomingAppointments?.length ? true : false
                    }
                  >
                    Book
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 items-center p-5 w-1/2">
            <div className="flex-col mt-5">
              <div className="text-xl font-semibold text-center">
                Upcoming Appointment
              </div>
              <div className="px-3 flex justify-center mt-4">
                {appointments?.upcomingAppointments?.map((el) => (
                  <div className="rounded-md bg-white px-3 py-2 border-neurosafe-primary border-2">
                    {moment(el.date).format('Do MMM YY, hh:mm a')}
                  </div>
                ))}
              </div>
              <div className="text-xl font-semibold mt-5 mb-5 text-center">
                Previous Appointments
              </div>
              <div className="px-3 flex flex-wrap gap-4 mt-4">
                <div className="flex flex-col gap-y-5 overflow-y-auto max-h-[70vh] z-5">
                  <div className="flex justify-between gap-5 items-center">
                    <div className="w-1/3 font-semibold text-center">Date</div>
                    <div className="font-semibold w-2/3 text-center">
                      Comment
                    </div>
                  </div>
                  {appointments?.pastAppointments?.map((el) => {
                    return <PastAppointments time={el.date} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
}

const PastAppointments = ({ time }) => {
  const date = moment(time);

  return (
    <>
      <div className="flex justify-between gap-5 items-center">
        <div className="w-1/3"> {date.format('Do MMM YY, hh:mm a')}</div>
        <div className="w-2/3">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,
          voluptatibus.
        </div>
      </div>
    </>
  );
};
