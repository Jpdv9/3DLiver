import LiverModel from "./LiverModel";
import { useState } from 'react';

export default function FattyLiver() {
  const [isHealthy, setIsHealthy] = useState(false);

  const handleToggle = () => {
    setIsHealthy(!isHealthy);
  };

  return (
    <div className="text-center mt-10">
      <h2 className="text-3xl font-bold text-slate-800 mb-4">Enfermedades del Hígado</h2>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition mb-4"
        onClick={handleToggle}
      >
        {isHealthy ? 'Ver hígado graso' : 'Ver hígado sano'}
      </button>
      <LiverModel modelPath={isHealthy ? '/modelos/fattyliver/healthy-liver.glb' : '/modelos/fattyliver/early-fatty-liver.glb'} />
    </div>
  );
}

