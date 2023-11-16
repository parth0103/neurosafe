"use client";
import { Scheduler, View } from "devextreme-react/scheduler";
import "devextreme/dist/css/dx.light.css";
import moment from "moment";

export default function Calendar({app}){
	let schedule = []
	for (let index = 0; index < app.length; index++) {
		const datetime_start = moment.unix(app[index].time)
		const datetime_end = moment.unix(parseInt(app[index].time) + 3600);
		const element = {
			startDate:
				datetime_start.toISOString(),
			endDate:
				datetime_end.toISOString(),
			title: app[index].username
		};
		schedule.push(element)
	}
    return (
		<div className="bg-[#f3f3f3] rounded-md px-5 py-5 w-full h-full">
			<div id="header" className="text-xl font-semibold pb-3">
				Calendar
			</div>
			<div className="">
				<Scheduler
					dataSource={schedule}
					defaultCurrentView="month"
					height={350}
				>
					<View type="day" startDayHour={10} endDayHour={22} />
					<View type="week" startDayHour={10} endDayHour={22} />
					<View type="month" />
				</Scheduler>
			</div>
		</div>
	);
}