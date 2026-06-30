import React, { useEffect, useState } from 'react'

const App = () => {

  const [usuarios, setUsuarios] = useState([]) 
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsuarios(data)
        setLoading(false)
      })
      .catch((error) =>{
         setError(error)
          setLoading(false)
      })

  }, [])

  return (
    <div>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>{usuario.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App