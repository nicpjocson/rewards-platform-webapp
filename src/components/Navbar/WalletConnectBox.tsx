"use client";
import styles from "./Navbar.module.css";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { User } from "@/lib/types/User";
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount } from 'wagmi';

export default function WalletConnectBox({ user }: { user: User | undefined }) { //TODO: fix types
    const { open } = useWeb3Modal();
    const { address, isConnecting, isConnected } = useAccount({
        onConnect({ address, connector, isReconnected }) {
            console.log('Connected', { address, connector, isReconnected })
        },
        onDisconnect() {
            console.log('Disconnected')
        },
    });
    
    let connect_style = styles.not_connected;
    let connect_text = "Not Connected";
    let connect_src = "/wallet_notconnected.svg"

    if (user && isConnected) {
        console.log("Connected! Address:");
        console.log(address);
        connect_style = styles.connected;
        connect_text = "Connected";
        connect_src = "/wallet_connected.svg"
    } 
    
    const content = (
        <div className={`${styles.connect} ${connect_style}`}>
            {connect_text}
            {/* TODO: there is a few pixels gap between the img and the border, fix 
            also fix alt
            */}
            <img className={styles.connect_icon} src={connect_src} alt=""/>
        </div>
    )

    return user ? (
        <div onClick={() => open()} className={`${styles.navlink} ${styles.connect_container}`}>
            {content}           
        </div>
    ) : (
        <Link href="/profile/login" className={`${styles.navlink} ${styles.connect_container}`}>
            {content}
        </Link>
    );
}