import { useState } from 'react'

const Head = ({ text, anecdote, vote }) => {
  return (
    <>
      <h1>{text}</h1>
      <div>{anecdote}</div>
      <div>has {vote} votes</div>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))
  const [max, setMax] = useState(0)
  const handleClick = () => {
    let newState = selected
    while (newState === selected) {
      newState = Math.floor(Math.random() * anecdotes.length)
    }
    setSelected(newState)
  }

  const handleVote = () => {
    const temp = { ...votes }
    temp[selected] += 1
    if (temp[selected] > votes[max]) {
      setMax(selected)
    }
    setVotes(temp)
  }

  return (
    <>
      <Head
        text="Anecdote of the day"
        anecdote={anecdotes[selected]}
        vote={votes[selected]}
      />
      <button onClick={handleVote}>vote</button>
      <button onClick={handleClick}>next anecdote</button>
      <Head
        text="Anecdote with most votes"
        anecdote={anecdotes[max]}
        vote={votes[max]}
      />
    </>
  )
}

export default App