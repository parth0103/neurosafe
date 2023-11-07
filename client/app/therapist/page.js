import Appointments from "../components/therapist/Appointments";
import Calendar from "../components/therapist/Calendar";
import Patients from "../components/therapist/Patients";

export default function Therapist(){
    return (
		<div className="px-10 py-10 flex flex-col w-full h-[100vh]">
			<div id="header" className="text-3xl font-semibold py-5">
				Welcome <span className="text-neurosafe-primary">Dr. Menon</span>
			</div>
			<div id="content" className="flex flex-row space-x-3 h-full">
				<div className="w-full flex flex-col space-y-3">
					<Appointments/>
				    <Calendar/>
				</div>
					<Patients/>
			</div>
		</div>
	);
}