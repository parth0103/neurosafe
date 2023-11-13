"use client"
import Appointments from "../components/therapist/Appointments";
import Calendar from "../components/therapist/Calendar";
import Patients from "../components/therapist/Patients";
import { useRouter } from "next/navigation";

export default function Therapist(){
	const router = useRouter();
	const app = [
		{
			time: "1699592400",
			username: "Kartik Menon",
			profilePic:
				"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
		},
		{
			time: "1700974800",
			username: "Kartik Menon",
			profilePic:
				"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
		},
		{
			time: "1701406800",
			username: "Kartik Menon",
			profilePic:
				"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
		},
		{
			time: "1701557800",
			username: "Kartik Menon",
			profilePic:
				"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
		},
	];
	const patients = [
		{
			id: "1",
			name: "Kartik Menon",
			profilePic:
				"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
		},
		{
			id: "2",
			name: "Jai Patel",
			profilePic:
				"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
		},
		{
			id: "3",
			name: "Parth Gujarathi",
			profilePic:
				"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
		},
		{
			id: "4",
			name: "Param Kothari",
			profilePic:
				"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
		},
		{
			id: "5",
			name: "Paras Mehta",
			profilePic:
				"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
		},
		{
			id: "6",
			name: "Jay Vele",
			profilePic:
				"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
		},
		{
			id: "7",
			name: "Kunal Madrecha",
			profilePic:
				"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
		},
		{
			id: "8",
			name: "Sakshi Pandey",
			profilePic:
				"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
		},
		{
			id: "9",
			name: "Omkar Rane",
			profilePic:
				"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
		},
		{
			id: "10",
			name: "Trisha Shishodiya",
			profilePic:
				"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
		},
	];
    return (
		<div className="px-10 py-10 flex flex-col w-full h-[100vh]">
			<div id="header" className="pb-3 pr-5 justify-between flex flex-row">
				<div className="text-3xl font-semibold">
					Welcome{" "}
					<span className="text-neurosafe-primary">Dr. Menon</span>
				</div>
				<button className="bg-neurosafe-primary text-white px-3 rounded-md border-2 border-neurosafe-primary hover:bg-[#eaeaea] hover:text-neurosafe-primary duration-150 transition-all" onClick={() => {
					router.push('/chat')
				}}>
					Chat
				</button>
			</div>
			<div id="content" className="flex flex-row space-x-3 h-full">
				<div className="w-full flex flex-col space-y-3">
					<Appointments app={app} />
					<Calendar app={app} />
				</div>
				<Patients patients={patients}/>
			</div>
		</div>
	);
}