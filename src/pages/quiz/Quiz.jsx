import { useCallback } from 'react';
import './Quiz.css'
import useQuizStore from '../../stores/use-quiz-store';

const Quiz = () => {
    const { quiz, incrementQuizProgress } = useQuizStore();

    const handleQuizNext = useCallback(() => {
        incrementQuizProgress();
    }, [incrementQuizProgress])

    return(
        <div>
            <h1>Quiz</h1>
            <span>Progreso del quiz: {quiz.percentageQuizCompleted} % </span>
            <button onClick={handleQuizNext}>siguiente</button>
        </div>
    )
}

export default Quiz;