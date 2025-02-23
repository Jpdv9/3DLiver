import { useNavigate } from 'react-router';
import { useCallback } from 'react';
import './Home.css'
import '../liver/Liver'

const Home = () => {
    const navigate = useNavigate();

    const handleClick = useCallback ( () => {
        navigate("/higado", {
            state: { userData: { displayName: "Jean Paul"}}
        });
    }, [navigate]);

    return(
        <div> 
            <h1>Inicio</h1>
            <button onClick = {handleClick}> Enfermedades </button>
        </div>
    );
};

export default Home;