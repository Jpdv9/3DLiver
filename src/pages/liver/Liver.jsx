import { Outlet } from 'react-router';
import LiverModel from './LiverModel'
import './Liver.css';

const Liver = () => {

    return (
        <div className="main-content-area">
            {/* Sección de Estadísticas/Tarjetas Superiores */}
            <div className="stats-section">
                <div className="stat-card">
                    <h3>Total Lecciones</h3>
                    <p>60</p>
                </div>
                <div className="stat-card">
                    <h3>Completadas</h3>
                    <p>16</p>
                </div>
                <div className="stat-card">
                    <h3>Pendientes</h3>
                    <p>43</p>
                </div>
                <div className="stat-card">
                    <h3>Quiz</h3>
                    <p>15</p>
                </div>
            </div>

            {/* Sección Central con el Modelo 3D */}
            <div className="model-display-section">
                <div className="liver-model-placeholder">
                    <LiverModel modelPath={'/modelos/fattyliver/healthy-liver.glb'}/>
                </div>
            </div>

            {/* Sección de Tarjetas de Enfermedades */}
            <div className="disease-cards-section">
                <h2>Haz click sobre la tarjeta para aprender más sobre esa enfermedad</h2>
                <div className="cards-grid">
                    <div className="disease-card">
                        <p>Hígado Sano</p>
                    </div>
                    <div className="disease-card">
                         <p>Cirrosis Viral</p>
                    </div>
                     <div className="disease-card">
                         <p>Cáncer de Hígado</p>
                    </div>
                    <div className="disease-card">
                         <p>Hígado Graso</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Liver
