import moment from "moment"

export default function AppointmentCard({time, username, profilePic}){
    const date = moment.unix(time)
    return (
		<div className="w-full px-2 py-2 rounded-lg bg-white flex flex-row space-x-3 items-center">
			<div className="">
				<img src={profilePic} alt="" className="h-10 rounded-full" />
			</div>
			<div className="flex flex-col">
				<div className="font-semibold ">{username}</div>
				<div className="flex flex-row space-x-5">
					<div>{date.format("L")}</div>
					<div>{date.format("LT")}</div>
				</div>
			</div>
		</div>
	);
}