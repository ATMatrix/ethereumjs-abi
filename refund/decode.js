const fs = require('fs')
const abi = require('ethereumjs-abi')
const BN = require('bignumber.js')
const trans = require('./inputs/trans.json')
const refunds = require('./inputs/refunds.json')

function xTranAmounts(d) {
  const values = abi.rawDecode([
    'uint256',
    'uint256'
  ], new Buffer(d.slice(2), 'hex'))
  const eth = values[0].toString()
  const att = values[1].toString()
  return {
    eth,
    att,
  }
}

function xRefundAmounts(d) {
  const values = abi.rawDecode([
    'uint256'
  ], new Buffer(d.slice(2), 'hex'))
  const att = values[0].toString()
  return {
    eth: '0',
    att,
  }
}

function xAddress(a) {
  return '0x' + a.slice(-40)
}

function xUniqTxs(txs, txType) {
  const uniqTxs = []
  const txHashs = []
  txs.forEach((tx) => {
    const txHash = tx.transactionHash
    if (txHashs.indexOf(txHash) !== -1) return
    const address = xAddress(tx.topics[1])
    const amounts = txType === 't' ?
      xTranAmounts(tx.data) :
      xRefundAmounts(tx.data)
    amounts.address = address
    uniqTxs.push(amounts)
    txHashs.push(txHash)
  })
  return uniqTxs
}

function reduceTxs(decodedTxs) {
  const accounts = decodedTxs.reduce((ret, tx) => {
    const addr = tx.address
    const vals = Object.assign({
      eth: 0,
      att: 0,
    }, ret[addr])
    const accEth = new BN(vals.eth)
    const accAtt = new BN(vals.att)
    vals.eth = accEth.plus(tx.eth).toString()
    vals.att = accAtt.plus(tx.att).toString()
    ret[addr] = vals
    return ret
  }, {})
  return accounts
}

function genResults(accounts) {
  let totalEth = 0
  let totalAtt = 0
  const rows = ['address,eth,att']
  Object.getOwnPropertyNames(accounts)
    .forEach((key) => {
      const accEth = new BN(accounts[key].eth)
      const accAtt = new BN(accounts[key].att)

      const eth = accEth.div(1e+18).toString()
      const att = accAtt.div(1e+18).toString()

      totalEth = new BN(totalEth).plus(eth)
      totalAtt = new BN(totalAtt).plus(att)

      const row = [
        key,
        eth,
        att,
      ].join(',')

      rows.push(row)
    })
  return {
    totalEth,
    totalAtt,
    rows,
  }
}

function compareAccounts(tranAccs, refundAccs) {
  const inequals = ['address,diff']
  const inCompares = ['address,tranAtt,refundAtt,diff']
  Object.getOwnPropertyNames(refundAccs)
    .forEach((refundAddr) => {
      const refundAtt = refundAccs[refundAddr].att
      const tranAtt = tranAccs[refundAddr].att
      const diff = new BN(refundAtt).minus(tranAtt).div(1e+18).toString()
      inCompares.push([
        refundAddr,
        tranAtt,
        refundAtt,
        diff,
      ].join(','))
      if (diff !== '0') inequals.push([
        refundAddr,
        diff,
      ].join(','))
    })
  return {
    inCompares,
    inequals,
  }
}

const tranResultFile = './outputs/tran_results.csv'
const tranCountFile = './outputs/tran_counts.json'
const refundResultFile = './outputs/refund_results.csv'
const refundCountFile = './outputs/refund_counts.json'
const compareFile = './outputs/compared.csv'
const inequalFile = './outputs/inequals.csv'

const decodedTrans = xUniqTxs(trans, 't')
const decodedRefunds = xUniqTxs(refunds, 'r')

const transAccounts = reduceTxs(decodedTrans)
const refundAccounts = reduceTxs(decodedRefunds)

const tranResults = genResults(transAccounts)
const refundResults = genResults(refundAccounts)
const comparedResults = compareAccounts(transAccounts, refundAccounts)

fs.writeFileSync(tranResultFile, tranResults.rows.join('\n'))
fs.writeFileSync(refundResultFile, refundResults.rows.join('\n'))

fs.writeFileSync(tranCountFile, JSON.stringify({
  totalEth: tranResults.totalEth,
  totalAtt: tranResults.totalAtt,
}))
fs.writeFileSync(refundCountFile, JSON.stringify({
  totalEth: refundResults.totalEth,
  totalAtt: refundResults.totalAtt,
}))

fs.writeFileSync(compareFile, comparedResults.inCompares.join('\n'))
fs.writeFileSync(inequalFile, comparedResults.inequals.join('\n'))
