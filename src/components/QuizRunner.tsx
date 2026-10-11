'use client'

import { useState } from 'react'

type Question = {
  question: string
  options: { label: string }[]
  correctOption: number
  explanation: string
}

export function QuizRunner({ questions }: { questions: Question[] }) {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const score = questions.reduce((total, question, index) => total + (answers[index] === question.correctOption ? 1 : 0), 0)
  const complete = questions.every((_, index) => answers[index] !== undefined)

  return (
    <form className="quiz-runner" onSubmit={(event) => { event.preventDefault(); if (complete) setSubmitted(true) }}>
      {questions.map((question, questionIndex) => (
        <fieldset className="quiz-question" key={`${questionIndex}-${question.question}`}>
          <legend>{questionIndex + 1}. {question.question}</legend>
          <div className="quiz-options">
            {question.options.map((option, optionIndex) => {
              const correct = submitted && optionIndex === question.correctOption
              const incorrect = submitted && answers[questionIndex] === optionIndex && !correct
              return <label className={`quiz-option${correct ? ' is-correct' : ''}${incorrect ? ' is-incorrect' : ''}`} key={`${optionIndex}-${option.label}`}>
                <input type="radio" name={`question-${questionIndex}`} value={optionIndex} checked={answers[questionIndex] === optionIndex} disabled={submitted} onChange={() => setAnswers((current) => ({ ...current, [questionIndex]: optionIndex }))} />
                <span>{option.label}</span>
              </label>
            })}
          </div>
          {submitted && <p className="quiz-explanation">{question.explanation}</p>}
        </fieldset>
      ))}
      {submitted ? <div className="quiz-result" role="status"><strong>আপনার ফল: {score}/{questions.length}</strong><button className="button button-small" type="button" onClick={() => { setAnswers({}); setSubmitted(false) }}>আবার চেষ্টা করুন</button></div> : <div className="quiz-submit"><button className="button" type="submit" disabled={!complete}>উত্তর মিলিয়ে দেখুন</button>{!complete && <span>সব প্রশ্নের উত্তর নির্বাচন করুন।</span>}</div>}
    </form>
  )
}
