// npm modules
import { useState } from "react"

// components
import CategoryDropdown from "../../components/CategoryDropdown/CategoryDropdown"

// css
import styles from "./NewTrivia.module.css"

const NewTrivia = ({ handleAddTrivia }) => {
  const [triviaFormData, setTriviaFormData] = useState({
    title: "",
    category: "All",
    questions: [
      {
        text: "",
        choices: [
          {
            text: "",
            answer: false,
          },
        ],
        correctAnswerIndex: "",
      },
    ],
  })

  const handleSaveTrivia = (evt) => {
    evt.preventDefault()
    const triviaData = { ...triviaFormData }
    handleAddTrivia(triviaData)
  }

  const handleQuestionChange = (index, question) => {
    const updatedQuestions = [...triviaFormData.questions]
    updatedQuestions[index] = question
    setTriviaFormData({ ...triviaFormData, questions: updatedQuestions })
  }

  const handleAddQuestion = () => {
    setTriviaFormData({
      ...triviaFormData,
      questions: [...triviaFormData.questions, { text: "", choices: [] }],
    })
  }

  const handleDeleteChoice = (questionIndex, choiceIndex) => {
    const updatedQuestions = [...triviaFormData.questions]
    updatedQuestions[questionIndex].choices.splice(choiceIndex, 1)
    setTriviaFormData({
      ...triviaFormData,
      questions: updatedQuestions,
    })
  }

  const handleDeleteQuestion = (questionIndex) => {
    const updatedQuestions = [...triviaFormData.questions]
    updatedQuestions.splice(questionIndex, 1)
    setTriviaFormData({
      ...triviaFormData,
      questions: updatedQuestions,
    })
  }
  if (!triviaFormData) return <h1>Loading</h1>

  return (
    <main className={styles.container}>
      <h1>New Trivia!</h1>
      <form onSubmit={handleSaveTrivia} className={styles.entireform}>
        <label htmlFor="title">Trivia Title:</label>
        <input
          type="text"
          id="title"
          autoComplete="off"
          value={triviaFormData.title}
          onChange={(e) =>
            setTriviaFormData({
              ...triviaFormData,
              title: e.target.value,
            })
          }
        />
        <label htmlFor="category-input">Category</label>
        <CategoryDropdown
          value={triviaFormData.category}
          onChange={(e) =>
            setTriviaFormData({
              ...triviaFormData,
              category: e.target.value,
            })
          }
        />
        {triviaFormData.questions.map((question, questionIndex) => (
          <div key={questionIndex} className={styles["new-trivia-form"]}>
            <label htmlFor={`question-${questionIndex}`}>Question:</label>
            <input
              type="text"
              id={`question-${questionIndex}`}
              autoComplete="off"
              value={question.text}
              onChange={(e) =>
                handleQuestionChange(questionIndex, {
                  ...question,
                  text: e.target.value,
                })
              }
            />
            <button
              type="button"
              className={styles["delete-question-button"]}
              onClick={() => handleDeleteQuestion(questionIndex)}
            >
              Delete Question
            </button>
            {question.choices.map((choice, choiceIndex) => (
              <div key={choiceIndex}>
                <label htmlFor={`choice-${questionIndex}-${choiceIndex}`}>
                  Choice {choiceIndex + 1}:
                </label>
                <input
                  type="text"
                  id={`choice-${questionIndex}-${choiceIndex}`}
                  autoComplete="off"
                  value={choice.text}
                  onChange={(e) => {
                    const updatedQuestions = [...triviaFormData.questions]
                    updatedQuestions[questionIndex].choices[choiceIndex].text =
                      e.target.value
                    setTriviaFormData({
                      ...triviaFormData,
                      questions: updatedQuestions,
                    })
                  }}
                />
                <label
                  htmlFor={`correct-answer-${questionIndex}-${choiceIndex}`}
                >
                  Correct answer:
                </label>
                <input
                  type="checkbox"
                  className="checkbox"
                  id={`correct-answer-${questionIndex}-${choiceIndex}`}
                  checked={question.correctAnswerIndex === choiceIndex}
                  onChange={(e) => {
                    const updatedQuestions = [...triviaFormData.questions]
                    updatedQuestions[questionIndex].correctAnswerIndex = e
                      .target.checked
                      ? choiceIndex
                      : 1
                    updatedQuestions[questionIndex].choices.map(
                      (choice, idx) =>
                        (choice.answer =
                          idx === (e.target.checked ? choiceIndex : 1)
                            ? true
                            : false)
                    )
                    setTriviaFormData({
                      ...triviaFormData,
                      questions: updatedQuestions,
                    })
                  }}
                />
                <button
                  type="button"
                  className={styles["delete-choice-button"]}
                  onClick={() => handleDeleteChoice(questionIndex, choiceIndex)}
                >
                  Delete Choice
                </button>
              </div>
            ))}
            <button
              type="button"
              className={styles["add-choice-button"]}
              onClick={() => {
                const updatedQuestions = [...triviaFormData.questions]
                updatedQuestions[questionIndex].choices.push({
                  text: "",
                  answer: false,
                })
                setTriviaFormData({
                  ...triviaFormData,
                  questions: updatedQuestions,
                })
              }}
            >
              Add Choice
            </button>
            <button
              type="button"
              className={styles["add-question-button"]}
              onClick={handleAddQuestion}
            >
              Add Question
            </button>
          </div>
        ))}
        <button type="submit" className={styles["submit-button"]}>
          Submit
        </button>
      </form>
    </main>
  )
}

export default NewTrivia
