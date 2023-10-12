import Link from "next/link";
import Social from "@/components/shared/Social";

export default function Footer() {
	return (
		<footer className='py-2 lg:py-8 relative grid  w-full place-items-center overflow-hidden bg-gradient-to-b from-transparent to-surface-600/50  transition-colors'>
			<div className='flex w-full flex-col items-center gap-4 py-4'>
				<div className='xl:gap-[clamp(2rem,10vw + 2rem,8rem)] container mx-auto flex w-full flex-col items-center justify-center gap-4 px-5 py-6 text-center lg:py-12 xl:flex-row xl:justify-between xl:text-left'>
					<Link
						aria-label='diversis'
						title="diversis'"
						href='/'
						className='font-display flex place-items-center gap-x-6 font-bold xl:self-start'>
						<p className='h5 text-stroke-inverse'>
							diversis
						</p>
					</Link>
					{/* <Contacts className="flex-col gap-4" /> */}
				</div>
				<div>
					<Social />
				</div>
				<div className='container flex w-full items-center justify-center px-5 text-center '>
					<p>© 2023 diversis</p>
				</div>
			</div>
			{/* Attribution */}
			<div className='absolute hidden w-full border-t border-gray-200 bg-white text-center'>
				<p className='text-surface-500'>
					Made by
					<a
						className='font-medium text-surface-600 underline transition-colors'
						href='https://github.com/diversis'
						target='_blank'
						rel='noopener noreferrer'>
						diversis
					</a>
				</p>
			</div>
		</footer>
	);
}
