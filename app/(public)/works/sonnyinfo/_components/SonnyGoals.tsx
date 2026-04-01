"use client";
import styles from "@/app/(public)/works/sonnyinfo/sonnyinfo.module.css";
import type { SonnyInfo } from "@/types/sonny.type";

interface SonnyGoalsProps {
	sonnyInfo: SonnyInfo | null;
}

export default function SonnyGoals({ sonnyInfo }: SonnyGoalsProps) {
	return <p className={styles.sonnynum}>{String(sonnyInfo?.goals || 208)}</p>;
}
