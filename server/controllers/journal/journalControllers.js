export default journalControllers = {};
import Journal from '../../models/journalModel';
journalControllers.getJournals = async (req, res) => {
  const { title, body, emotions } = req.body;
  const uid = parseInt(req.uid);
  const pid = await db.incrId('pid');
  const payload = {
    uid,
    pid,
    title,
    body,
    emotions: emotions || [],
    createdAt: Date.now(),
  };
};
journalControllers.postJournal = async (req, res) => {};
journalControllers.editJournal = async (req, res) => {};
journalControllers.deleteJournals = async (req, res) => {};
