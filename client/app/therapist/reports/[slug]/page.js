"use client";
import moment from "moment";
import { useRouter } from "next/navigation";
export default function Reports({ params }) {
	// const router = useRouter();
	// const query = router;
	const { slug } = params;
	console.log(slug);
	const patient = {
		id: "1",
		name: "Kartik Menon",
		profilePic:
			"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
		gender: "M",
		age: 20,
		email: "kartik.menon@spit.ac.in",
		reports: [
			{
				report_id: "90123",
				datetime: "1698991200",
				title: "1st Appointment with Dr. Menon",
			},
			{
				report_id: "90000",
				datetime: "1699421400",
				title: "2nd Appointment with Dr. Menon",
			},
			{
				report_id: "37284",
				datetime: "1699592400",
				title: "3rd Appointment with Dr. Menon",
			},
			{
				report_id: "37284",
				datetime: "1699592400",
				title: "4th Appointment with Dr. Menon",
			},
			{
				report_id: "37284",
				datetime: "1699592400",
				title: "5th Appointment with Dr. Menon",
			},
			{
				report_id: "37284",
				datetime: "1699592400",
				title: "6th Appointment with Dr. Menon",
			},
			{
				report_id: "37284",
				datetime: "1699592400",
				title: "7th Appointment with Dr. Menon",
			},
		],
	};
	return (
		<div className="px-10 py-5 h-screen">
			<div
				className="py-5 text-neurosafe-primary text-3xl font-semibold"
				id="title"
			>
				User Details
			</div>
			<div className="bg-[#f7f7f7] px-5 py-14 rounded-xl max-h-[36rem] ">
				<div className="flex flex-row h-[100%]" id="content">
					<div className="flex flex-col w-[30%] px-5 space-y-8 items-center justify-center border-r-2 border-dashed">
						<img src={patient.profilePic} alt="" className="w-60 rounded-full" />
						<div className="font-semibold text-neurosafe-primary text-lg">
							Name:{" "}
							<span className="text-black">{patient.name}</span>
						</div>
						<div className="flex flex-row space-x-5">
							<div className="font-semibold text-neurosafe-primary text-lg">
								Age:{" "}
								<span className="text-black">
									{patient.age}
								</span>
							</div>
							<div className="font-semibold text-neurosafe-primary text-lg">
								Gender:{" "}
								<span className="text-black">
									{patient.gender}
								</span>
							</div>
						</div>
						<button
							className="bg-neurosafe-primary text-white px-5 py-1 rounded-md border-2 border-neurosafe-primary hover:bg-[#f7f7f7] hover:text-neurosafe-primary duration-150 transition-all  text-lg"
							onClick={() => {
								router.push("/chat");
							}}
						>
							Chat
						</button>
					</div>
					<div className="mx-auto px-5 space-y-3 overflow-y-auto overflow-x-hidden max-h-[29rem] my-auto">
						{patient.reports.map((report) => {
							const date = moment.unix(report.datetime);
							return (
								<div className="flex flex-row px-5 py-5 bg-white rounded-md w-[50rem] justify-between items-center">
									<div className="space-y-[6px]">
										<div className="font-semibold text-neurosafe-primary text-lg">
											{report.title}
										</div>
										<div className="flex flex-row space-x-10">
											<div className="">
												Date: {date.format("L")}
											</div>
											<div className="">
												Time: {date.format("LT")}
											</div>
										</div>
									</div>
									<div className="">
										<button
											className="bg-neurosafe-primary px-3 py-2 text-sm rounded-md text-white border-2 border-neurosafe-primary hover:bg-white hover:text-neurosafe-primary duration-150 transition-all"
											onClick={() => {
											}}
										>
											View Details
										</button>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
