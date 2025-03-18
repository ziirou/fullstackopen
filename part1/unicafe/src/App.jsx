import { useState } from 'react'

const StatisticLine = ({ text, value }) => {
  if (text === 'positive') {
    return (
      <tr>
        <td>{text}:</td>
        <td>{value} %</td>
      </tr>
    )
  }

  return (
    <tr>
      <td>{text}:</td>
      <td>{value}</td>
    </tr>
  )
}

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return <div>No feedback given</div>
  }

  let total = good + neutral + bad
  let average = (good - bad) / total || 0
  let positive = (good / total) * 100 || 0

  return (
    <table>
      <tbody>
        <StatisticLine text={'good'} value={good} />
        <StatisticLine text={'neutral'} value={neutral} />
        <StatisticLine text={'bad'} value={bad} />
        <StatisticLine text={'all'} value={total} />
        <StatisticLine text={'average'} value={average} />
        <StatisticLine text={'positive'} value={positive} />
      </tbody>
    </table>
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
