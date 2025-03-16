import useFetchCareers from "../hooks/useFetchCareers";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Player from "../components/Game/Player";
import Clouds from "../components/Game/Clouds";
import CareerPlanets from "../components/Game/CareerPlanets";
import AnimatedText from "../components/UI/AnimatedText";

const CameraFollow = ({ playerRef }) => {
    useFrame(({ camera }) => {
        if (playerRef.current) {
            camera.position.lerp(
                {
                    x: playerRef.current.position.x,
                    y: playerRef.current.position.y + 3,
                    z: playerRef.current.position.z + 5,
                },
                0.1
            );
            camera.lookAt(playerRef.current.position);
        }
    });

    return null;
};

const Game = () => {
    const { careers } = useFetchCareers(); // Fetch career options
    const [selectedCareer, setSelectedCareer] = useState(null);
    const playerRef = useRef();

    return (
        <div className="h-screen w-full relative">
            <Canvas camera={{ position: [0, 5, 10] }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} />
                <Player ref={playerRef} />
                <Clouds />
                {!selectedCareer && (
                    <CareerPlanets onSelectCareer={setSelectedCareer} />
                )}
                <CameraFollow playerRef={playerRef} />
                <OrbitControls />
            </Canvas>

            {/* Floating UI */}
            <div className="absolute top-5 left-5 bg-black bg-opacity-70 text-white p-4 rounded-lg">
                <h2 className="text-lg font-bold">🚀 Fly & Choose Your Career</h2>
                <p>🛸 Click on a planet to select your field!</p>
            </div>

            {/* Animated Career Name */}
            {selectedCareer && (
                <>
                    <AnimatedText text={`You chose: ${selectedCareer}`} />
                    <button
                        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-lg"
                        onClick={() => alert(`Analyzing scope for ${selectedCareer}...`)}
                    >
                        🔍 Find Career Scope
                    </button>
                </>
            )}
        </div>
    );
};

export default Game;
