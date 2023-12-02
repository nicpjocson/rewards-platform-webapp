"use client";
import Image from "next/image";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { useRouter, usePathname } from 'next/navigation';
import React, { useState, useRef, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { User } from "@/lib/types/User";
import { UserRole } from "@prisma/client";
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount } from 'wagmi';


let defaultUser: any = {
    name: "BrOdin",
    points: 25.1234,
    isAdmin: true,
    walletConnected: true
};

export default function Navbar() {
	const { data: session } = useSession();
	const user = session?.user;

    console.log(user);

    return (
		<>
        <nav className={styles.navbar}>
            <NavLink href="/" className={`${styles.navlink} ${styles.logo}`} enableHighlight={false}>
                <img className={styles.logo_icon} src="/logo.svg"/>
                <h1>Website Name</h1>
            </NavLink>
            {/* Everything below uses float: right, so reversed order */}
            <ProfileComponent user={user} />
            <WalletConnectBox user={user} />
            <NavLink href="/cart"><img src="/cart.svg" alt=""/></NavLink> {/* fix alt */}
            <NavLink href="/shops"><h3>Shop</h3></NavLink>
            <NavLink href="/wallet"><h3>Wallet</h3></NavLink>
            <NavLink href="/"><h3>Home</h3></NavLink>
            <AdminComponent user={user} />
        </nav>
		</>
    );
}

const NavLink: React.FC<{
	href?: string,
	className?: string,
	enableHighlight?: boolean,
	children: React.ReactNode
}> = ({ children, href="/", className=styles.navlink, enableHighlight=true }) => {
    if (href === usePathname() && enableHighlight) {
        className = `${className} ${styles.active}`;
    }

    return (
        <Link href={href} className={className}>{children}</Link>
    );
}

function WalletConnectBox({ user }: { user: User | undefined }) { //TODO: fix types
    const { open } = useWeb3Modal();
    const { address, isConnecting, isDisconnected } = useAccount();

    let connect_style = null;
    let connect_text = null;
    let connect_src = null;

    if (!isDisconnected && !isConnecting) {
        connect_style = styles.connected;
        connect_text = "Connected";
        connect_src = "/wallet_connected.svg"
    } else {
        connect_style = styles.not_connected;
        connect_text = "Not Connected";
        connect_src = "/wallet_notconnected.svg"
    }

    return (
        <div onClick={() => open()} className={`${styles.navlink} ${styles.connect_container}`}>
            <div className={`${styles.connect} ${connect_style}`}>
                {connect_text}
                {/* TODO: there is a few pixels gap between the img and the border, fix 
				also fix alt
				*/}
                <img className={styles.connect_icon} src={connect_src} alt=""/>
            </div>
        </div>
    );
}

const NavDropdown: React.FC<{
	children: React.ReactNode,
	options: {href: string, label: string, onClick?: () => void}[],
	classNames: {
		outer: string,
		button: string,
		content: string
	}
}> = ({ children, options, classNames }) => {
    const [isOpen, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
          if (ref.current && !ref.current.contains(event.target as Node)) {
            setOpen(false);
          }
        }

        window.addEventListener("click", handleClickOutside);
        return () => {
          window.removeEventListener("click", handleClickOutside);
        };
      }, [ref]);

    return (
        <div className={`${styles.dropdown} ${classNames.outer}`} ref={ref}>
            <div className={`${styles.dropdown_button} ${classNames.button}`} onClick={() => setOpen(!isOpen)}>
                {children}
            </div>
            <div className={`${styles.dropdown_content} ${classNames.content} ${isOpen && styles.open}`}>
                {options.map((option, i) => {
                    return (
                        <Link 
                        key={i} 
                        href={option.href} 
                        className={styles.dropdown_link} 
                        onClick={() => {
                            if (option.onClick)
                                option.onClick()
                            setOpen(!isOpen)
                        }}><h3>{option.label}</h3></Link>
                    );
                })}
            </div>
        </div>
    );
}

function ProfileComponent({ user }: { user: User | undefined }) {
    return (
        <div className={`${styles.navlink} ${styles.profile_container_outer}`}> 
            {user ? (
                <NavDropdown classNames={{
                    outer: styles.profile_container,
                    button: styles.profile_button,
                    content: styles.profile_dropdown,
                }} options={[
                    {href: "/inventorypage", label: "Inventory"},
                    {href: "/profile/edit", label: "Edit Profile"},
                    {href: "/", label: "Logout", onClick: signOut}
                ]}>
                    <img className={styles.profile_icon} src="/profile.svg" alt=""/> {/* fix alt */}
                    <div className={styles.profile_info}>
                        <div className={styles.profile_info_username}>
                            <h4>{user.name}</h4>
                        </div>
                        <div className={styles.profile_info_points}>
                            <p>{1000} RP</p> {/* TODO: fix points */}
                        </div>
                    </div>
                </NavDropdown>
            ) : (
                <Link href="/profile/login">
                    <div className={`${styles.profile_container} ${styles.login_container}`}>
                        <h3>Login</h3>
                    </div>
                </Link>
            )}
        </div>
    );
}

function AdminComponent({ user }: { user: User | undefined }) {
    const pathname = usePathname();
    const adminOptions = [
        {href: "/admin/accounts", label: "Accounts"},
        {href: "/admin/products", label: "Products"}
    ];

    return user?.role === UserRole.ADMIN ? (
        <NavDropdown classNames={{
            outer: styles.admin_container,
            button: "",
            content: styles.admin_dropdown,
        }} options={
            adminOptions
        }>
            <div className={`${styles.navlink} ${adminOptions.some(link => link.href === pathname) && styles.active}`}><h3>Admin&nbsp;&nbsp;&nbsp;▾</h3></div>
        </NavDropdown>
    ) : (
        <></> 
    );
}