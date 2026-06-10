import { useState } from 'react'
import type { Transaction, Category, TransactionType } from '../types'

const CATEGORIES: Category[] = [
  'Food & Dining','Transport','Housing','Entertainment',
  'Health','Shopping','Savings','Income','Other'
]

interface Props {
  onAdd: (t: Transaction) => void
  onClose: () => void
}

export default function TransactionForm({ onAdd, onClose }: Props) {
  const [description, setDescription] = useState('')
  const [amount, setAmount]           = useState('')
  const [type, setType]               = useState<TransactionType>('expense')
  const [category, setCategory]       = useState<Category>('Food & Dining')
  const [date, setDate]               = useState(new Date().toISOString().slice(0, 10))

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!description || !amount) return
    onAdd({
      id: Date.now().toString(),
      description,
      amount: parseFloat(amount),
      type,
      category,
      date,
    })
    onClose()
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '9px 12px', borderRadius: 8,
    border: '1px solid #e2e8f0', fontSize: 14, outline: 'none',
    background: '#f8fafc', boxSizing: 'border-box',
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
    }}>
      <form onSubmit={handleSubmit} style={{
        background: 'white', borderRadius: 16, padding: 28, width: 380,
        boxShadow: '0 20px 60px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', gap: 14,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: 17 }}>Add Transaction</h3>
          <button type="button" onClick={onClose}
            style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#94a3b8' }}>
            ×
          </button>
        </div>

        {/* Type toggle */}
        <div style={{ display: 'flex', gap: 8 }}>
          {(['expense','income'] as TransactionType[]).map(t => (
            <button key={t} type="button" onClick={() => setType(t)} style={{
              flex: 1, padding: '8px 0', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600,
              fontSize: 13, transition: 'all .15s',
              background: type === t ? (t === 'expense' ? '#ef4444' : '#22c55e') : '#f1f5f9',
              color: type === t ? 'white' : '#64748b',
            }}>
              {t === 'expense' ? '↓ Expense' : '↑ Income'}
            </button>
          ))}
        </div>

        <input style={inputStyle} placeholder="Description" value={description}
          onChange={e => setDescription(e.target.value)} required />

        <input style={inputStyle} type="number" placeholder="Amount" min="0.01" step="0.01"
          value={amount} onChange={e => setAmount(e.target.value)} required />

        <select style={inputStyle} value={category} onChange={e => setCategory(e.target.value as Category)}>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>

        <input style={inputStyle} type="date" value={date} onChange={e => setDate(e.target.value)} />

        <button type="submit" style={{
          padding: '11px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
          background: '#3b82f6', color: 'white', fontWeight: 700, fontSize: 15,
        }}>
          Add Transaction
        </button>
      </form>
    </div>
  )
}
