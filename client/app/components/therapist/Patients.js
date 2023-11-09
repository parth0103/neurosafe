import PatientCard from './PatientCard';

export default function Patients() {
  const patients = [
    {
      id: '1',
      name: 'Kartik Menon',
      profilePic:
        'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    },
    {
      id: '2',
      name: 'Jai Patel',
      profilePic:
        'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    },
    {
      id: '3',
      name: 'Parth Gujarathi',
      profilePic:
        'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    },
    {
      id: '4',
      name: 'Param Kothari',
      profilePic:
        'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    },
    {
      id: '4',
      name: 'Param Kothari',
      profilePic:
        'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    },
    {
      id: '4',
      name: 'Param Kothari',
      profilePic:
        'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    },
    {
      id: '4',
      name: 'Param Kothari',
      profilePic:
        'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    },
    {
      id: '4',
      name: 'Param Kothari',
      profilePic:
        'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    },
    {
      id: '4',
      name: 'Param Kothari',
      profilePic:
        'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    },
    {
      id: '4',
      name: 'Param Kothari',
      profilePic:
        'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    },
    {
      id: '4',
      name: 'Param Kothari',
      profilePic:
        'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    },
  ];
  return (
    <div className="w-[30%] bg-[#f3f3f3] rounded-md px-5 py-5 gap-y-3 flex flex-col">
      <div className="text-xl ">Patients</div>
      <div className="flex flex-col gap-y-3 overflow-y-auto max-h-[70vh] py-5 z-5">
        {patients.map((patient) => {
          return (
            <PatientCard
              id={patient.id}
              name={patient.name}
              profilePic={patient.profilePic}
            />
          );
        })}
      </div>
    </div>
  );
}
