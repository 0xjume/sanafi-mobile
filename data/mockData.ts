export interface Token {
  symbol: string;
  name: string;
  balance: number;
  price: number;
  change24h: number;
  icon: string;
}

export interface Transaction {
  id: string;
  type: 'sent' | 'received' | 'exchange';
  amount: number;
  token: string;
  recipient?: string;
  sender?: string;
  status: 'completed' | 'pending' | 'failed';
  timestamp: Date;
  fee?: number;
  hash?: string;
}

export interface PriceData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  icon: string;
}

export interface Contact {
  id: string;
  name: string;
  address: string;
  avatar?: string;
  lastUsed: Date;
}

export const mockTokens: Token[] = [
  {
    symbol: 'AEDS',
    name: 'AED Sanafi',
    balance: 15420.50,
    price: 3.67,
    change24h: 0.02,
    icon: '🇦🇪',
  },
  {
    symbol: 'IDRS',
    name: 'IDR Sanafi',
    balance: 45680000.00,
    price: 0.000067,
    change24h: 0.15,
    icon: '🇮🇩',
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    balance: 2840.00,
    price: 1.00,
    change24h: -0.01,
    icon: '💵',
  },
  {
    symbol: 'USDT',
    name: 'Tether USD',
    balance: 1250.75,
    price: 0.999,
    change24h: 0.05,
    icon: '💰',
  },
  {
    symbol: 'SANA',
    name: 'Sanafi Token',
    balance: 5680.25,
    price: 0.45,
    change24h: 2.34,
    icon: '🪙',
  },
  {
    symbol: 'SanaSOL',
    name: 'Sanafi Solana LST',
    balance: 892.15,
    price: 12.75,
    change24h: -1.28,
    icon: '☀️',
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'received',
    amount: 500.00,
    token: 'AEDS',
    sender: 'Fatima Al-Zahra',
    status: 'completed',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    hash: '5KJp9...4mN2x',
  },
  {
    id: '2',
    type: 'sent',
    amount: 150.00,
    token: 'USDC',
    recipient: 'Omar Hassan',
    status: 'completed',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    fee: 0.25,
    hash: '8Tr5w...9pK4j',
  },
  {
    id: '3',
    type: 'exchange',
    amount: 1000.00,
    token: 'AEDS',
    status: 'completed',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    fee: 2.50,
    hash: '2Nq8v...7xR9m',
  },
  {
    id: '4',
    type: 'sent',
    amount: 75.50,
    token: 'USDT',
    recipient: 'Aisha Mohammed',
    status: 'pending',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    fee: 0.15,
  },
  {
    id: '5',
    type: 'received',
    amount: 2500.00,
    token: 'AEDS',
    sender: 'Emirates NBD',
    status: 'completed',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    hash: '9Hm3k...5tY8p',
  },
  {
    id: '6',
    type: 'received',
    amount: 250.00,
    token: 'SANA',
    sender: 'Khalid Al-Mansouri',
    status: 'completed',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    hash: '7Kp2m...3nR8x',
  },
  {
    id: '7',
    type: 'sent',
    amount: 45.75,
    token: 'SanaSOL',
    recipient: 'Mariam Al-Zaabi',
    status: 'completed',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    fee: 0.05,
    hash: '4Nm9w...6tY2p',
  },
  {
    id: '8',
    type: 'received',
    amount: 15000000.00,
    token: 'IDRS',
    sender: 'Bank Indonesia',
    status: 'completed',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    hash: '6Lm8k...2wQ9r',
  },
  {
    id: '9',
    type: 'sent',
    amount: 5000000.00,
    token: 'IDRS',
    recipient: 'Sari Dewi',
    status: 'completed',
    timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000),
    fee: 50000.00,
    hash: '3Pk7n...9xT4m',
  },
];

export const mockPrices: PriceData[] = [
  {
    symbol: 'AEDS',
    name: 'AED Sanafi',
    price: 3.67,
    change24h: 0.02,
    icon: '🇦🇪',
  },
  {
    symbol: 'IDRS',
    name: 'IDR Sanafi',
    price: 0.000067,
    change24h: 0.15,
    icon: '🇮🇩',
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    price: 1.00,
    change24h: -0.01,
    icon: '💵',
  },
  {
    symbol: 'USDT',
    name: 'Tether USD',
    price: 0.999,
    change24h: 0.05,
    icon: '💰',
  },
  {
    symbol: 'SANA',
    name: 'Sanafi Token',
    price: 0.45,
    change24h: 2.34,
    icon: '🪙',
  },
  {
    symbol: 'SanaSOL',
    name: 'Sanafi Solana LST',
    price: 12.75,
    change24h: -1.28,
    icon: '☀️',
  },
];

export const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Fatima Al-Zahra',
    address: '8K7Qt...9mPx2',
    lastUsed: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: '2',
    name: 'Omar Hassan',
    address: '5Np9w...4kR7j',
    lastUsed: new Date(Date.now() - 6 * 60 * 60 * 1000),
  },
  {
    id: '3',
    name: 'Aisha Mohammed',
    address: '2Tr5m...8pN4x',
    lastUsed: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: '4',
    name: 'Emirates NBD',
    address: '9Hm3k...5tY8p',
    lastUsed: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: '5',
    name: 'Khalid Al-Mansouri',
    address: '7Kp2m...3nR8x',
    lastUsed: new Date(Date.now() - 4 * 60 * 60 * 1000),
  },
  {
    id: '6',
    name: 'Mariam Al-Zaabi',
    address: '4Nm9w...6tY2p',
    lastUsed: new Date(Date.now() - 8 * 60 * 60 * 1000),
  },
  {
    id: '7',
    name: 'Bank Indonesia',
    address: '6Lm8k...2wQ9r',
    lastUsed: new Date(Date.now() - 12 * 60 * 60 * 1000),
  },
  {
    id: '8',
    name: 'Sari Dewi',
    address: '3Pk7n...9xT4m',
    lastUsed: new Date(Date.now() - 18 * 60 * 60 * 1000),
  },
];