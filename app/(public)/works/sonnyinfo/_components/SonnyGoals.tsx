"use client";
import styles from "@/app/(public)/works/sonnyinfo/sonnyinfo.module.css";
import { SonnyInfo } from "@/types/sonny.type";
import { useEffect, useState } from "react";

export default function SonnyGoals({
    sonnyInfo,
}: {
    sonnyInfo: SonnyInfo | null;
}) {
    const [goals, setGoals] = useState<number>(Number(sonnyInfo?.goals) || 200);

    useEffect(() => {
        async function getGoals() {
            try {
                const response = await fetch(
                    `https://raw.githubusercontent.com/eunohhh/get_sonny_goals/main/goals/goals.json`,
                    {
                        cache: "no-store",
                    }
                );

                if (response.ok) {
                    const result: SonnyInfo = await response.json(); //응답 body를 .json(풀어헤쳐서) result에 담아라.
                    console.log("데이터 수신 성공");
                    setGoals(Number(result.goals));
                } else {
                    console.log("데이터 수신 실패", response.statusText);
                    setGoals(208);
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (goals === 200) getGoals();
    }, [goals]);

    return <p className={styles.sonnynum}>{String(goals)}</p>;
}
