"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { ReactNode, useState } from 'react'; 
import { useSession } from 'next-auth/react';
import { useEffect } from "react";
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount, useBalance } from 'wagmi';

const defaultBalance: {
    points: number,
    token: number | string
} = {
    points: 10000,
    token: 25.1234 
}

type Profile = {
	username: string;
	password: string;
	phoneNumber: string;
	country: string;
	city: string;
	address: string;
}
const defaultProfile: Profile = {
    username: "BrOdin",
    password: "hunter2",
    phoneNumber: "(+63) 986 255 9923",
    country: "Philippines",
    city: "Quezon City",
    address: "123 Rizal St."
}

type Transaction = {
	date: string;
	type: string;
	items: string;
	total: string | number;
	pointsBalance: number;
}
let defaultTransactions: Transaction[] = [
    {
      "date": "09-30-2023",
      "type": "Deposit",
      "items": "-",
      "total": "+3000",
      "pointsBalance": 5500
    },
    {
      "date": "09-30-2023",
      "type": "Purchase",
      "items": "2x Grab Voucher",
      "total": -2000,
      "pointsBalance": 2500
    },
    {
      "date": "09-30-2023",
      "type": "Purchase",
      "items": "1x SM Gift Card",
      "total": -1000,
      "pointsBalance": 1500
    },
    {
      "date": "09-30-2023",
      "type": "Deposit",
      "items": "-",
      "total": "+3000",
      "pointsBalance": 5500
    },
    {
    "date": "09-30-2023",
    "type": "Deposit",
    "items": "-",
    "total": "+3000",
    "pointsBalance": 5500
    },
    {
    "date": "09-30-2023",
    "type": "Purchase",
    "items": "2x Grab Voucher",
    "total": -2000,
    "pointsBalance": 2500
    },
    {
    "date": "09-30-2023",
    "type": "Purchase",
    "items": "1x SM Gift Card",
    "total": -1000,
    "pointsBalance": 1500
    },
    {
      "date": "09-30-2023",
      "type": "Purchase",
      "items": "2x Grab Voucher",
      "total": -2000,
      "pointsBalance": 2500
    },
    {
      "date": "09-30-2023",
      "type": "Purchase",
      "items": "1x SM Gift Card",
      "total": -1000,
      "pointsBalance": 1500
    },
    {
      "date": "09-30-2023",
      "type": "Deposit",
      "items": "-",
      "total": "+3000",
      "pointsBalance": 5500
    },
    {
      "date": "09-30-2023",
      "type": "Purchase",
      "items": "2x Grab Voucher",
      "total": -2000,
      "pointsBalance": 2500
    },
    {
      "date": "09-30-2023",
      "type": "Purchase",
      "items": "1x SM Gift Card",
      "total": -1000,
      "pointsBalance": 1500
    },
    {
      "date": "09-30-2023",
      "type": "Deposit",
      "items": "-",
      "total": "+3000",
      "pointsBalance": 5500
    },
    {
      "date": "09-30-2023",
      "type": "Purchase",
      "items": "2x Grab Voucher",
      "total": -2000,
      "pointsBalance": 2500
    },
    {
      "date": "09-30-2023",
      "type": "Purchase",
      "items": "1x SM Gift Card",
      "total": -1000,
      "pointsBalance": 1500
    }, 
    {
        "date": "09-30-2023",
        "type": "Deposit",
        "items": "-",
        "total": "+3000",
        "pointsBalance": 5500
      },
      {
        "date": "09-30-2023",
        "type": "Purchase",
        "items": "2x Grab Voucher",
        "total": -2000,
        "pointsBalance": 2500
      },
      {
        "date": "09-30-2023",
        "type": "Purchase",
        "items": "1x SM Gift Card",
        "total": -1000,
        "pointsBalance": 1500
      },
      {
        "date": "09-30-2023",
        "type": "Deposit",
        "items": "-",
        "total": "+3000",
        "pointsBalance": 5500
      },
      {
        "date": "09-30-2023",
        "type": "Purchase",
        "items": "2x Grab Voucher",
        "total": -2000,
        "pointsBalance": 2500
      },
      {
        "date": "09-30-2023",
        "type": "Purchase",
        "items": "1x SM Gift Card",
        "total": -1000,
        "pointsBalance": 1500
      },
      {
        "date": "09-30-2023",
        "type": "Deposit",
        "items": "-",
        "total": "+3000",
        "pointsBalance": 5500
      },
      {
        "date": "09-30-2023",
        "type": "Purchase",
        "items": "2x Grab Voucher",
        "total": -2000,
        "pointsBalance": 2500
      },
      {
        "date": "09-30-2023",
        "type": "Purchase",
        "items": "1x SM Gift Card",
        "total": -1000,
        "pointsBalance": 1500
      },
      {
        "date": "09-30-2023",
        "type": "Deposit",
        "items": "-",
        "total": "+3000",
        "pointsBalance": 5500
      },
      {
        "date": "09-30-2023",
        "type": "Purchase",
        "items": "2x Grab Voucher",
        "total": -2000,
        "pointsBalance": 2500
      },
      {
        "date": "09-30-2023",
        "type": "Purchase",
        "items": "1x SM Gift Card",
        "total": -1000,
        "pointsBalance": 1500
      },
      {
        "date": "09-30-2023",
        "type": "Deposit",
        "items": "-",
        "total": "+3000",
        "pointsBalance": 5500
      },
      {
        "date": "09-30-2023",
        "type": "Purchase",
        "items": "2x Grab Voucher",
        "total": -2000,
        "pointsBalance": 2500
      },
      {
        "date": "09-30-2023",
        "type": "Purchase",
        "items": "1x SM Gift Card",
        "total": -1000,
        "pointsBalance": 1500
      },
      {
        "date": "09-30-2023",
        "type": "Deposit",
        "items": "-",
        "total": "+3000",
        "pointsBalance": 5500
      },
      {
        "date": "09-30-2023",
        "type": "Purchase",
        "items": "2x Grab Voucher",
        "total": -2000,
        "pointsBalance": 2500
      },
      {
        "date": "09-30-2023",
        "type": "Purchase",
        "items": "1x SM Gift Card",
        "total": -1000,
        "pointsBalance": 1500
      },
      {
        "date": "09-30-2023",
        "type": "Deposit",
        "items": "-",
        "total": "+3000",
        "pointsBalance": 5500
      },
      {
        "date": "09-30-2023",
        "type": "Purchase",
        "items": "2x Grab Voucher",
        "total": -2000,
        "pointsBalance": 2500
      },
      {
        "date": "09-30-2023",
        "type": "Purchase",
        "items": "1x SM Gift Card",
        "total": -1000,
        "pointsBalance": 1500
      },
      {
        "date": "09-30-2023",
        "type": "Deposit",
        "items": "-",
        "total": "+3000",
        "pointsBalance": 5500
      },
      {
        "date": "09-30-2023",
        "type": "Purchase",
        "items": "2x Grab Voucher",
        "total": -2000,
        "pointsBalance": 2500
      },
      {
        "date": "09-30-2023",
        "type": "Purchase",
        "items": "1x SM Gift Card",
        "total": -1000,
        "pointsBalance": 1500
      },
      {
        "date": "09-30-2023",
        "type": "Deposit",
        "items": "-",
        "total": "+3000",
        "pointsBalance": 5500
      },
      {
        "date": "09-30-2023",
        "type": "Purchase",
        "items": "2x Grab Voucher",
        "total": -2000,
        "pointsBalance": 2500
      },
      {
        "date": "09-30-2023",
        "type": "Purchase",
        "items": "1x SM Gift Card",
        "total": -1000,
        "pointsBalance": 1500
      }
  ];

function Wallet({ 
    balance=defaultBalance, 
    profile=defaultProfile, 
    transactions=defaultTransactions 
}) {
    return (
        <>
            <BalanceSection balance={balance} />
            <ProfileSection profile={profile} />
            <TransactionsSection transactions={transactions} />
        </>
    );
}

const HeaderSection: React.FC<{
	className?: string;
	header: string;
	afterHeader?: JSX.Element;
	children: ReactNode;
}> = ({ children, className="", header, afterHeader=null }) => {
    return (
        <section className={styles.section}>
            <div><h1>{header}</h1> {afterHeader}</div>
            <div className={className}>
                {children}
            </div>
        </section>
    );
}

interface IconProps {
	className?: string;
	src: string;
	alt: string;
	text?: string;
}

function IconTextWrapper({ className="", src, alt, text="" }: IconProps) {
    return (
        <div className={`${text && styles.icon_text_wrapper} ${className}`}>
            <img src={src} alt={alt} /> 
            {text && (<span>{text}</span>)}
        </div>
    );
}

function IconTextButton({ className="", src, alt, text, onClick }: IconProps & { onClick: () => void }) {
    return (
        <div onClick={onClick}>
            <IconTextWrapper className={`${className} ${styles.button}`} src={src} alt={alt} text={text} />
        </div>
    );
}

function BalanceSection({ balance }: { balance: typeof defaultBalance }) {
    const { address, isConnected } = useAccount();
    const { data, isError, isLoading } = useBalance({ address })
    const [isVisible, setVisible] = useState(false);
    const censor = "********";

    let tokenClass = `${styles.token_points} ${styles.shrink_text}`;

    if (isLoading) balance.token = "Fetching balance..."
    else if (isError) balance.token = "Error getting balance"
    else if (!isConnected) balance.token = "No Wallet Connected"
    else {
        balance.token = `${data?.formatted} ${data?.symbol}`
        tokenClass = styles.token_points;
    }

    return (
        <HeaderSection className={styles.balance_subsection} header="My Balance" 
            afterHeader={(<img onClick={() => setVisible(!isVisible)} className={`${styles.button} ${styles.balance_toggle}`} src="/icons/eyes.svg" alt="Eye Toggle" />)}
        >
            <div className={`${styles.points_container} ${styles.content_block} ${styles.block_dark}`}>
                <IconTextWrapper className={styles.rp_title} src="/icons/gift.svg" alt="Reward Points Icon" text="Reward Points" />
                <div className={styles.rp_points}>{isVisible ? balance.points : censor}</div>
                <IconTextButton onClick={() => console.log("Clicked")} className={styles.points_add} src="/icons/plus.svg" alt="Add Points Icon" text="Add Points" />
            </div>
            <div className={`${styles.token_container} ${styles.content_block} ${styles.block_light}`}>
                <IconTextWrapper className={styles.token_title} src="/icons/token.svg" alt="Token Icon" text="Token" />
                <div className={tokenClass}>{isVisible ? balance.token : censor}</div>
            </div>        
        </HeaderSection>
    );
}

function ProfileSection({ profile }: { profile: Profile }) {
    const [isEditable, setEditable] = useState(false);

    return (
        <HeaderSection className={styles.profile_subsection} header="My Profile">
            <div className={`${styles.profile_container} ${styles.content_block} ${styles.block_dark}`}>
                <div className={styles.profile_table_container}>
                    <table>
                        <tr>
                            <td>Username</td>
                            <td>{profile.username}</td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td>********</td>
                        </tr>
                        <tr>
                            <td>Phone Number</td>
                            <td>{profile.phoneNumber}</td>
                        </tr>
                        <tr>
                            <td>Country</td>
                            <td>{profile.country}</td>
                        </tr>
                        <tr>
                            <td>City</td>
                            <td>{profile.city}</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>{profile.address}</td>
                        </tr>
                    </table>
                </div>
                {/* <HeaderSection>div className={`${styles.profile_cog_container} ${styles.button} ${styles.profile_edit}`}><img src="/icons/gear.svg" alt="Edit Profile"/></div> */}
                <IconTextButton onClick={() => console.log("Clicked")} className={`${styles.profile_edit} ${styles.profile_cog_container}`} src="/icons/gear.svg" alt="Edit Profile" text="" />
            </div>
            <WalletContainer />
        </HeaderSection>
    );
}

function WalletContainer({ }) {
    const { open } = useWeb3Modal();
    const { address, isConnected } = useAccount();
    
    return (
        <div className={`${styles.wallet_container} ${styles.content_block} ${styles.block_light}`}>
            <IconTextWrapper className={styles.wallet_title} src="/icons/WalletConnect-Logo1.svg" alt="Wallet Connect Logo" text="Wallet" />
            {isConnected ? (
                <>
                    <div className={`${styles.wallet_status} ${styles.shrink_text}`}>{address}</div>
                    <IconTextButton onClick={() => open({ view: 'Account'})} className={styles.wallet_connect} src="/icons/link.svg" alt="Link Icon" text="Open Account" />
                </>
            ) : (
                <>
                    <div className={styles.wallet_status}>No Wallet Connected</div>
                    <IconTextButton onClick={open} className={styles.wallet_connect} src="/icons/link.svg" alt="Link Icon" text="Connect Wallet" />
                </>
            )}
        </div>
    );
}

function TransactionsSection({ transactions }: { transactions: Transaction[] }) {
    const [page, setPage] = useState(0);

    if (!transactions)
        transactions = [];

    const transactionsPerPage = 15;
    const arrayTo2D = (arr: Transaction[], numPerRow: number) => {
        let result = [];
        for (let i=0; i < arr.length; i += numPerRow) 
            result.push(arr.slice(i, i + numPerRow));
        return result;
    }
    const transactions2D = arrayTo2D(transactions, transactionsPerPage);

    const handlePageNext = () => setPage(Math.min(page+1, Math.max(transactions2D.length-1, 0)));
    const handlePagePrev = () => setPage(Math.max(page-1, 0));

    const currentTransactionFirst = () => transactions.length > 0 ? page * transactionsPerPage + 1 : 0
    const currentTransactionLast = () => Math.min((page + 1) * transactionsPerPage, transactions.length);

    const transactionTotalColor = (total: number | string) => { // TODO: fix this
		total = Number(total);
        if (total > 0)
            return styles.transactions_total_plus;
        else if (total < 0)
            return styles.transactions_total_minus;
        return "";
    }


    

    //console.log(transactions);
    //console.log(transactions2D);

    return (
        <HeaderSection className={styles.transactions_subsection} header="My Transactions">
            <div className={styles.transactions_page_container}>
                <div className={styles.transactions_amount_display}>
                    Showing {currentTransactionFirst()}-{currentTransactionLast()} of {transactions.length}
                </div>
                <div className={styles.transactions_page_selector}>
                    <span className={styles.transactions_page_prev} onClick={handlePagePrev}>◀</span>
                    <span>Page {page+1}</span>
                    <span className={styles.transactions_page_next} onClick={handlePageNext}>▶</span>
                </div>
            </div>
            <div className={styles.transactions_table_container}>
                <table className={styles.transactions_table}>
                    <tbody>
                      <tr className={styles.transactions_row_dark}>
                          <th className={styles.transactions_date}>Date</th>
                          <th className={styles.transactions_type}>Type</th>
                          <th className={styles.transactions_items}>Items</th>
                          <th className={styles.transactions_total}>Total</th>
                          <th className={styles.transactions_balance}>Points Balance</th>
                      </tr>
                      {transactions2D[page]?.map((transaction, index) => {
                          return (
                              <tr className={index % 2 == 0 ? styles.transactions_row_light : styles.transactions_row_dark} key={index}>
                                  <td>{transaction.date}</td>
                                  <td>{transaction.type}</td>
                                  <td>{transaction.items}</td>
                                  <td className={transactionTotalColor(transaction.total)}>{transaction.total}</td>
                                  <td className={styles.transactions_balance}>{transaction.pointsBalance}</td>
                              </tr>
                          );
                      })}
                    </tbody>
                </table>
            </div>
        </HeaderSection>
    );
}


export default function Wrapper() {
  const [rewardPoints, setRewardPoints] = useState(0)

  const { data: session } = useSession();
  const user = session?.user;

  const balance = {
    points: 0,
    token: 0   
  }

  useEffect(() => {
    setRewardPoints(user?.points ?? 0)
    balance.points = user?.points ?? 0
    //token not fetched from db yet, only points

  }, [user])

	return <Wallet balance={balance}/>
}