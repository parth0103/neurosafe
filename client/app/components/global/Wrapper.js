import React from 'react';
export default function Wrapper({ children }) {
  return (
    <>
      <div style={{ paddingTop: '5.2em', backgroundColor: '#eaeaea' }}>
        {children}
      </div>
    </>
  );
}
