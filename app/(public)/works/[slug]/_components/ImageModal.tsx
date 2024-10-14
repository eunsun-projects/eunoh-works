"use client";
import styles from "@/app/(public)/works/[slug]/_components/work.module.css";
import { Work } from "@/types/data.type";
import Image from "next/image";
import { useState } from "react";
import ImageLoader from "./ImageLoader";

interface ImageModalProps {
    selected: Work | null;
    setSelected: (selected: Work | null) => void;
}

export default function ImageModal({ selected, setSelected }: ImageModalProps) {
    const [load, setLoad] = useState(false);

    const handleOff = () => setSelected(null);

    const handleLoad = () => setLoad(true);

    if (!selected) return null;

    return (
        <div className={styles.modal} onClick={handleOff}>
            <div className={styles.close}>
                <span className={styles.x} onClick={handleOff}>
                    x
                </span>
            </div>
            <div className={styles.modalimage}>
                {!load && <ImageLoader />}
                <Image
                    priority
                    style={{ opacity: load ? "1" : "0" }}
                    className={`${selected.src === "/assets/21-1.webp" && styles.sonimagecomp} ${styles.imagecomp}`}
                    src={selected.src}
                    alt={selected.txt}
                    width={0}
                    height={0}
                    quality={30}
                    onLoad={handleLoad}
                    sizes="(max-width: 1920px) 100%, 100%"
                />
            </div>
            <p className={styles.caption}>{selected.txt}</p>
        </div>
    );
}
