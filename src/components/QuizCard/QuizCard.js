import React from 'react'

function QuizCard({q}) {
  return (
    <>
        <div>
            <span>q1</span>
            <span>{q.views} 👁️</span>
            <p>created on {q.createdOn}</p>
        </div>
    </>
  )
}

export default QuizCard