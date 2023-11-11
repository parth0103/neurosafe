const reportControllers = {};
import mongoose from 'mongoose';
import moment from 'moment';

import fs from 'fs';
const ipfsSuffix = '.ipfs.w3s.link';
import { Web3Storage, getFilesFromPath } from 'web3.storage';

const uploadFileToIPFS = async (path) => {
  const client = new Web3Storage({
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDA3MEYwMkM4NjZEOTRCMjFFQjE0YTdiOWRENTcwZjFhQjMxOEZjQUMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTk3MDI0MDMyNTgsIm5hbWUiOiJuZXVyb3NhZmUifQ.4hDI750ykggbgSo_Yg8bWvaZ9c5Y1Yvq9GjMhqEGXKo',
  });
  const Files = await getFilesFromPath(path);
  console.log(Files);
  const cid = await client.put(Files);
  console.log('Content added with CID:', cid);
  return cid;
};

reportControllers.uploadBlob = async (req, res) => {
  const blob = new Blob([req.file.buffer], { type: 'application/pdf' });
  const fileName = 'report.pdf';

  const pdfBuffer = Buffer.from(await blob.arrayBuffer());
  const filePath = `./uploads/${fileName}`;
  try {
    fs.writeFile(filePath, pdfBuffer, async (err) => {
      if (err) {
        console.error('Error saving PDF file:', err);
      } else {
        console.log('PDF file saved successfully:', filePath);
        var cid = '';
        // cid = await uploadFileToIPFS(filePath);
        const fileLink = 'https://' + cid + ipfsSuffix + '/' + fileName;
        fs.unlink(filePath, () => {});
        res.json({ url: fileLink });
      }
    });
  } catch (err) {
    res.status.json({ err });
  }
};

export default reportControllers;
