"use client";
import {
	m,
	useInView,
	useMotionValue,
	useScroll,
	useSpring,
	useTransform,
} from "framer-motion";
import {
	Suspense,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import {
	Canvas,
	useFrame,
	useThree,
} from "@react-three/fiber";
import {
	Box,
	Grid,
	Line,
	OrthographicCamera,
	PerformanceMonitor,
	PerspectiveCamera,
	PointerLockControls,
} from "@react-three/drei";
import {
	BufferGeometry,
	Color,
	Mesh,
	NormalBufferAttributes,
	Vector3,
	Material,
	MeshBasicMaterial,
} from "three";
import { Perf } from "r3f-perf";
import { useControls } from "leva";

const xSize = Math.sqrt(3) * 0.5;

export default function BodyBG() {
	const ref = useRef<HTMLDivElement>(null);
	const [bad, set] = useState(false);
	const { debug, enabled, samples, ...config } =
		useControls({
			debug: true,
			enabled: true,
			size: {
				value: 35,
				min: 0,
				max: 100,
				step: 0.1,
			},
			focus: {
				value: 0.5,
				min: 0,
				max: 2,
				step: 0.1,
			},
			samples: {
				value: 16,
				min: 1,
				max: 40,
				step: 1,
			},
		});
	// const [mousePosition, setMousePosition] = useState<{
	// 	x: number;
	// 	y: number;
	// }>({ x: 0, y: 0 });

	// const handleMouseMove = async (
	// 	e: React.MouseEvent<HTMLElement, MouseEvent>
	// ) => {
	// 	// setMouseX(e.clientX);
	// 	// setMouseY(e.clientY);
	// 	setMousePosition({
	// 		x: e.clientX,
	// 		y: e.clientY,
	// 	});
	// };
	return (
		<m.div
			ref={ref}
			className='pointer-events-none bg-transparent fixed inset-x-0 top-0 h-screen'>
			<Canvas
				shadows
				className='absolute inset-0'>
				<Suspense fallback={null}>
					{debug && (
						<Perf
							position='bottom-left'
							className='mt-32'
						/>
					)}
					<PerformanceMonitor
						onDecline={() => set(true)}
					/>
					{/* <Rig /> */}
					<directionalLight
						castShadow
						position={[3, 5, 2]}
						color={"#e2f5e2"}
						intensity={1.5}
						shadow-mapSize={[1024, 1024]}
					/>
					<ambientLight
						color={"#e2f5e2"}
						intensity={0.5}
					/>
					<OrthographicCamera />
					<Mouse />
					<HexGrid />
				</Suspense>
			</Canvas>
		</m.div>
	);
}

function Rig() {
	const { camera, mouse } = useThree();
	const vec = new Vector3();

	return useFrame(() => {
		camera.position.lerp(
			vec.set(mouse.x, mouse.y, camera.position.z),
			0.05
		);
		camera.lookAt(0, 0, 0);
	});
}

function Mouse() {
	const { mouse, viewport } = useThree();
	const ref = useRef<Mesh>(null!);
	const red = useMemo(() => new Color("red"), []);

	return (
		<>
			<mesh ref={ref}>
				<Line
					points={[
						[
							viewport.width * 0.5,
							viewport.height * 0.5,
							0,
						],
						[
							mouse.x * viewport.width * 0.5,
							mouse.y * viewport.height * 0.5,
							0,
						],
					]}
					color={red}
					lineWidth={2}
				/>

				{/* </mesh>
			<mesh> */}
				<Line
					points={[
						[
							viewport.width * 0.5,
							-viewport.height * 0.5,
							0,
						],
						[
							mouse.x * viewport.width * 0.5,
							mouse.y * viewport.height * 0.5,
							0,
						],
					]}
					color={red}
					lineWidth={2}
				/>
				{/* </mesh>
			<mesh> */}
				<Line
					points={[
						[
							-viewport.width * 0.5,
							-viewport.height * 0.5,
							0,
						],
						[
							mouse.x * viewport.width * 0.5,
							mouse.y * viewport.height * 0.5,
							0,
						],
					]}
					color={red}
					lineWidth={2}
				/>
				{/* </mesh>
			<mesh> */}
				<Line
					points={[
						[
							-viewport.width * 0.5,
							viewport.height * 0.5,
							0,
						],
						[
							mouse.x * viewport.width * 0.5,
							mouse.y * viewport.height * 0.5,
							0,
						],
					]}
					color={red}
					lineWidth={2}
				/>
			</mesh>
		</>
	);
}
function HexContour({
	center,
	size = 1,
}: {
	center: [number, number, number];
	size?: number;
}) {
	const d = Math.sqrt(3) * 0.5 * size;
	const points: [number, number, number][] = [
		[center[0], center[1] + size, center[2]],
		[center[0] - d, center[1] + size * 0.5, center[2]],
		[center[0] - d, center[1] - size * 0.5, center[2]],

		[center[0], center[1] - size, center[2]],
		[center[0] + d, center[1] - size * 0.5, center[2]],
		[center[0] + d, center[1] + size * 0.5, center[2]],
	];
	return (
		<mesh>
			{points.map((point, id) => {
				// const d3 = id % 3;
				// const dir = d3 === 0 ? 1 : 0.5;
				// const start = [
				// 	d3 === 0 ? -d : d3 === 2 ? d : 0,
				// 	id < 3 ? dir * size : -dir * size,
				// 	0,
				// ];

				return (
					<Line
						key='hex-line-id'
						points={[
							point,
							points[id === 5 ? 0 : id + 1],
						]}
						color='red'
						lineWidth={2}></Line>
				);
			})}
		</mesh>
	);
}

const HexGrid = () => {
	const { mouse, viewport } = useThree();
	let hexGrid: [number, number, number][] = [];
	for (let q = 0; q < 10; q++) {
		for (let r = 0; r < 10; r++) {
			hexGrid.push([
				(5 - q) * xSize * 2,
				(5 - r) * 2,
				0,
			]);
		}
	}

	return (
		<>
			{hexGrid.map((hex, id) => (
				<Box
					key={`hex-${id}`}
					args={hex}
					scale={viewport.width * 0.05}
				/>
			))}
		</>
	);
};
