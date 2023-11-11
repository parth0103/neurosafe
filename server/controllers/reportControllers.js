const reportControllers = {};
import mongoose from 'mongoose';
import moment from 'moment';

import fs from 'fs';
reportControllers.uploadBlob = async (req, res) => {
  const blob = new Blob([req.file.buffer], { type: 'application/pdf' });
  res.json(1);

  //   const pdfBuffer = Buffer.from(await blob.arrayBuffer());
  //   const filePath = './uploads/document.pdf';
  // Write the Buffer to a file
  //   console.log(typeof pdfBuffer);
  //   fs.writeFile(filePath, pdfBuffer, (err) => {
  //     if (err) {
  //       console.error('Error saving PDF file:', err);
  //     } else {
  //       console.log('PDF file saved successfully:', filePath);
  //     }
  //   });
};

export default reportControllers;
