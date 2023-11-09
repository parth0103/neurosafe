'use client';
import { useState } from 'react';

export default function PatientCard(props) {
  const [patient, setPatient] = useState({});
  console.log(patient);
  return (
    <div className="p-2 bg-white w-full flex flex-row items-center justify-between mx-auto">
      <div className="flex flex-row items-center space-x-3 text-sm">
        <div className="">
          <img src={props.profilePic} alt="" className="h-10" />
        </div>
        <div className="font-semibold">{props.name}</div>
      </div>
      <div className="text-xs">
        <button
          className="bg-neurosafe-primary p-2 rounded-sm text-white border-2 border-neurosafe-primary hover:bg-white hover:text-neurosafe-primary duration-150 transition-all"
          onClick={() => {
            setPatient(props);
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
}
