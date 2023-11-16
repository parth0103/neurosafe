import React, { useEffect, useState } from 'react';
import styles from '../../styles/Dashboard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import moment from 'moment';
const Events = () => {
  const [appointments, setappointments] = useState({});
  useEffect(() => {
    axios
      .get(
        'http://localhost:8000/api/appointment/patient/' +
          localStorage.getItem('uid')
      )
      .then((e) => {
        console.log(e.data);
        const d = e.data;
        const past = d?.pastAppointments?.splice(0, 4);
        d.pastAppointments = past;
        setappointments(d);
      });
  }, []);
  const [events, setEvents] = useState([
    { name: 'Appointment with Dr. Pai', time: '12:30 Am' },
    { name: 'Healthy Mind Event', time: '2:30 Am' },
  ]);
  const [chosen, setchosen] = useState('today');
  return (
    <div className={styles.events}>
      <div>
        <h1 className=" text-center mb-2">Appointments</h1>
      </div>
      <div className="p-3 pt-1 ">
        <div className="flex justify-content-around mb-2 ">
          <div
            className={chosen == 'today' ? styles.chosen : ''}
            onClick={() => setchosen('today')}
          >
            Previous
          </div>
          <div
            className={chosen == 'upcoming' ? styles.chosen : ''}
            onClick={() => setchosen('upcoming')}
          >
            Upcoming
          </div>
        </div>
        <div className="flex flex-column gap-2 pt-2">
          {chosen == 'upcoming'
            ? appointments?.upcomingAppointments?.map((e) => {
                return (
                  <div className="flex justify-content-between gap-2 align-items-center bg-[#eaeaea]/40 p-2 rounded-lg">
                    <FontAwesomeIcon icon={faCalendar} />
                    <div className="font-bold test-center">
                      {e.therapist.name}
                    </div>
                    <div>{moment(e.date).format('DD/MM/YY, hh:mm a')}</div>
                  </div>
                );
              })
            : appointments?.pastAppointments?.map((e) => {
                return (
                  <div className="flex justify-content-between gap-2 align-items-center bg-[#eaeaea]/40 p-2 rounded-lg">
                    <FontAwesomeIcon icon={faCalendar} />
                    <div className="font-bold test-center">
                      {e.therapist.name}
                    </div>
                    <div>{moment(e.date).format('DD/MM/YY, hh:mm a')}</div>
                  </div>
                );
              })}

          <></>
          {!events.length && (
            <div className="text-center p-4">{'No Upcoming events!'}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
