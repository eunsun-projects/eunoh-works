"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { MouseEvent } from "react";
import styles from "@/app/(public)/about/_components/about.module.css";
import En from "./En";
import Ko from "./Ko";

export default function About() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const lang = searchParams.get("lang");
	const currentLang = lang === "en" ? "en" : "ko";

	const createQueryString = (name: string, value: string) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set(name, value);

		return params.toString();
	};

	const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
		const selectedLang = e.currentTarget.dataset.lang;

		if (selectedLang === "ko" || selectedLang === "en") {
			router.push(`${pathname}?${createQueryString("lang", selectedLang)}`);
		}
	};

	return (
		<div className="flex-1">
			<div className={styles.selector}>
				<h2>
					<button type="button" data-lang="en" onClick={handleClick}>
						EN
					</button>
					<span>/</span>
					<button type="button" data-lang="ko" onClick={handleClick}>
						KO
					</button>
				</h2>
			</div>

			{currentLang === "ko" ? <Ko /> : <En />}
		</div>
	);
}
