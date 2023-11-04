import React from 'react';
export default function Container({ styles, children, handleSubmit }) {
  const style = `container mx-auto shadow-md shadow-black-100 bg-white rounded-lg p-3 ${styles}`;
  return (
    <>
      <div className={style} onClick={handleSubmit}>{children}</div>
    </>
  );
}
