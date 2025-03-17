import { useState } from 'react'

const Display = props => (
  <div>{props.type}: {props.value}</div>
)

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const giveFeedback = (type) => {
    console.log('new', type, 'feedback')
    if (type === 'good') {
      setGood(good + 1)
    } else if (type === 'neutral') {
      setNeutral(neutral + 1)
    } else if (type === 'bad') {
      setBad(bad + 1)
    } else {
      console.log('invalid feedback')
    }
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => giveFeedback('good')} text='good' />
      <Button onClick={() => giveFeedback('neutral')} text='neutral' />
      <Button onClick={() => giveFeedback('bad')} text='bad' />
      <h1>statistics</h1>
      <Display type={'good'} value={good} />
      <Display type={'neutral'} value={neutral} />
      <Display type={'bad'} value={bad} />
    </div>
  )
}

export default App
