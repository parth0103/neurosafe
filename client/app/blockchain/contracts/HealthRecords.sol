pragma solidity ^0.8.19;


contract HealthRecord{
    address private owner;
    bytes12[] doctorList;
    uint userCount = 0;
    uint tCount = 0;

    // bytes32 cid = 0xb45165ed3cd437b9ffad02a2aad22a4ddc69162470e2622982889ce5826f6e3d;

    mapping(bytes12 => user) userMapping;
    mapping(bytes12 => therapist) tMapping;
    mapping(bytes12 => mapping(bytes12 => bool)) recordAccess;
    mapping(bytes12 => report[]) userReports;

  // type(tCoun;

    struct user {
    string name;
    string gender;
    // string contact_info;
    bytes12 uid;
    bytes32[] files; 
    bytes12[] doctor_list;
    bool set;
  }

  struct report {
    uint timestamp;
    bytes12 uid;
    bytes12 generatedBy;
    bytes32 cid;
  }
  
 
  //structure of doctor info
  struct therapist{
      string name;
      string contact;
      string specialization;
      bytes12 uid;
      bytes12[] user_list;
      bool set;
  }

  constructor(){
    owner = msg.sender;
  }


  modifier onlyOwner(){
    require(msg.sender == owner);
    _;
  }

  modifier onlyUser(bytes12 _uid){
    require(userMapping[_uid].set == true, "Not a user");
    _;
  }

  modifier onlyTherapist(bytes12 _uid){
    require(tMapping[_uid].set == true, "Not a therapist");
    _;
  }

  function addTherapist(bytes12 id) onlyTherapist(id) public returns (bool){
    doctorList.push(id);
    return true;
  }

  function getPatientTherapists() public view returns(bytes12[] memory){
    return doctorList;
  }


    event signup(bytes12 _uid, string _type);

  function signupUser(string memory _name, string memory _gender, bytes12 _uid) public returns (bool) {

    require(userMapping[_uid].set == false, "User already exists");

    user memory newUser = user(_name, _gender, _uid, new bytes32[](0), new bytes12[](0), true);
    userCount = userCount + 1;

    // require(userMapping[_uid].name.length < 0 , "User already exists!!");
    userMapping[_uid] = newUser;

    emit signup(_uid, "user");

    return true;

  }

  function signupTherapist(string memory _name, string memory _contact, string memory _specialization, bytes12  _uid) public returns (bool) {
   
    require(tMapping[_uid].set == false, "User already exists");

    therapist memory newUser = therapist(_name, _contact, _specialization, _uid, new bytes12[](0), true);
    tCount = tCount + 1;

    // require(userMapping[_uid].name.length < 0 , "User already exists!!");
    tMapping[_uid] = newUser;

    emit signup(_uid, "therapist");


    return true;

  }

  function getUserData(bytes12 _uid) public view onlyUser(_uid) returns(user memory){
    return userMapping[_uid];
  }

  function getTherapistData(bytes12 _uid) public view onlyTherapist(_uid) returns(therapist memory){
    return tMapping[_uid];
  }


  function grantRecordAccess(bytes12 _user_uid, bytes12 _t_uid) public onlyUser(_user_uid) onlyTherapist(_t_uid) onlyOwner returns (bool) {
    require(recordAccess[_user_uid][_t_uid] == false, "Already given access");

    recordAccess[_user_uid][_t_uid] = true;
    userMapping[_user_uid].doctor_list.push(_t_uid);
    tMapping[_t_uid].user_list.push(_user_uid);

    return true;
  }

  function revokeRecordAccess(bytes12 _user_uid, bytes12 _t_uid)  onlyUser(_user_uid) onlyTherapist(_t_uid) public onlyOwner returns (bool) {
    
    require(recordAccess[_user_uid][_t_uid] == true, "Already revoked access");
    recordAccess[_user_uid][_t_uid] = false;

    return true;
  }

  function getPatientsForTherapist(bytes12 _uid) public onlyTherapist(_uid) view returns(user[] memory){
    bytes12[] memory users = tMapping[_uid].user_list;
    user[] memory result = new user[](users.length);

    for(uint i=0;i<users.length;i++){
        if(recordAccess[users[i]][_uid] == false) continue;
        result[i] = userMapping[users[i]];
    }

    return result;
  }

  function getTherapistsForPatient(bytes12 _uid) public view onlyUser(_uid) returns(therapist[] memory){
    bytes12[] memory therapists = userMapping[_uid].doctor_list;
    therapist[] memory result = new therapist[](therapists.length);

    for(uint i=0;i<therapists.length;i++){
        if(recordAccess[_uid][therapists[i]] == false) continue;
        result[i] = tMapping[therapists[i]];
    }

    return result;
  } 


  function addReport(bytes12 _uid, bytes12 _tid, bytes32 cid) public onlyUser(_uid) onlyTherapist(_tid) onlyOwner returns(bool){
    uint ts = block.timestamp;
    userReports[_uid].push(report(ts, _uid, _tid, cid));
    return true;
  }

  function getReportsByUser(bytes12 _u_uid, bytes12 _t_uid ) public onlyUser(_u_uid) onlyTherapist(_t_uid) view returns (report[] memory){
    require(recordAccess[_u_uid][_t_uid] == true, "Unauthorised Access!!");
    return userReports[_u_uid];
  }

  function checkAccess(bytes12 _uid, bytes12 _tid) public onlyOwner onlyUser(_uid) onlyTherapist(_tid) view returns (bool){
    return recordAccess[_uid][_tid];
  }


}