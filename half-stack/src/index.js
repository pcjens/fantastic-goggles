import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    const otsikko = props.name

    return (
      <h1>{otsikko}</h1>
    )
}

const Osa = (props) => {
  const osa = props.osa
  const tehtavat = props.tehtavat

  return (
      <p>{osa} {tehtavat}</p>
  )
}

const Sisalto = (props) => {
  const osa1 = props.osat[0][0]
  const osa2 = props.osat[1][0]
  const osa3 = props.osat[2][0]
  const tehtavia1 = props.osat[0][1]
  const tehtavia2 = props.osat[1][1]
  const tehtavia3 = props.osat[2][1]

  return (
    <div>
      <Osa osa={osa1} tehtavat={tehtavia1} />
      <Osa osa={osa2} tehtavat={tehtavia2} />
      <Osa osa={osa3} tehtavat={tehtavia3} />
    </div>
  )
}

const Yhteensa = (props) => {
  const lkm = props.lkm

  return (
    <p>yhteensä {lkm} tehtävää</p>
  )
}

const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys'
  const osa1 = 'Reactin perusteet'
  const tehtavia1 = 10
  const osa2 = 'Tiedonvälitys propseilla'
  const tehtavia2 = 7
  const osa3 = 'Komponenttien tila'
  const tehtavia3 = 14

  return (
    <div>
      <Otsikko name={kurssi} />
      <Sisalto osat={[[osa1, tehtavia1], [osa2, tehtavia2], [osa3, tehtavia3]]} />
      <Yhteensa lkm={tehtavia1 + tehtavia2 + tehtavia3} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
