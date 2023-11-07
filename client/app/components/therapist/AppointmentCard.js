import moment from "moment"

export default function AppointmentCard({time, username}){
    const date = moment.unix(time)

    return (
		<div className="w-full px-2 py-2 rounded-lg bg-white">
			<div>{username}</div>
			<div className="flex flex-row space-x-5">
				<div>{date.format("DD/MM/YYYY")}</div>
				<div>{date.format("HH:MM A")}</div>
			</div>
		</div>
	);
}