import React from 'react';
import Wrapper from '../components/global/Wrapper';
import Container from '../components/global/Container';
function PatientCard() {
  return (
    <div className="flex flex-col p-3 gap-3 bg-white shadow-sm border-1 rounded-lg w-[15%] cursor-pointer">
      <div className="flex justify-center rounded-full ">
        <img
          className="rounded-full"
          src="https://picsum.photos/300/300/"
          width={100}
          height={100}
          alt="Picture of the author"
        />
      </div>
      <div className="font-semibold text-md text-center">Parth Gujju, 21</div>
      <div className=" text-sm text-center">
        12:00 pm, 20th December, Thursday
      </div>
    </div>
  );
}
export default function page() {
  return (
    <Wrapper>
      <div className="px-4">
        <h3 className="text-xl font-semibold mb-2 ">Upcoming Appointments</h3>
        <div className="flex flex-wrap min-h-[200px] mb-4 px-2 gap-3">
          {[1, 2, 3, 4, 5].map(() => (
            <PatientCard />
          ))}
        </div>
        <h3 className="text-xl font-semibold mb-2">Previous Appointments</h3>
        <div className="flex flex-wrap min-h-[100px]">
          <div className="items-center justify-center"> wow such empty</div>
        </div>
      </div>
    </Wrapper>
  );
}
