import * as React from "react"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material"
import { useFinance } from "@/contexts/finance-context"

interface AddTransactionProps {
  open: boolean
  onClose: () => void
}

export const AddTransaction: React.FC<AddTransactionProps> = ({ open, onClose }) => {
  const { addTransaction } = useFinance()
  const [amount, setAmount] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [category, setCategory] = React.useState("")
  const [type, setType] = React.useState<"income" | "expense">("expense")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addTransaction({
      amount: Number.parseFloat(amount),
      description,
      category,
      type,
      date: new Date().toISOString(),
    })
    onClose()
    setAmount("")
    setDescription("")
    setCategory("")
    setType("expense")
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Transaction</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Category"
            type="text"
            fullWidth
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value as "income" | "expense")} required>
              <MenuItem value="income">Income</MenuItem>
              <MenuItem value="expense">Expense</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

