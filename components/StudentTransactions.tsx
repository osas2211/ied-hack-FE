"use client"
import React, { useEffect, useState } from "react"
import { Input, Table, Tooltip } from "antd"
import type { TableColumnsType, TableProps } from "antd"
import { BiSearch } from "react-icons/bi"
import { FaBitcoin, FaInfoCircle } from "react-icons/fa"
import { Donation } from "@/utils/declarations/backend/backend.did"
import { getStudentById } from "@/utils/backend-service"
import Link from "next/link"
import { truncateAddress } from "@/utils/formatter"
import { FaRegEye } from "react-icons/fa"
import { TransactionPreview } from "./TransactionPreview"

const toFilterArray = (data: Donation[], key: string) => {
  const hashmap: Record<string, { text: string; value: string }> = {}
  data.forEach((entry, index) => {
    hashmap[entry[key as "donater"]] = {
      text: entry[key as "donater"],
      value: entry[key as "donater"],
    }
  })
  return Object.values(hashmap)
}

const StudentNameComp = ({ id }: { id: bigint }) => {
  const [name, setName] = useState("")

  useEffect(() => {
    async function fetchData() {
      const res = await getStudentById(id)
      setName(res.name)
    }
    fetchData()
  }, [id])

  return <>{name}</>
}

const formatAmount = (amount: bigint, paymentType: bigint) => {
  let formatted_amount = (amount / BigInt(10 ** 8)).toString()
  if (paymentType == BigInt(0)) {
    return <>{formatted_amount} BTC</>
  } else {
    return <>{formatted_amount} ckBTC</>
  }
}

const getTxId = (txId: string, paymentMethod: bigint) => {
  if (paymentMethod == BigInt(0)) {
    return (
      <Link
        href={`https://blockstream.info/testnet/tx/${txId}`}
        className="text-[#957fef] underline"
      >
        {truncateAddress(txId)}
      </Link>
    )
  } else {
    return (
      <Link
        href={`https://dashboard.internetcomputer.org/bitcoin/transaction/${txId}`}
        className="text-[#957fef] underline"
      >
        {truncateAddress(txId)}
      </Link>
    )
  }
}

const getAccountId = (addr: string, paymentMethod: bigint) => {
  if (paymentMethod == BigInt(0)) {
    return (
      <Link
        href={`https://blockstream.info/testnet/address/${addr}`}
        className="text-[#957fef] underline"
      >
        {truncateAddress(addr)}
      </Link>
    )
  } else {
    return (
      <Link
        href={`https://dashboard.internetcomputer.org/bitcoin/account/${addr}`}
        className="text-[#957fef] underline"
      >
        {truncateAddress(addr)}
      </Link>
    )
  }
}

export const StudentsTransactions = ({
  studentTxn,
}: {
  studentTxn: Donation[]
}) => {
  const [dataSource, setDataSource] = useState(studentTxn)
  const [value, setValue] = useState("")
  // const dummyData: Donation[] = [
  //   {
  //     dti: "0x5635",
  //     txId: "0x123",
  //     recipientId: BigInt(0),
  //     amount: BigInt(2),
  //     donater: "0x123",
  //     paymentMethod: BigInt(0),
  //     confirmed: false,
  //     category: {
  //       ls: BigInt(2),
  //       ss: BigInt(2),
  //       ts: BigInt(2),
  //       cdd: BigInt(2),
  //       categoryType: BigInt(2),
  //     },
  //     donationTo: BigInt(1),
  //   },
  //   {
  //     dti: "0x123",
  //     txId: "0x123",
  //     recipientId: BigInt(0),
  //     amount: BigInt(0),
  //     donater: "0x123",
  //     paymentMethod: BigInt(0),
  //     confirmed: false,
  //     category: {
  //       ls: BigInt(2),
  //       ss: BigInt(2),
  //       ts: BigInt(2),
  //       cdd: BigInt(2),
  //       categoryType: BigInt(2),
  //     },
  //     donationTo: BigInt(0),
  //   },
  //   {
  //     dti: "0x123",
  //     txId: "0x123",
  //     recipientId: BigInt(0),
  //     amount: BigInt(0),
  //     donater: "0x123",
  //     paymentMethod: BigInt(0),
  //     confirmed: false,
  //     category: {
  //       ls: BigInt(2),
  //       ss: BigInt(2),
  //       ts: BigInt(2),
  //       cdd: BigInt(2),
  //       categoryType: BigInt(2),
  //     },
  //     donationTo: BigInt(0),
  //   },
  // ]

  const columns: TableColumnsType<Donation> = [
    {
      title: (
        <Tooltip title="See preview of the transaction details">
          <FaInfoCircle className="text-primary" />
        </Tooltip>
      ),
      dataIndex: "dti",
      key: "dti",
      render: (dti, record) => (
        <TransactionPreview donation={record}>
          <div className="p-2 border-[1px] border-grey-600 rounded-md bg-grey-800 inline-block cursor-pointer">
            <FaRegEye />
          </div>
        </TransactionPreview>
      ),
    },
    {
      title: "DTI",
      dataIndex: "dti",
      key: "dti",
    },
    {
      title: "Transaction ID",
      dataIndex: "txId",
      key: "txId",
      render: (txId, record) => getTxId(txId, record.paymentMethod),
    },
    {
      title: "Student Name",
      dataIndex: "recipientId",
      key: "recipientId",
      render: (id) => <StudentNameComp id={id} />,
    },
    {
      title: (
        <p className="flex gap-2 items-center">
          <FaBitcoin className="text-yellow" /> <span>Amount Donated</span>
        </p>
      ),
      dataIndex: "amount",
      sorter: (a, b) => Number(BigInt(a.amount)) - Number(BigInt(b.amount)),
      key: "amount",
      render: (amt, record) => formatAmount(amt, record.paymentMethod),
    },

    {
      title: "Donor",
      dataIndex: "donater",
      filters: toFilterArray(studentTxn, "donater"),
      onFilter: (value: any, record) => record.donater.indexOf(value) > -1,
      filterSearch: true,
      key: "donater",
      render: (addr, record) => getAccountId(addr, record.paymentMethod),
    },
  ]
  return (
    <div>
      <p className="mb-2">Search Donations with Transaction ID</p>
      <Input
        placeholder="Transaction ID"
        prefix={<BiSearch />}
        size="large"
        className="mb-4 md:w-1/3 w-full"
        value={value}
        onChange={(e) => {
          const currValue = e.target.value
          setValue(currValue)
          const filteredData = studentTxn.filter((entry) =>
            entry.dti.toLowerCase().includes(currValue.toLowerCase())
          )
          setDataSource(filteredData)
        }}
      />
      <Table
        columns={columns}
        dataSource={dataSource}
        className="overflow-x-auto"
      />
    </div>
  )
}
