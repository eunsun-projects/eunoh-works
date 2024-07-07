import styles from "@/app/(public)/about/_components/about.module.css";
import { gothicA1 } from "@/app/fonts";
import Link from "next/link";

export default function Ko() {
    return (
        <div className={styles.aboutcontainer} style={{ height: "100%" }}>
            <div className={styles.top}>
                <p className={styles.name}>
                    <strong>오은 吳垠</strong>
                </p>
                <p className={gothicA1.className}>
                    1989 인천 출생
                    <br />
                    서울 거주 및 작업
                    <br />
                    +82 10-6375-4876
                    <br />
                    bdohhhhh@gmail.com
                </p>
            </div>
            <div className={styles.bottom}>
                <p>
                    <span className={styles.title}>
                        <strong>Education</strong>
                    </span>
                    <br />
                    <span className={gothicA1.className}>
                        2017 _ 홍익대학교 대학원 조소과 졸업
                        <br />
                        2013 _ 홍익대학교 조소과 졸업
                    </span>
                </p>
                <p>
                    <span className={styles.title}>
                        <strong>Solo Exhibitions</strong>
                    </span>
                    <br />
                    <span className={gothicA1.className}>
                        2022 _ SRC _{" "}
                        <Link href="https://xr.screenxyz.net/src" target="_blank" prefetch={false}>
                            gpuseoul.com/src
                        </Link>{" "}
                        _ 온라인
                        <br />
                        2020 _ 300 _ 디지털로33길 55 308호 _ 서울
                        <br />
                        2019 _ 두루마기 입은 자화상 _ studio148 _ 서울
                    </span>
                </p>
                <p>
                    <span className={styles.title}>
                        <strong>Group Exhibitions and Projects</strong>
                    </span>
                    <br />
                    <span className={gothicA1.className}>
                        2022 _ 해피뉴이어, 미스터로렌스 _ GCS _ 서울
                        <br />
                        2021 _ auto _ GPU _ 서울
                        <br />
                        2021 _ INJURY TIME I _ WESS _ 서울
                        <br />
                        2021 _ INJURY TIME _ 뮤지엄헤드 _ 서울
                        <br />
                        2021 _ Against _ 김세중미술관 _ 서울
                        <br />
                        2019 _ COVER VERSION _ A-Lounge gallery _ 서울
                        <br />
                        2018 _ BOON _ 17717 _ 서울
                        <br />
                        2016 _ 서울바벨 _ 서울시립미술관 _ 서울
                        <br />
                        2015~2016 _ 정신과 시간의 방 _ 서울
                    </span>
                </p>
            </div>
        </div>
    );
}
