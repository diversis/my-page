export default function Filters() {
	return (
		<>
			<svg
				id='wave-vertical'
				viewBox='0 0 200 50'
				width='0'
				height='0'
				xmlns='http://www.w3.org/2000/svg'
				version='1.1'
				style={{
					opacity: 1,
					background: "transparent",
					position: "absolute",
					height: 0,
					width: 0,
				}}>
				<defs>
					<clipPath
						id='clip-wave-vertical'
						clipPathUnits='objectBoundingBox'>
						<path
							transform='translate(0 0) scale(0.0065 0.02)'
							fill='none'
							strokeLinecap='round'
							strokeLinejoin='miter'>
							<animate
								attributeName='d'
								dur='50000ms'
								repeatCount='indefinite'
								keySplines='.1 0.2 0.2 1;0.3 0.8 0.4 1;0.1 0.1 0.3 1;0.1 0.2 0.4 1;0.3 0.1 0.2 1;0.1 0.8 0.2 1'
								values='M109 0L108.5 2.2C108 4.3 107 8.7 106.3 12.8C105.7 17 105.3 21 106 25.2C106.7 29.3 108.3 33.7 107.5 37.8C106.7 42 103.3 46 101.7 48L100 50L0 50L0 48C0 46 0 42 0 37.8C0 33.7 0 29.3 0 25.2C0 21 0 17 0 12.8C0 8.7 0 4.3 0 2.2L0 0Z;M99 0L98.8 2.2C98.7 4.3 98.3 8.7 97.5 12.8C96.7 17 95.3 21 96.5 25.2C97.7 29.3 101.3 33.7 101.3 37.8C101.3 42 97.7 46 95.8 48L94 50L0 50L0 48C0 46 0 42 0 37.8C0 33.7 0 29.3 0 25.2C0 21 0 17 0 12.8C0 8.7 0 4.3 0 2.2L0 0Z;M104 0L102.3 2.2C100.7 4.3 97.3 8.7 97 12.8C96.7 17 99.3 21 99.2 25.2C99 29.3 96 33.7 95.7 37.8C95.3 42 97.7 46 98.8 48L100 50L0 50L0 48C0 46 0 42 0 37.8C0 33.7 0 29.3 0 25.2C0 21 0 17 0 12.8C0 8.7 0 4.3 0 2.2L0 0Z;M109 0L106.2 2.2C103.3 4.3 97.7 8.7 96.3 12.8C95 17 98 21 100.8 25.2C103.7 29.3 106.3 33.7 107.3 37.8C108.3 42 107.7 46 107.3 48L107 50L0 50L0 48C0 46 0 42 0 37.8C0 33.7 0 29.3 0 25.2C0 21 0 17 0 12.8C0 8.7 0 4.3 0 2.2L0 0Z;M109 0L108.5 2.2C108 4.3 107 8.7 106.3 12.8C105.7 17 105.3 21 106 25.2C106.7 29.3 108.3 33.7 107.5 37.8C106.7 42 103.3 46 101.7 48L100 50L0 50L0 48C0 46 0 42 0 37.8C0 33.7 0 29.3 0 25.2C0 21 0 17 0 12.8C0 8.7 0 4.3 0 2.2L0 0Z'></animate>
						</path>
					</clipPath>
				</defs>
			</svg>
		</>
	);
}
