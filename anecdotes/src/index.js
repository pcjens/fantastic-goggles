import React from 'react'
import ReactDOM from 'react-dom'

const MostVoted = (props) => {
  const mostVotedSelection = (votes) => {
    let highestIndex = -1
    let highestVotes = 0
    for (let i = 0; i < votes.length; i++) {
      if (votes[i] > highestVotes) {
        highestVotes = votes[i]
        highestIndex = i
      }
    }
    return highestIndex
  }

  const mvs = mostVotedSelection(props.votes)
  const mostVotes = props.votes[mvs]
  const mostVotedAnecdote = props.anecdotes[mvs]

  if (mostVotes > 0) {
    return (
      <div>
        <h2>Anecdote with most votes:</h2>
        <p>{mostVotedAnecdote}</p>
        <p>has {mostVotes} votes</p>
      </div>
    )
  } else {
    return (
      <div>
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: []
    }
  }

  reselect = () => {
    this.setState({selected: Math.floor(Math.random() * anecdotes.length)})
  }

  vote = (selection) => () => {
    this.setState((prevState) => {
      const newState = {...prevState}
      if (newState.votes[selection] === undefined) {
        newState.votes[selection] = 0
      }
      newState.votes[selection]++
      return newState
    })
  }


  render() {
    const selection = this.state.selected
    const anecdotes = this.props.anecdotes
    const selectedAnecdote = anecdotes[selection]
    const votes = this.state.votes
    const selectedVotes = this.state.votes[selection] || 0

    return (
      <div>
        <p>{selectedAnecdote}</p>
        <p>has {selectedVotes} votes</p>
        <button onClick={this.vote(selection)}>vote</button>
        <button onClick={this.reselect}>next anecdote</button>
        <MostVoted votes={votes} anecdotes={anecdotes}/>
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
