import moment from "moment"
import AppointmentCard from "./AppointmentCard";
export default function Appointments(){
    const app = [
		{
			time: "1699592400",
			username: "Kartik Menon",
		},
		{
			time: "1700974800",
			username: "Kartik Menon",
		},
		{
			time: "1701406800",
			username: "Kartik Menon",
		},
		{
			time: "1701557800",
			username: "Kartik Menon",
		},
	];
    return (
		<div className="bg-[#f3f3f3] rounded-md px-5 py-5">
			<div id="header" className="text-xl">
				Upcoming Appointments
			</div>
			<div className="grid grid-cols-4 gap-3 py-3 px-3">
				{app.map((appointment) => {
					return (
						<AppointmentCard
							time={appointment.time}
							username={appointment.username}
						/>
					);
				})}
			</div>
		</div>
	);
}