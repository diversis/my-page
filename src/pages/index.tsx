import Link from "next/link";

export default function Home() {
	return (
		<>
			<>
				<div
					className={`container flex min-h-screen flex-col items-center justify-between p-2`}>
					<Link
						href={"#"}
						className='link'>
						Link
					</Link>
					<div className='w-full h-screen'></div>
					<div className='w-full h-screen'></div>
				</div>
			</>
		</>
	);
}
