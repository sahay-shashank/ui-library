import React, { createContext, useContext, useEffect, useState } from "react";
import { Slot } from "@radix-ui/react-slot";
import styles from "./NavBar.module.css"

type NavBarContextProps = {
    open?: boolean;
    setOpen?: (open: boolean) => void;
}

type NavBarLogoProps = {
    children: React.ReactNode;
}

type NavBarLinksProps = {
    children: React.ReactNode;
}

type NavBarLinkItemProps = {
    children: React.ReactElement;
}

type NavBarActionProps = {
    children: React.ReactNode;
}

type NavBarToggleProps = {
    children?: React.ReactNode
}

type NavBarCollapseProps = {
    children: React.ReactNode;
}

type NavBarProps = {
    children: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    className?: string;
}

const NavBarContext = createContext<NavBarContextProps | null>(null);

function useNavBarContext() {
    const context = useContext(NavBarContext);
    if (!context) {
        throw Error("NavBar components should be used as children of NavBar")
    }
    return context
}

function Logo({ children }: NavBarLogoProps) {
    useNavBarContext();
    return (
        <div className={styles.logo}> {children}</div >
    )
}

function Links({ children }: NavBarLinksProps) {
    useNavBarContext();
    return (
        <ul className={styles.links}>
            {children}
        </ul>
    )
}

function LinkItem({ children }: NavBarLinkItemProps) {
    useNavBarContext();
    return (
        <li>
            <Slot className={styles.link}>{children}</Slot>
        </li>
    )
}

function Actions({ children }: NavBarActionProps) {
    useNavBarContext();
    return (
        <div className={styles.actions}> {children}</div >
    )
}

function Toggle({ children }: NavBarToggleProps) {
    const { open, setOpen } = useNavBarContext();
    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window !== "undefined") return window.innerWidth <= 768;
        return true; // fallback for SSR
    });

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (!setOpen || !isMobile) return null; // Only render on mobile


    return (
        <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
        >
            {children ?? "Menu"}
        </button>

    )
}

function Collapse({ children }: NavBarCollapseProps) {
    const { open } = useNavBarContext();
    const [isMobile, setIsMobile] = useState(
        typeof window !== "undefined" ? window.innerWidth <= 768 : true
    );

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Only render on mobile AND if open
    if (!open || !isMobile) return null;
    if (!open) return null;

    return <div className={styles.collapse}>{children}</div>;
}


function NavBar({ children, open: controlledOpen, onOpenChange, className }: NavBarProps) {
    const [internalOpen, setInternalOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window !== "undefined") return window.innerWidth <= 768;
        return true; // SSR fallback
    });

    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : internalOpen;
    const setOpen = (value: boolean) => {
        if (!isControlled) setInternalOpen(value);
        onOpenChange?.(value);
    };

    // Track viewport changes
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []); return (
        <NavBarContext.Provider value={{ open, setOpen }}>
            <nav className={`${styles.navbar} ${className ?? ""}`} data-open={isMobile && open ? "" : undefined}>
                {children}
            </nav >
        </NavBarContext.Provider>
    )
}

NavBar.Logo = Logo
NavBar.Links = Links
NavBar.LinkItem = LinkItem
NavBar.Actions = Actions
NavBar.Toggle = Toggle
NavBar.Collapse = Collapse

export { NavBar };