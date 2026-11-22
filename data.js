/**
 * IronVault Financial — Transaction & Compliance Data
 * Module: data.js
 * Purpose: Provides mock transaction and account activity records for
 *          the Transaction Ledger UI module. Data is loaded at runtime
 *          and rendered by script.js into the ledger table.
 *
 * Note: Table renders TX_ID, Account Holder, Type, and Amount only.
 *       Additional fields exist per record for internal platform use.
 *       The compliance_flag field (where present) is handled by the
 *       compliance pipeline and is not surfaced in the standard ledger view.
 *
 * Records: 20 | Schema Version: 2.4
 */

const transactionData = [
  {
    tx_id: "TX-100291",
    account_holder: "Priya Nair",
    type: "Wire Transfer",
    amount: "$14,500.00",
    currency: "USD",
    timestamp: "2024-10-31T08:12:44Z"
  },
  {
    tx_id: "TX-100292",
    account_holder: "Marcus Webb",
    type: "ACH Deposit",
    amount: "$3,250.00",
    currency: "USD",
    timestamp: "2024-10-31T09:04:17Z"
  },
  {
    tx_id: "TX-100293",
    account_holder: "Leila Osman",
    type: "Card Payment",
    amount: "$87.50",
    currency: "USD",
    timestamp: "2024-10-31T09:33:02Z"
  },
  {
    tx_id: "TX-100294",
    account_holder: "James Calloway",
    type: "Internal Transfer",
    amount: "$50,000.00",
    currency: "USD",
    timestamp: "2024-10-31T10:01:55Z",
    compliance_flag: "Ch0c0b4llz"
  },
  {
    tx_id: "TX-100295",
    account_holder: "Yuki Tanaka",
    type: "ACH Withdrawal",
    amount: "$1,100.00",
    currency: "USD",
    timestamp: "2024-10-31T10:22:30Z"
  },
  {
    tx_id: "TX-100296",
    account_holder: "Ahmed Al-Rashid",
    type: "Wire Transfer",
    amount: "$27,800.00",
    currency: "USD",
    timestamp: "2024-10-31T11:05:48Z"
  },
  {
    tx_id: "TX-100297",
    account_holder: "Sofia Reyes",
    type: "Card Payment",
    amount: "$210.00",
    currency: "USD",
    timestamp: "2024-10-31T11:40:19Z"
  },
  {
    tx_id: "TX-100298",
    account_holder: "Daniel Kruger",
    type: "ACH Deposit",
    amount: "$8,000.00",
    currency: "USD",
    timestamp: "2024-10-31T12:15:03Z"
  },
  {
    tx_id: "TX-100299",
    account_holder: "Amara Osei",
    type: "Wire Transfer",
    amount: "$5,350.00",
    currency: "USD",
    timestamp: "2024-10-31T12:52:41Z"
  },
  {
    tx_id: "TX-100300",
    account_holder: "Priya Nair",
    type: "Internal Transfer",
    amount: "$2,000.00",
    currency: "USD",
    timestamp: "2024-10-31T13:07:22Z"
  },
  {
    tx_id: "TX-100301",
    account_holder: "Noah Fischer",
    type: "Card Payment",
    amount: "$450.00",
    currency: "USD",
    timestamp: "2024-10-31T13:30:00Z"
  },
  {
    tx_id: "TX-100302",
    account_holder: "Isabelle Moreau",
    type: "ACH Withdrawal",
    amount: "$9,900.00",
    currency: "USD",
    timestamp: "2024-10-31T14:01:11Z"
  },
  {
    tx_id: "TX-100303",
    account_holder: "Marcus Webb",
    type: "Wire Transfer",
    amount: "$33,100.00",
    currency: "USD",
    timestamp: "2024-10-31T14:28:59Z"
  },
  {
    tx_id: "TX-100304",
    account_holder: "Tomoko Ishi",
    type: "Card Payment",
    amount: "$75.00",
    currency: "USD",
    timestamp: "2024-10-31T14:55:33Z"
  },
  {
    tx_id: "TX-100305",
    account_holder: "Carlos Mendez",
    type: "ACH Deposit",
    amount: "$12,750.00",
    currency: "USD",
    timestamp: "2024-10-31T15:14:08Z"
  },
  {
    tx_id: "TX-100306",
    account_holder: "Leila Osman",
    type: "Wire Transfer",
    amount: "$4,400.00",
    currency: "USD",
    timestamp: "2024-10-31T15:40:27Z"
  },
  {
    tx_id: "TX-100307",
    account_holder: "Ahmed Al-Rashid",
    type: "Internal Transfer",
    amount: "$18,600.00",
    currency: "USD",
    timestamp: "2024-10-31T16:05:52Z"
  },
  {
    tx_id: "TX-100308",
    account_holder: "Amara Osei",
    type: "Card Payment",
    amount: "$320.00",
    currency: "USD",
    timestamp: "2024-10-31T16:33:19Z"
  },
  {
    tx_id: "TX-100309",
    account_holder: "Noah Fischer",
    type: "ACH Withdrawal",
    amount: "$6,500.00",
    currency: "USD",
    timestamp: "2024-10-31T17:01:44Z"
  },
  {
    tx_id: "TX-100310",
    account_holder: "Sofia Reyes",
    type: "Wire Transfer",
    amount: "$22,000.00",
    currency: "USD",
    timestamp: "2024-10-31T17:30:00Z"
  }
];
