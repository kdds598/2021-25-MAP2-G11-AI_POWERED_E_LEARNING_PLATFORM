
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../Styles/Quiz.module.css';

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const quizData = location.state?.status?.mcqs || [];

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleOptionChange = (questionIndex, option) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const getScore = () => {
    let score = 0;
    quizData.forEach((q, index) => {
      if (selectedAnswers[index] === q.correct_answer) {
        score += 1;
      }
    });
    return score;
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Quiz</h2>

      {submitted ? (
        <div className="text-center">
          <p className={styles.score}>Your Score: {getScore()} / {quizData.length}</p>
          <button
            onClick={() => navigate(-1)}
            className={styles.returnBtn}
          >
            Return
          </button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className={styles.quizBody}>
            {quizData.map((q, index) => (
              <div key={index} className={styles.questionBlock}>
                <p className={styles.questionText}>{index + 1}. {q.question}</p>
                <div>
                  {Object.entries(q.options).map(([key, value]) => (
                    <label key={key} className={styles.optionLabel}>
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={key}
                        checked={selectedAnswers[index] === key}
                        onChange={() => handleOptionChange(index, key)}
                      />
                      {key}. {value}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button type="submit" className={styles.submitBtn}>
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Quiz;
