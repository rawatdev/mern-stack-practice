import { useState } from "react"

function App() {
  const [form, setForm] = useState({
    amount: 0,
    description: "",
    date: "",
  })

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch("http://localhost:5000/transaction", {
      method: "POST",
      body: form,
    })

    const data = await response.json()

    console.log(data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="amount"
          value={form.amount}
          onChange={handleInput}
          type="number"
          placeholder="Enter transaction amount"
        />
        <input
          name="description"
          type="text"
          placeholder="Enter transaction details"
        />
        <input name="date" type="date" />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default App
