const journalControllers = {};
import Journal from '../../models/journalModel.js';
import mongoose from 'mongoose';
import moment from 'moment';
journalControllers.postJournal = async (req, res) => {
  const { title, body, emotions } = req.body;
  console.log(req.body);
  const payload = {
    user: new mongoose.Types.ObjectId(),
    title,
    body,
    emotions: emotions || [],
  };
  const doc = new Journal(payload);
  const result = await doc.save(payload);
  res.json('Saved Document!');
};
journalControllers.getJournal = async (req, res) => {
  const duration = req?.query?.duration;
  // duration == duration ? duration : 10;
  const result = await Journal.find({
    createdAt: { $gte: moment().add(-10, 'days') },
  });
  res.send(result);
};
journalControllers.editJournal = async (req, res) => {};
journalControllers.deleteJournals = async (req, res) => {};

export default journalControllers;
