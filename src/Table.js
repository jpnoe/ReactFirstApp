import React, { Component } from 'react'

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Job</th>
        <th>ID</th>
      </tr>
    </thead>
  )
}

const TableBody = props => {
  const rows = props.characterData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.name}</td>
        <td>{row.job}</td>
        <td>{row.id}</td>
        <td>
          <button onClick={() => props.remove(row, index)}>Delete</button>
        </td>
      </tr>)
  })

  return <tbody>{rows}</tbody>
}

const Table = props => {
  const { characterData, remove } = props

  return (
    <table>
      <TableHeader />
      <TableBody characterData={characterData} remove={remove} />
    </table>
  )
}

export default Table
