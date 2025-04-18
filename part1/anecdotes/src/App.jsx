import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVoted] = useState(Array(anecdotes.length).fill(0))

  const setToSelected = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    console.log('previous anecdote:', selected + 1, '- next anecdote:', random + 1)
    setSelected(random)
  }

  const setToVoted = () => {
    const updatedVotes = [...votes]
    updatedVotes[selected] += 1
    console.log('increasing votes from', votes[selected],
                'to', updatedVotes[selected],
                'for anecdote', selected + 1)
    console.log('updated votes:', updatedVotes)
    setVoted(updatedVotes)
  }

  const mostVotes = Math.max( ...votes )
  const mostVotedIndex = votes.indexOf(mostVotes)
  console.log('anecdote', mostVotedIndex + 1, 'has most votes:', mostVotes)

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={setToVoted}>
        vote
      </button>
      <button onClick={setToSelected}>
        next anecdote
      </button>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[mostVotedIndex]}</p>
      <p>has {votes[mostVotedIndex]} votes</p>
    </div>
  )
}

export default App
