/* eslint-disable no-const-assign */

import { useRef, useState } from 'react'
import './Quiz.css'
import { data } from '../../Assets/data'


const Quiz = () => {
  
  const [index, setIndex] = useState(0)
  const [questions, setQuestions] = useState(data[index])
  const [lock, setLock] = useState(false)
  const [score, setScore] = useState(0)
  const [result, setResult] = useState(false)
  
  
  const option1 = useRef(null)
  const option2 = useRef(null)
  const option3 = useRef(null)
  const option4 = useRef(null)
  
  const option_array = [option1,option2,option3,option4]
  
  const checkAns = (e, index) => {
    if(lock === false){
      
      if (questions.ans == index) {
         e.target.classList.add('correct')
         setLock(true)
         setScore((prev)=> prev+1 ) 
      } else {
        e.target.classList.add('wrong')
        setLock(true)
        option_array[questions.ans-1].current.classList.add('correct')
      }
    }
  };
  
  const nextQuestion = () => {
    if(lock === true){
      if(index === data.length-1){
        setResult(true)
        return 0
      }
      setIndex((prev)=> prev + 1)
      setQuestions(data[index + 1]) 
      setLock(false)
      option_array.map((options)=> {
        options.current.classList.remove('correct', 'wrong')
      
        return null
      })
    }
  };
  
  const Reset = () => {
    setIndex(0)
    setQuestions(data[0])
    setScore(0)
    setLock(false)
    setResult(false)
  }
  
  
  
  
  return (
  
    <div className='container'>
      <h1>Quiz App</h1>
      <hr/>
      {
        
        result? <><h2>You Sccored {score} out of {data.length}</h2>
        <button onClick={Reset}>Reset</button></>:
       <>
        <h2>{index+1}: {questions.question}</h2>
      <ul>
        <li ref={option1} onClick={(e)=>{checkAns(e,1)}}>{questions.option1}</li>
        <li ref={option2} onClick={(e)=>{checkAns(e,2)}}>{questions.option2}</li>
        <li ref={option3} onClick={(e)=>{checkAns(e,3)}}>{questions.option3}</li>
        <li ref={option4} onClick={(e)=>{checkAns(e,4)}}>{questions.option4}</li>
      </ul>
      <button onClick={nextQuestion}>Next</button>
      <div className='index'>
        {score} of {data.length} questions
      </div>
      </>
      
      }
      
      
    </div>
  )
}

export default Quiz
