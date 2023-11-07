const journalControllers = {};
import Journal from '../../models/journalModel.js';
import mongoose from 'mongoose';
import moment from 'moment';
import axios from 'axios';
import fetch from 'node-fetch';

const userID = '654892861bfbf903785bc796';

const getSentiment = async (input) => {
  try {
    // const response = await fetch('http://localhost:5000/predict', {
    //   method: 'POST',
    //   body: { input },
    // });

    const result = await axios.post(
      'http://localhost:5000/predict',
      { input },
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    return response?.sentiment;
  } catch (err) {
    console.log(err);
  }
};

journalControllers.postJournal = async (req, res) => {
  const { title, body, emotions, sentiment } = req.body;
  const payload = {
    user: userID,
    title,
    body,
    sentiment,
    emotions: emotions || [],
  };
  // const sentiment = await getSentiment(body);
  const doc = new Journal(payload);
  const result = await doc.save(payload);
  console.log(result);
  res.json('Saved!');
};
journalControllers.getJournal = async (req, res) => {
  const duration = req?.query?.duration;
  // duration == duration ? duration : 10;
  const result = await Journal.find({
    createdAt: { $gte: moment().add(-10, 'days') },
  }).sort('-createdAt');
  res.send(result);
};
journalControllers.flushData = async (req, res) => {
  await Journal.deleteMany({}).then((e) => res.json(e));
};
journalControllers.editJournal = async (req, res) => {};
journalControllers.deleteJournals = async (req, res) => {};

export default journalControllers;
