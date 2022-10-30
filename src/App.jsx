import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [players, setPlayers] = useState([])
  const [name, setName] = useState("")
  const [numOfTeams, setNumOfTeams] = useState()
  const [teams, setTeams] = useState([])

  const teamsPerLine = Math.ceil(players.length / numOfTeams)

  const handleEnter = () => {
    setPlayers([...players, name.charAt(0).toUpperCase() + name.slice(1)])
    setName("")
  } 

  const handleKeyEnterUp = e => {
    if(e.key === "Enter") {
      handleEnter()
    } return;
  }

  const removePlayer = async player => {
    setPlayers(players.filter(val => val !== player))
  }

  const makeTeams = () => {
    let array = [...players]
    for (var i = array.length - 1; i > 0; i--) {

      // Generate random number
      var j = Math.floor(Math.random() * (i + 1));

      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    

    const result = [] //we create it, then we'll fill it

    for(let i = 0; i < numOfTeams; i++) {
      result.push([])
    }
    // console.log("TEAMS PER LINE ->", teamsPerLine)
    for (let line = 0; line < numOfTeams; line++) {
      for (let i = 0; i < teamsPerLine; i++) {
        const value = array[i + line * teamsPerLine]
        if (!value) continue //avoid adding "undefined" values
        result[line].push(value)
      }
    }
    setTeams(result)
    console.log(result)
  }

  const teamColours = ['red', "blue", "green", "yellow", "purple", "orange", "pink", "white"]
  
  return (
    <div>
      <h1>Olly's Team Maker</h1>
      <div>
        <ul style={{ fontSize: "30px", display: "flex", flexDirection: "column", gap: "1rem", listStyleType: "none" }}>
          {teams.map((team, i) => (
            <li key={i} style={{ color: teamColours[i] }}>
            {/* {team.map((player) => (
              <span>{player}, </span>
            ))} */}
              Team {teamColours[i].charAt(0).toUpperCase() + teamColours[i].slice(1)}: {team.join(", ")}
            </li>
          ))}
        </ul>
      </div>
      <ul style={{ display: "flex", flexDirection: "column", gap: "1rem", listStyleType: "none", padding: "0" }}>
        {players.map((player, num) => (
          <li key={num} value={player} style={{ display: "flex", justifyContent: "space-between", fontSize: "30px" }}>- {player} <button onClick={() => removePlayer(player)} style={{ fontSize: "10px", backgroundColor: "red" }}>remove</button></li>
        ))}
      </ul>
      <div style={{ display: "flex", gap: "0.5rem", width: "100%", height: "4rem" }}>
        <input onChange={(e) => setName(e.target.value)} value={name} onKeyDown={handleKeyEnterUp} style={{ fontSize: "30px", width: "100%", borderRadius: "8px", border: "3px solid white" }} label="hello" placeholder="Enter a name" />
        <button onClick={() => handleEnter()} style={{ border: "3px solid white" }}>Enter</button>
      </div>
      <label>Number of Teams </label>
      <select onChange={(e) => setNumOfTeams(e.target.value)}>
        {players.map((player, num) => (
          <option key={num} value={num + 1}>{num + 1}</option>
        ))}
      </select>
      <button onClick={makeTeams}>Make Teams</button>
    </div>
  )
}

export default App
