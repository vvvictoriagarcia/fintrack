import { useState, useMemo } from 'react'
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line, Legend,
} from 'recharts'
import { PlusCircle, Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react'
import { format } from 'date-fns'

import type { Transaction } from './types'
import { SAMPLE_TRANSACTIONS, CATEGORY_COLORS } from './data'
import KPICard from './components/KPICard'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(SAMPLE_TRANSACTIONS)
  const [showForm, setShowForm] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions'>('overview')

  function addTransaction(t: Transaction) {
    setTransactions(prev => [t, ...prev])
  }
  function deleteTransaction(id: string) {
    setTransactions(prev => prev.filter(t => t.id !== id))
  }

  const totalIncome   = useMemo(() => transactions.filter(t => t.type === 'income').reduce((s,t) => s+t.amount, 0), [transactions])
  const totalExpenses = useMemo(() => transactions.filter(t => t.type === 'expense').reduce((s,t) => s+t.amount, 0), [transactions])
  const balance       = totalIncome - totalExpenses
  const savingsRate   = totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : '0.0'

  const pieData = useMemo(() => {
    const map: Record<string, number> = {}
    transactions.filter(t => t.type === 'expense').forEach(t => {
      map[t.category] = (map[t.category] || 0) + t.amount
    })
    return Object.entries(map).map(([name, value]) => ({ name, value })).sort((a,b) => b.value - a.value)
  }, [transactions])

  const barData = useMemo(() => pieData.slice(0, 6), [pieData])

  const lineData = useMemo(() => {
    const map: Record<string, { income: number; expense: number }> = {}
    transactions.forEach(t => {
      const d = format(new Date(t.date + 'T00:00:00'), 'MMM d')
      if (!map[d]) map[d] = { income: 0, expense: 0 }
      if (t.type === 'income') map[d].income += t.amount
      else map[d].expense += t.amount
    })
    return Object.entries(map)
      .sort((a,b) => new Date(`2024 ${a[0]}`).getTime() - new Date(`2024 ${b[0]}`).getTime())
      .map(([date, v]) => ({ date, ...v }))
  }, [transactions])

  const fmt = (n: number) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8', fontFamily: "'Inter', system-ui, sans-serif" }}>

      <header style={{
        background: 'linear-gradient(135deg, #1e3a5f, #2d6a9f)',
        color: 'white', padding: '18px 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Wallet size={26} />
          <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.5px' }}>FinTrack</span>
          <span style={{ fontSize: 12, opacity: 0.6, marginLeft: 4 }}>Personal Finance</span>
        </div>
        <button onClick={() => setShowForm(true)} style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: 10, padding: '9px 18px', color: 'white', cursor: 'pointer',
          fontWeight: 600, fontSize: 14,
        }}>
          <PlusCircle size={17} /> Add Transaction
        </button>
      </header>

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 24px' }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
          <KPICard label="Total Balance"  value={fmt(balance)}       color={balance >= 0 ? '#3b82f6' : '#ef4444'} icon={<Wallet size={28}/>} />
          <KPICard label="Total Income"   value={fmt(totalIncome)}   color="#22c55e" icon={<TrendingUp size={28}/>} sub={`${transactions.filter(t=>t.type==='income').length} transactions`} />
          <KPICard label="Total Expenses" value={fmt(totalExpenses)} color="#ef4444" icon={<TrendingDown size={28}/>} sub={`${transactions.filter(t=>t.type==='expense').length} transactions`} />
          <KPICard label="Savings Rate"   value={`${savingsRate}%`}  color="#8b5cf6" icon={<PiggyBank size={28}/>} sub="of total income" />
        </div>

        <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
          {(['overview','transactions'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: '9px 22px', borderRadius: 10, border: 'none', cursor: 'pointer',
              fontWeight: 600, fontSize: 14, transition: 'all .15s',
              background: activeTab === tab ? 'white' : 'transparent',
              color: activeTab === tab ? '#1e3a5f' : '#64748b',
              boxShadow: activeTab === tab ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
            }}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

              <div style={{ background: 'white', borderRadius: 14, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <h3 style={{ margin: '0 0 16px', fontSize: 15, color: '#1e293b' }}>Expenses by Category</h3>
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={95}
                      dataKey="value" paddingAngle={3}
                      label={({ name, percent }) => `${name} ${(percent*100).toFixed(0)}%`}
                      labelLine={false}>
                      {pieData.map(entry => (
                        <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || '#94a3b8'} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v: number) => [`$${v.toFixed(2)}`, 'Amount']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div style={{ background: 'white', borderRadius: 14, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <h3 style={{ margin: '0 0 16px', fontSize: 15, color: '#1e293b' }}>Top Spending Categories</h3>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={barData} layout="vertical" margin={{ left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" tickFormatter={v => `$${v}`} fontSize={11} />
                    <YAxis type="category" dataKey="name" fontSize={12} width={100} />
                    <Tooltip formatter={(v: number) => [`$${v.toFixed(2)}`, 'Spent']} />
                    <Bar dataKey="value" radius={[0,6,6,0]}>
                      {barData.map(entry => (
                        <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || '#94a3b8'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: 14, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <h3 style={{ margin: '0 0 16px', fontSize: 15, color: '#1e293b' }}>Income vs Expenses Over Time</h3>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" fontSize={11} />
                  <YAxis tickFormatter={v => `$${v}`} fontSize={11} />
                  <Tooltip formatter={(v: number) => `$${v.toFixed(2)}`} />
                  <Legend />
                  <Line type="monotone" dataKey="income"  stroke="#22c55e" strokeWidth={2} dot={false} name="Income" />
                  <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={2} dot={false} name="Expenses" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <TransactionList transactions={transactions} onDelete={deleteTransaction} />
        )}
      </main>

      {showForm && <TransactionForm onAdd={addTransaction} onClose={() => setShowForm(false)} />}
    </div>
  )
}
