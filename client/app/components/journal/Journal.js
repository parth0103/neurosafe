import React, { useContext } from 'react';
import JournalEntry from './JournalEntry';
import { ToastContainer, toast } from 'react-toastify';
import styles from '../../styles/Reflect.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import { GlobalContext } from '@/app/GlobalWrapper';
export default function Journal({ user, trigger, triggerCount }) {
  const [journals, setjournals] = useState([]);
  const [loading, setloading] = useState(true);
  // setBot(false);
  const { setBot } = useContext(GlobalContext);
  const getData = async (time = 'today') => {
    axios
      .get('http://localhost:8000/api/journal')
      .then((e) => {
        console.log(e);
        setjournals(e.data);
        setloading(false);
      })
      .catch((e) => {
        console.log(e);
        setloading(false);
      });
  };

  useEffect(() => {
    setloading(true);
    getData();
  }, [trigger]);
  const updateEntry = (data) => {
    console.log(data);
    data = { uid: user.uid, ...data };
    axios
      .put('/api/reflect/journal', data)
      .then((e) => {
        console.log(e);
        toast.success('Updated Successfully');
        triggerCount();
      })
      .catch();
  };
  const handleDelete = (data) => {
    data = { uid: user.uid, ...data };
    axios.delete('/api/reflect/journal', { data: data }).then((e) => {
      console.log(e);
      toast.success('Deleted Successfully');
      triggerCount();
    });
  };
  return (
    <>
      <div className={styles.journal}>
        <div className="container pt-1">
          <div className="flex justify-content-between">
            <h1 className="inline-block">Journal</h1>
            <div className={styles.dropdown}>
              <button className={styles.dropbtn}>
                Dropdown <FontAwesomeIcon icon={faChevronDown} />
              </button>
              <div className={styles.dropdownContent}>
                <a href="#" onClick={() => getData('today')}>
                  Today
                </a>
                <a href="#" onClick={() => getData('yesterday')}>
                  Yesterday
                </a>
                <a href="#">Last Week</a>
                <a href="#">Last Month</a>
              </div>
            </div>
          </div>
          <hr className="mb-4" />
          <div className={styles.innerjournal}>
            {!loading ? (
              journals.length ? (
                journals.map((e, i) => {
                  return (
                    <JournalEntry
                      updateEntry={updateEntry}
                      handleDelete={handleDelete}
                      data={e}
                      key={i}
                    />
                  );
                })
              ) : (
                <div className="bg-white text-center mt-5 ">
                  Wow! Such Empty
                </div>
              )
            ) : (
              <div className="bg-white flex justify-content-center h-100 mt-5">
                <Spinner animation="border" role="status" variant="primary" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
