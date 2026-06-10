import type { Transaction } from './types'

export const CATEGORY_COLORS: Record<string, string> = {
  'Food & Dining':  '#f97316',
  'Transport':      '#3b82f6',
  'Housing':        '#8b5cf6',
  'Entertainment':  '#ec4899',
  'Health':         '#10b981',
  'Shopping':       '#f59e0b',
  'Savings':        '#06b6d4',
  'Income':         '#22c55e',
  'Other':          '#94a3b8',
}

export const SAMPLE_TRANSACTIONS: Transaction[] = [
  { id:'1',  description:'Salary',           amount:3500, type:'income',  category:'Income',        date:'2024-06-01' },
  { id:'2',  description:'Rent',             amount:900,  type:'expense', category:'Housing',       date:'2024-06-02' },
  { id:'3',  description:'Groceries',        amount:120,  type:'expense', category:'Food & Dining', date:'2024-06-03' },
  { id:'4',  description:'Uber',             amount:18,   type:'expense', category:'Transport',     date:'2024-06-04' },
  { id:'5',  description:'Netflix',          amount:15,   type:'expense', category:'Entertainment', date:'2024-06-05' },
  { id:'6',  description:'Gym',              amount:40,   type:'expense', category:'Health',        date:'2024-06-06' },
  { id:'7',  description:'Restaurant',       amount:65,   type:'expense', category:'Food & Dining', date:'2024-06-08' },
  { id:'8',  description:'Amazon',           amount:89,   type:'expense', category:'Shopping',      date:'2024-06-09' },
  { id:'9',  description:'Savings transfer', amount:300,  type:'expense', category:'Savings',       date:'2024-06-10' },
  { id:'10', description:'Freelance project',amount:800,  type:'income',  category:'Income',        date:'2024-06-12' },
  { id:'11', description:'Electricity bill', amount:75,   type:'expense', category:'Housing',       date:'2024-06-13' },
  { id:'12', description:'Coffee',           amount:22,   type:'expense', category:'Food & Dining', date:'2024-06-14' },
  { id:'13', description:'Bus pass',         amount:30,   type:'expense', category:'Transport',     date:'2024-06-15' },
  { id:'14', description:'Pharmacy',         amount:35,   type:'expense', category:'Health',        date:'2024-06-17' },
  { id:'15', description:'Cinema',           amount:24,   type:'expense', category:'Entertainment', date:'2024-06-19' },
  { id:'16', description:'Clothes',          amount:110,  type:'expense', category:'Shopping',      date:'2024-06-21' },
  { id:'17', description:'Lunch',            amount:48,   type:'expense', category:'Food & Dining', date:'2024-06-22' },
  { id:'18', description:'Internet bill',    amount:45,   type:'expense', category:'Housing',       date:'2024-06-23' },
  { id:'19', description:'Spotify',          amount:10,   type:'expense', category:'Entertainment', date:'2024-06-24' },
  { id:'20', description:'Bonus',            amount:500,  type:'income',  category:'Income',        date:'2024-06-25' },
]
