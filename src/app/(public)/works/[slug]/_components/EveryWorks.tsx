"use client";
import styles from "@/app/(public)/works/[slug]/_components/work.module.css";
import styles23 from "@/app/(public)/works/[slug]/_components/work23after.module.css";
import { worksData } from "@/data/worksData";
import { Work } from "@/types/data.type";
import { extractImgSrc } from "@plaiceholder/tailwindcss/utils";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import ImageModal from "./ImageModal";

export default function EveryWorks({ year }: { year: string }) {
    const [selected, setSelected] = useState<Work | null>(null);

    const imgRefs = useRef([]);

    // const loadedCount = useLazyLoad(imgRefs.current, images.map(e => e.src));

    const handleClick = (item: Work) => () => setSelected(item);

    if (Number(year) < 2023) {
        return (
            <>
                {selected && <ImageModal selected={selected} setSelected={setSelected} />}
                <div className="overflow-y-auto flex-1">
                    <div className={styles.column}>
                        {worksData[year].map((image) => {
                            const plaiceholder = `plaiceholder-${image.src}`;
                            const blurredSrc = extractImgSrc(plaiceholder);
                            return (
                                <div
                                    key={image.txt}
                                    className="relative aspect-auto w-[80%] h-40 md:h-56 lg:h-72 xl:h-96 cursor-pointer"
                                >
                                    <Image
                                        className={styles.image}
                                        src={image.src}
                                        alt={image.txt}
                                        fill
                                        onClick={handleClick(image)}
                                        loading="lazy"
                                        placeholder="blur"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        blurDataURL={blurredSrc}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <div className={styles23.minmain}>
                <div className={styles23.column}>
                    {worksData[year].map((e, i) => (
                        <Link
                            key={i}
                            href={e.src}
                            target={i === 2 ? "_self" : "_blank"}
                            className={styles23.aa}
                            prefetch={false}
                        >
                            <div className={styles23.image}>
                                <h3 className={styles23.nope}>{e.txt}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
    }
}
