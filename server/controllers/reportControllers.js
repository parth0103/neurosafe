const reportControllers = {};
import mongoose from 'mongoose';
import moment from 'moment';

import fs from 'fs';
const ipfsSuffix = '.ipfs.w3s.link';
import { Web3Storage, getFilesFromPath } from 'web3.storage';

const uploadFileToIPFS = async (path) => {
  const client = new Web3Storage({
    token: process.env.IPFS_TOKEN,
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
