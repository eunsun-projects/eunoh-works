import styles from "@/app/(public)/about/_components/about.module.css";
import Link from "next/link";

export default function En() {
    return (
        <div className={styles.aboutcontainer} style={{ height: "100%" }}>
            <div className={styles.top}>
                <p className={styles.name}>
                    <strong>Eun Oh</strong>
                </p>
                <p>
                    b.1989, Incheon, KR
                    <br />
                    lives and works in Seoul, KR
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
                    2017 _ M.F.A Sculpture Hongik Univ. Seoul
                    <br />
                    2013 _ B.F.A Sculpture Hongik Univ. Seoul
                </p>
                <p>
                    <span className={styles.title}>
                        <strong>Solo Exhibitions</strong>
                    </span>
                    <br />
                    2022 _ SRC _{" "}
                    <Link href="https://xr.screenxyz.net/src" target="_blank" prefetch={false}>
                        gpuseoul.com/src
                    </Link>{" "}
                    _ online project
                    <br />
                    2020 _ 300 _ 308, digital-ro 33gil 55 _ Seoul
                    <br />
                    2019 _ Self Portrait in Durumagi _ studio148 _ Seoul
                </p>
                <p>
                    <span className={styles.title}>
                        <strong>Group Exhibitions and Projects</strong>
                    </span>
                    <br />
                    2022 _ Happy New Year, Mr.Lawrence _ GCS _ Seoul
                    <br />
                    2021 _ auto _ GPU _ Seoul
                    <br />
                    2021 _ INJURY TIME I _ WESS _ Seoul
                    <br />
                    2021 _ INJURY TIME _ Museumhead _ Seoul
                    <br />
                    2021 _ Against _ Kimsechoong Museum _ Seoul
                    <br />
                    2019 _ COVER VERSION _ A-Lounge gallery _ Seoul
                    <br />
                    2018 _ BOON _ 17717 _ Seoul
                    <br />
                    2016 _ Seoul Babel _ Seoul Museum of Art _ Seoul
                    <br />
                    2015~2016 _ Hyperbolic Time Chamber _ Seoul
                </p>
            </div>
        </div>
    );
}
