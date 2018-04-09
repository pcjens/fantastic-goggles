import React from 'react';
import ReactDOM from 'react-dom';

const incrementState = (name, stateHolder) => {
  return () => {
    stateHolder.setState((prevState) => {
      const newState = {...prevState}
      newState[name]++
      return newState
    })
  }
}

const Button = (props) => {
  const name = props.name
  const onClick = incrementState(name, props.stateHolder)

  return (
    <button onClick={onClick}>{name}</button>
  )
}

const Statistic = (props) => {
  const name = props.name
  const statistic = props.stateHolder.getStatFormatted(props.name)

  return (
    <p>{name} {statistic}</p>
  )
}

const Statistics = (props) => {
  const stateHolder = props.stateHolder

  return (
    <div>
      <Statistic name="hyvä" stateHolder={stateHolder} />
      <Statistic name="neutraali" stateHolder={stateHolder} />
      <Statistic name="huono" stateHolder={stateHolder} />
      <Statistic name="keskiarvo" stateHolder={stateHolder} />
      <Statistic name="positiivisia" stateHolder={stateHolder} />
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

  getStatFormatted(stat) {
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
        <Button name="hyvä" stateHolder={this} />
        <Button name="neutraali" stateHolder={this} />
        <Button name="huono" stateHolder={this} />

        <h2>Statistiikka</h2>
        <Statistics stateHolder={this} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
