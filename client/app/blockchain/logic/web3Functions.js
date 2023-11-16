const getWeb3 = require('./getWeb3');
const web3Funcs = {};
web3Funcs.createAccount = async () => {
  const web3 = await getWeb3();
  console.log(await web3.eth.getAccounts());
  // const newAccount = await web3.eth.personal
  //   .newAccount('test')
  //   .then(console.log);
  // await web3.eth.personal.unlockAccount(newAccount, 'test', 10000);

  return web3;
};

web3Funcs.createAccount();

module.exports = web3Funcs;
