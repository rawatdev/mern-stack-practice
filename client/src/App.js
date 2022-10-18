import { useEffect, useState } from "react"
import Button from "@mui/material/Button"

const initialForm = {
  amount: 0,
  description: "",
  date: "",
}

function App() {
  const [form, setForm] = useState(initialForm)

  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    fetchTransactions()
  }, [])

  async function fetchTransactions() {
    try {
      const res = await fetch("http://localhost:5000/transaction")
      const { data } = await res.json()

      setTransactions(data)
    } catch (err) {
      console.error("Error")
    }
  }

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch("http://localhost:5000/transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      fetchTransactions()
      setForm(initialForm)
    }
  }

  return (
    <div>
      <Button variant="contained">Hello World</Button>
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
          value={form.description}
          onChange={handleInput}
          type="text"
          placeholder="Enter transaction details"
        />
        <input
          name="date"
          value={form.date}
          onChange={handleInput}
          type="date"
        />
        <button type="submit">Submit</button>
      </form>
      <br />
      <section>
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Description</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={transaction._id}>
                <td>{transaction.amount}</td>
                <td>{transaction.description}</td>
                <td>{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default App
