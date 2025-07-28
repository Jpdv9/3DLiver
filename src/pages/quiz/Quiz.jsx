import { useCallback, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';
import './Quiz.css'
import useQuizStore from '../../stores/use-quiz-store';

// 3D Liver Progress Model Component
function LiverProgressModel({ correctAnswers, totalQuestions }) {
    const progressPercentage = (correctAnswers / totalQuestions) * 100;
    
    // Always use healthy liver model
    const { scene } = useGLTF("/modelos/Liver/healthy-liver.glb");
    
    // Calculate opacity based on correct answers (starts at 10%, increases 22.5% per correct answer)
    const opacity = correctAnswers === 0 ? 0.1 : Math.min(0.1 + (correctAnswers / totalQuestions) * 0.9, 1.0);

    // Apply opacity to all materials in the model
    scene.traverse((child) => {
        if (child.isMesh && child.material) {
            child.material.transparent = true;
            child.material.opacity = opacity;
            child.material.needsUpdate = true;
        }
    });

    const getProgressMessage = () => {
        if (correctAnswers === 0) return "Responde correctamente para revelar tu hígado sano";
        if (correctAnswers === 1) return "¡Excelente! Primera parte del hígado revelada";
        if (correctAnswers === 2) return "¡Sigue así! El hígado se ve cada vez mejor";
        if (correctAnswers === 3) return "¡Increíble! 30% del hígado ya es visible";
        if (correctAnswers === 4) return "¡Fantástico! Casi la mitad del hígado revelado";
        if (correctAnswers === 5) return "¡Perfecto! 50% del hígado sano descubierto";
        if (correctAnswers === 6) return "¡Excelente progreso! 60% del hígado visible";
        if (correctAnswers === 7) return "¡Magnífico! 70% del hígado ya es visible";
        if (correctAnswers === 8) return "¡Casi terminamos! 80% del hígado revelado";
        if (correctAnswers === 9) return "¡Solo una más! 90% del hígado descubierto";
        return "¡Felicidades! Hígado 100% sano completamente revelado";
    };

    return (
        <>
            <ambientLight intensity={0.8} />
            <directionalLight position={[2, 5, 2]} intensity={1.2} />
            <pointLight position={[-2, 3, -1]} intensity={0.6} color="#228B22" />
            <spotLight position={[0, 5, 0]} intensity={0.8} angle={0.3} penumbra={0.2} />
            
            <primitive 
                object={scene} 
                scale={9} 
                position={[0, -0.5, 0]}
                rotation={[0, Math.PI / 4, 0]}
            />
            
            {/* Progress indicator */}
            <Html position={[0, -3.5, 0]} center>
                <div className="liver-progress-indicator">
                    <div className="progress-circle">
                        <div 
                            className="progress-fill-circle"
                            style={{
                                background: `conic-gradient(#228B22 ${progressPercentage * 3.6}deg, rgba(255,255,255,0.2) 0deg)`
                            }}
                        >
                            <div className="progress-inner">
                                <span className="progress-text">{Math.round(progressPercentage)}%</span>
                            </div>
                        </div>
                    </div>
                    <p className="progress-message">{getProgressMessage()}</p>
                </div>
            </Html>
        </>
    );
}

const Quiz = () => {
    const { quiz, incrementQuizProgress, clearQuiz } = useQuizStore();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [userAnswers, setUserAnswers] = useState([]);
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

    // Quiz questions about liver diseases
    const questions = [
        {
            id: 1,
            question: "¿Cuál es la principal causa del hígado graso?",
            options: [
                "Consumo excesivo de alcohol",
                "Dieta alta en grasas saturadas y azúcares",
                "Infección viral",
                "Medicamentos"
            ],
            correctAnswer: 1,
            explanation: "El hígado graso no alcohólico es principalmente causado por una dieta alta en grasas saturadas, azúcares refinados y un estilo de vida sedentario."
        },
        {
            id: 2,
            question: "¿Qué síntoma es común en la cirrosis hepática?",
            options: [
                "Dolor de cabeza intenso",
                "Ictericia (coloración amarilla de la piel)",
                "Fiebre alta constante",
                "Pérdida de memoria"
            ],
            correctAnswer: 1,
            explanation: "La ictericia es un síntoma característico de la cirrosis, causada por la acumulación de bilirrubina en el organismo debido al mal funcionamiento del hígado."
        },
        {
            id: 3,
            question: "¿Cuál es el mejor tratamiento para el hígado graso?",
            options: [
                "Medicamentos específicos",
                "Cirugía inmediata",
                "Cambios en el estilo de vida",
                "Reposo absoluto"
            ],
            correctAnswer: 2,
            explanation: "El tratamiento más efectivo para el hígado graso incluye ejercicio regular, dieta saludable, pérdida de peso gradual y evitar el alcohol."
        },
        {
            id: 4,
            question: "¿Qué tipo de hepatitis se transmite principalmente por vía sexual?",
            options: [
                "Hepatitis A",
                "Hepatitis B",
                "Hepatitis C",
                "Hepatitis E"
            ],
            correctAnswer: 1,
            explanation: "La Hepatitis B se transmite principalmente por contacto sexual, sangre contaminada y de madre a hijo durante el parto."
        },
        {
            id: 5,
            question: "¿Cuál es la función principal del hígado en el cuerpo?",
            options: [
                "Bombear sangre",
                "Desintoxicar sustancias nocivas",
                "Producir insulina",
                "Regular la temperatura corporal"
            ],
            correctAnswer: 1,
            explanation: "El hígado es el principal órgano de desintoxicación del cuerpo, procesa toxinas, medicamentos y produce bilis para la digestión."
        },
        {
            id: 6,
            question: "¿Qué alimentos son especialmente dañinos para el hígado?",
            options: [
                "Frutas y verduras",
                "Pescado y pollo",
                "Alimentos procesados y azúcar refinada",
                "Legumbres y cereales"
            ],
            correctAnswer: 2,
            explanation: "Los alimentos procesados, el azúcar refinada y las grasas trans pueden sobrecargar el hígado y contribuir al hígado graso."
        },
        {
            id: 7,
            question: "¿Cuánto alcohol es considerado seguro para el hígado?",
            options: [
                "Una copa diaria para todos",
                "Varía según peso y género",
                "No hay límite seguro establecido",
                "Solo los fines de semana"
            ],
            correctAnswer: 1,
            explanation: "El consumo 'seguro' de alcohol varía según el peso corporal, género y salud individual. Las mujeres generalmente tienen menor tolerancia que los hombres."
        },
        {
            id: 8,
            question: "¿Qué vitamina es especialmente importante para la salud hepática?",
            options: [
                "Vitamina C",
                "Vitamina D",
                "Vitamina E",
                "Vitamina K"
            ],
            correctAnswer: 2,
            explanation: "La vitamina E es un potente antioxidante que ayuda a proteger las células hepáticas del daño oxidativo y la inflamación."
        },
        {
            id: 9,
            question: "¿Cuál es un signo temprano de problemas hepáticos?",
            options: [
                "Dolor en el pecho",
                "Fatiga y debilidad constante",
                "Dolor de rodillas",
                "Pérdida de audición"
            ],
            correctAnswer: 1,
            explanation: "La fatiga y debilidad son signos tempranos comunes de problemas hepáticos, ya que el hígado no puede procesar toxinas eficientemente."
        },
        {
            id: 10,
            question: "¿Qué ejercicio es más beneficioso para la salud del hígado?",
            options: [
                "Solo ejercicios de fuerza",
                "Solo ejercicios de estiramiento",
                "Combinación de cardio y fuerza",
                "No es necesario hacer ejercicio"
            ],
            correctAnswer: 2,
            explanation: "Una combinación de ejercicio cardiovascular y entrenamiento de fuerza es ideal para reducir la grasa hepática y mejorar la función del hígado."
        }
    ];

    const handleAnswerSelect = (answerIndex) => {
        setSelectedAnswer(answerIndex);
    };

    const handleNextQuestion = useCallback(() => {
        if (selectedAnswer === null) return;

        const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
        const newAnswer = {
            questionId: questions[currentQuestion].id,
            selectedAnswer,
            isCorrect,
            question: questions[currentQuestion].question
        };

        setUserAnswers(prev => [...prev, newAnswer]);
        setShowExplanation(true);

        // Update correct answers count for liver model progress
        if (isCorrect) {
            setCorrectAnswersCount(prev => prev + 1);
        }

        // Update quiz progress
        incrementQuizProgress();

        setTimeout(() => {
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(prev => prev + 1);
                setSelectedAnswer(null);
                setShowExplanation(false);
            } else {
                setQuizCompleted(true);
            }
        }, 3000);
    }, [selectedAnswer, currentQuestion, questions, incrementQuizProgress]);

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setShowExplanation(false);
        setQuizCompleted(false);
        setUserAnswers([]);
        setCorrectAnswersCount(0);
        clearQuiz();
    };

    const getScore = () => {
        return userAnswers.filter(answer => answer.isCorrect).length;
    };

    const getScoreMessage = () => {
        const score = getScore();
        const percentage = (score / questions.length) * 100;
        
        if (percentage >= 80) return "¡Excelente! Tienes un gran conocimiento sobre salud hepática.";
        if (percentage >= 60) return "¡Bien hecho! Tienes buenos conocimientos básicos.";
        if (percentage >= 40) return "No está mal, pero podrías aprender un poco más.";
        return "Te recomendamos revisar más información sobre salud hepática.";
    };

    if (quizCompleted) {
        return (
            <div className="quiz-container">
                <div className="quiz-completed">
                    <h1>🎉 ¡Quiz Completado!</h1>
                    <div className="score-summary">
                        <h2>Tu puntuación: {getScore()}/{questions.length}</h2>
                        <div className="score-percentage">
                            {Math.round((getScore() / questions.length) * 100)}%
                        </div>
                        <p className="score-message">{getScoreMessage()}</p>
                    </div>
                    
                    <div className="answers-review">
                        <h3>Revisión de respuestas:</h3>
                        {userAnswers.map((answer, index) => (
                            <div key={answer.questionId} className={`answer-review ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
                                <span className="question-number">Pregunta {index + 1}:</span>
                                <span className="result-icon">{answer.isCorrect ? '✅' : '❌'}</span>
                            </div>
                        ))}
                    </div>
                    
                    <button className="restart-button" onClick={restartQuiz}>
                        🔄 Intentar de nuevo
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="quiz-container">
            <div className="quiz-header">
                <h1>Quiz de Salud Hepática</h1>
                <div className="progress-container">
                    <div className="progress-bar">
                        <div 
                            className="progress-fill" 
                            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                        ></div>
                    </div>
                    <span className="progress-text">
                        Pregunta {currentQuestion + 1} de {questions.length}
                    </span>
                </div>
            </div>

            {/* Main Quiz Layout - Side by Side */}
            <div className="quiz-main-layout">
                {/* 3D Liver Progress Model */}
                <div className="liver-model-container">
                    <Canvas
                        style={{ width: "100%", height: "100%", background: "transparent" }}
                        camera={{ position: [0, 2, 5], fov: 45 }}
                        gl={{ alpha: true, antialias: true }}
                    >
                        <OrbitControls 
                            enableZoom={false} 
                            enablePan={false}
                            autoRotate={true}
                            autoRotateSpeed={2}
                            maxPolarAngle={Math.PI / 2}
                            minPolarAngle={Math.PI / 3}
                        />
                        <LiverProgressModel 
                            correctAnswers={correctAnswersCount} 
                            totalQuestions={questions.length} 
                        />
                    </Canvas>
                </div>

                <div className="quiz-content">
                    <div className="question-container">
                        <h2 className="question-text">
                            {questions[currentQuestion].question}
                        </h2>
                        
                        <div className="options-container">
                            {questions[currentQuestion].options.map((option, index) => (
                                <button
                                    key={index}
                                    className={`option-button ${
                                        selectedAnswer === index ? 'selected' : ''
                                    } ${
                                        showExplanation 
                                            ? index === questions[currentQuestion].correctAnswer 
                                                ? 'correct' 
                                                : selectedAnswer === index 
                                                    ? 'incorrect' 
                                                    : ''
                                            : ''
                                    }`}
                                    onClick={() => handleAnswerSelect(index)}
                                    disabled={showExplanation}
                                >
                                    <span className="option-letter">
                                        {String.fromCharCode(65 + index)}
                                    </span>
                                    <span className="option-text">{option}</span>
                                </button>
                            ))}
                        </div>

                        {showExplanation && (
                            <div className="explanation-container">
                                <div className="explanation-header">
                                    <span className="explanation-icon">
                                        {selectedAnswer === questions[currentQuestion].correctAnswer ? '✅' : '❌'}
                                    </span>
                                    <h3>
                                        {selectedAnswer === questions[currentQuestion].correctAnswer 
                                            ? '¡Correcto!' 
                                            : 'Incorrecto'
                                        }
                                    </h3>
                                </div>
                                <p className="explanation-text">
                                    {questions[currentQuestion].explanation}
                                </p>
                            </div>
                        )}

                        <div className="quiz-actions">
                            <button 
                                className="next-button"
                                onClick={handleNextQuestion}
                                disabled={selectedAnswer === null || showExplanation}
                            >
                                {currentQuestion === questions.length - 1 ? 'Finalizar Quiz' : 'Siguiente'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Quiz;