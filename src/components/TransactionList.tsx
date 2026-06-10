import type { Transaction } from '../types'
import { CATEGORY_COLORS } from '../data'
import { Trash2 } from 'lucide-react'
import { format } from 'date-fns'

interface Props {
  transactions: Transaction[]
  onDelete: (id: string) => void
}

export default function TransactionList({ transactions, onDelete }: Props) {
  const sorted = [...transactions].sort((a, b) => b.date.localeCompare(a.date))

  if (sorted.length === 0)
    return <p style={{ color: '#94a3b8', textAlign: 'center', padding: 32 }}>No transactions yet.</p>

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {sorted.map(t => (
        <div key={t.id} style={{
          display: 'flex', alignItems: 'center', gap: 12,
          background: 'white', borderRadius: 12, padding: '12px 16px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9',
        }}>
          {/* Category dot */}
          <div style={{
            width: 10, height: 10, borderRadius: '50%', flexShrink: 0,
            background: CATEGORY_COLORS[t.category] || '#94a3b8',
          }} />

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 600, fontSize: 14, color: '#1e293b',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {t.description}
            </div>
            <div style={{ fontSize: 12, color: '#94a3b8' }}>
              {t.category} · {format(new Date(t.date + 'T00:00:00'), 'MMM d, yyyy')}
            </div>
          </div>

          <div style={{
            fontWeight: 700, fontSize: 15, flexShrink: 0,
            color: t.type === 'income' ? '#22c55e' : '#ef4444',
          }}>
            {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
          </div>

          <button onClick={() => onDelete(t.id)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#cbd5e1', padding: 4, display: 'flex', alignItems: 'center',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = '#ef4444')}
            onMouseLeave={e => (e.currentTarget.style.color = '#cbd5e1')}
          >
            <Trash2 size={15} />
          </button>
        </div>
      ))}
    </div>
  )
}
