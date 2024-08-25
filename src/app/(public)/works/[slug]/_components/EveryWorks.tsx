"use client";
import styles from "@/app/(public)/works/[slug]/_components/work.module.css";
import styles23 from "@/app/(public)/works/[slug]/_components/work23after.module.css";
import { worksData } from "@/data/worksData";
import { Plaiceholder, Work } from "@/types/data.type";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ImageModal from "./ImageModal";

export default function EveryWorks({
    year,
    blurredImages,
}: {
    year: string;
    blurredImages: Plaiceholder[];
}) {
    const [selected, setSelected] = useState<Work | null>(null);

    const handleClick = (item: Work) => () => setSelected(item);

    //h-40 md:h-56 lg:h-72 xl:h-96
    if (Number(year) < 2023) {
        return (
            <>
                {selected && (
                    <ImageModal selected={selected} setSelected={setSelected} />
                )}
                <div className="overflow-y-auto flex-1">
                    <div className={styles.column}>
                        {worksData[year].map((image, idx) => {
                            return (
                                <div
                                    key={image.txt}
                                    className="relative w-[80%] h-auto cursor-pointer"
                                >
                                    <Image
                                        className={styles.image}
                                        src={blurredImages[idx].img.imgPath}
                                        alt={image.txt}
                                        // fill
                                        width={blurredImages[idx].img.width}
                                        height={blurredImages[idx].img.height}
                                        onClick={handleClick(image)}
                                        loading="lazy"
                                        placeholder="blur"
                                        sizes="100vw"
                                        blurDataURL={blurredImages[idx].base64}
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
