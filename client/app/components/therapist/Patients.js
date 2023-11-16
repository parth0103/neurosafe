import PatientCard from './PatientCard';

export default function Patients({patients}) {
  
  return (
		<div className="w-[30%] bg-[#f3f3f3] rounded-md px-5 py-5 gap-y-3 flex flex-col">
			<div className="text-xl font-semibold">
				Patients
			</div>
			<div className="flex flex-col gap-y-3 overflow-y-auto max-h-[70vh] z-5">
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
