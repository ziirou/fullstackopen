import { useState } from 'react'

const Display = props => (
  <div>{props.statistic}: {props.value}</div>
)

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const Statistics = ({ good, neutral, bad }) => {
  let total = good + neutral + bad
  let average = (good - bad) / total || 0
  let positive = (good / total) * 100 || 0

  return (
    <div>
      <Display statistic={'good'} value={good} />
      <Display statistic={'neutral'} value={neutral} />
      <Display statistic={'bad'} value={bad} />
      <Display statistic={'all'} value={total} />
      <Display statistic={'average'} value={average} />
      <Display statistic={'positive'} value={positive + ' %'} />
    </div>
  )
}

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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
