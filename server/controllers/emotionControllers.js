const emotionControllers = {};
import Journal from '../models/journalModel.js';
import mongoose from 'mongoose';
import moment from 'moment';

const em_map = {
  sadness: 1,
  joy: 5,
  love: 6,
  anger: 3,
  fear: 2,
  surprise: 4,
};

emotionControllers.getPastData = async (req, res) => {
  const result = await Journal.find({
    createdAt: { $gte: moment().add(-10, 'days') },
  }).sort('-createdAt');
  const x = result.map((el, i) => moment(el.createdAt).format('ddd'));
  res.send({ x, y: result.map((el) => em_map[el.sentiment]) });
};

export default emotionControllers;
