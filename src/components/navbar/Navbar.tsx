"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./style.module.css";

import users from "@/media/icons/users-icon.svg"
import doc from "@/media/icons/doc.svg"
import dashs from "@/media/icons/dashboards-icon.svg"
import check from "@/media/icons/check-icon.svg"

import settings from "@/media/icons/settings-icon.svg"
import exit from "@/media/icons/sair.svg"

import { useNavigate } from "@/utils/hooks/UseNavigate";
import { IconComponent } from "@/contents/renders/IconComponent";

export default function Navbar() {
    const pathname = usePathname();
    const { navigateTo } = useNavigate();

    const [isExpanded, setIsExpanded] = useState(false);
    const [exitModal, setExitModal] = useState(false);

    const navItems = [
        { label: "Usuários", path: "/users", icon: users, width: 22  },
        { label: "Produtos", path: "/products", icon: doc, width: 16  },
        { label: "Pedidos", path: "/orders", icon: check, width: 20  },
        { label: "Relatórios", path: "/dashboards", icon:  dashs, width: 23  },
    ];

    const LOGOUT_PATH = "__logout__";

    const handleLogout = () => {
        sessionStorage.clear();
        localStorage.clear();
        navigateTo("/auth");
    };

    const [hoveredPath, setHoveredPath] = useState<string | null>(null);

    const ACTIVE_COLOR = "var(--dark-blue-80)";
    const DEFAULT_COLOR = "var(--dark-blue-100)";

    const getItemColor = (path: string, isActive: boolean) => {
        if (hoveredPath === path) return ACTIVE_COLOR;
        if (isActive) return "white";
        return DEFAULT_COLOR;
    };

    const configItem = {
        label: "Configurações",
        path: "/settings",
        icon: settings,
    };

    return (
        <nav
            className={`${styles.navbar} ${isExpanded ? styles.expanded : styles.collapsed
                }`}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
            style={{ justifyContent: "space-between" }}
        >
            <div>
                {/* Logo */}
                <div className={styles.logoContainer}>
                    {/* {!isExpanded ? <IconComponent Icon={logoS} width={62} height={62} /> : <IconComponent Icon={logoH} width={178} height={81} />} */}
                    Clicka
                </div>

                
            </div>

            {/* Navegação */}
                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        flexDirection: "column",
                        gap: 24,
                    }}
                >
                    {navItems.map((item) => {
                        const isActive = pathname.startsWith(item.path);
                        const color = getItemColor(item.path, isActive);

                        return (
                            <div
                                key={item.path}
                                onClick={() => navigateTo(item.path)}
                                onMouseEnter={() => setHoveredPath(item.path)}
                                onMouseLeave={() => setHoveredPath(null)}
                                className={`${styles.navItem} ${isExpanded ? styles.expandedItem : styles.collapsedItem
                                    } ${isActive ? styles.active : ""}`}
                                style={{
                                    borderBottom:
                                        hoveredPath === item.path
                                            ? "2px solid var(--dark-blue-80)"
                                            : isActive
                                                ? "none"
                                                : "2px solid transparent",

                                    background:
                                        isActive && hoveredPath !== item.path ? "var(--dark-blue-80)" : "white",
                                }}
                            >
                                <IconComponent
                                    Icon={item.icon}
                                    height={22}
                                    width={item.width}
                                    color={color}
                                />

                                {isExpanded && (
                                    <span
                                        className={styles.navLabel}
                                        style={{ color }}
                                    >
                                        {item.label}
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>

            {/* Logout */}
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "column",
                    gap: 24,
                    marginTop:100
                }}
            >
                {/* Botão Configurações */}
                {(() => {
                    const isActive = pathname.startsWith(configItem.path);
                    const color = getItemColor(configItem.path, isActive);

                    return (
                        <div
                            onClick={() => navigateTo(configItem.path)}
                            onMouseEnter={() => setHoveredPath(configItem.path)}
                            onMouseLeave={() => setHoveredPath(null)}
                            className={`${styles.navItem} ${isExpanded ? styles.expandedItem : styles.collapsedItem
                                } ${isActive ? styles.active : ""}`}
                            style={{
                                borderBottom:
                                    hoveredPath === configItem.path
                                        ? "2px solid var(--dark-blue-80)"
                                        : "2px solid transparent",

                                background:
                                    isActive && hoveredPath !== configItem.path
                                        ? "var(--dark-blue-80)"
                                        : "white",
                            }}
                        >
                            <IconComponent
                                Icon={configItem.icon}
                                height={20}
                                width={20}
                                color={color}
                            />

                            {isExpanded && (
                                <span className={styles.navLabel} style={{ color }}>
                                    {configItem.label}
                                </span>
                            )}
                        </div>
                    );
                })()}
                <div
                    onClick={() => setExitModal(true)}
                    onMouseEnter={() => setHoveredPath(LOGOUT_PATH)}
                    onMouseLeave={() => setHoveredPath(null)}
                    style={{
                        display: "flex",
                        gap: isExpanded ? 16 : 0,
                        margin: isExpanded ? "0 32px 32px 32px" : "0 0 32px 0",
                        justifyContent: isExpanded ? "flex-start" : "center",
                        cursor: "pointer",
                        alignItems: "center",
                    }}
                    className={styles.navItem}
                >
                    <IconComponent
                        Icon={exit}
                        height={23}
                        width={23}
                        color={hoveredPath === LOGOUT_PATH ? ACTIVE_COLOR : "var(--dark-blue-100)"}
                    />

                    {isExpanded && (
                        <span className={styles.navLabel}>
                            Sair da conta
                        </span>
                    )}
                </div>
            </div>

        </nav>
    );
}