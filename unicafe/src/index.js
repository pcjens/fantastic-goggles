import React from 'react';
import ReactDOM from 'react-dom';

const incrementState = (name, stats) => {
  return () => {
    stats.setState((prevState) => {
      const newState = {...prevState}
      newState[name]++
      return newState
    })
  }
}

const Button = (props) => {
  const name = props.name
  const onClick = incrementState(name, props.stats)

  return (
    <button onClick={onClick}>{name}</button>
  )
}

const Statistic = (props) => {
  const name = props.name
  const count = props.stats.getStat(props.name)

  return (
    <p>{name} {count}</p>
  )
}

const Statistics = (props) => {
  const stats = props.stats

  return (
    <div>
      <Statistic name="hyvä" stats={stats} />
      <Statistic name="neutraali" stats={stats} />
      <Statistic name="huono" stats={stats} />
      <Statistic name="keskiarvo" stats={stats} />
      <Statistic name="positiivisia" stats={stats} />
    </div>
  )
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      "hyvä": 0,
      "neutraali": 0,
      "huono": 0
    }
  }

  getCount() {
    return this.state["hyvä"] + this.state["neutraali"] + this.state["huono"]
  }

  getAvg() {
    const sum = this.state["hyvä"] - this.state["huono"]
    const count = this.getCount()
    return sum / count
  }

  getStat(stat) {
    if (stat === "keskiarvo") {
      return this.getAvg().toFixed(1)
    } else if (stat === "positiivisia") {
      return (this.state["hyvä"] / this.getCount() * 100).toFixed(1) + " %"
    } else {
      return this.state[stat]
    }
  }

  render() {
    return (
      <div>
        <h2>Anna palautetta</h2>
        <Button name="hyvä" stats={this} />
        <Button name="neutraali" stats={this} />
        <Button name="huono" stats={this} />

        <h2>Statistiikka</h2>
        <Statistics stats={this} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
