import moment from "moment"
import AppointmentCard from "./AppointmentCard";
export default function Appointments({app}){
    return (
		<div className="bg-[#f7f7f7] rounded-md px-5 py-5">
			<div id="header" className="text-xl font-semibold ">
				Upcoming Appointments
			</div>
			<div className="grid grid-cols-4 gap-3 py-3 px-3">
				{app.map((appointment) => {
					return (
						<AppointmentCard
							time={appointment.time}
							username={appointment.username}
							profilePic={appointment.profilePic}
						/>
					);
				})}
			</div>
		</div>
	);
}