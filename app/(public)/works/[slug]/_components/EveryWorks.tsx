'use client';
import styles from '@/app/(public)/works/[slug]/_components/work.module.css';
import styles23 from '@/app/(public)/works/[slug]/_components/work23after.module.css';
import { useBlurImageContext } from '@/context/blurImageContext';
import { worksData } from '@/data/worksData';
import { Work } from '@/types/data.type';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import ImageModal from './ImageModal';

export default function EveryWorks({ year }: { year: string }) {
  const blurredImages = useBlurImageContext();
  const [selected, setSelected] = useState<Work | null>(null);

  const handleClick = (item: Work) => () => setSelected(item);

  //h-40 md:h-56 lg:h-72 xl:h-96
  if (Number(year) < 2023) {
    return (
      <>
        {selected && <ImageModal selected={selected} setSelected={setSelected} />}
        <div className="overflow-y-auto flex-1">
          <div className={styles.column}>
            {worksData[year].map((image, idx) => {
              return (
                <div
                  key={image.txt}
                  className="relative w-[80%] h-auto cursor-pointer flex justify-center items-center"
                >
                  <Image
                    className={styles.image}
                    src={image.src}
                    alt={image.txt}
                    width={blurredImages[year][idx].width}
                    height={blurredImages[year][idx].height}
                    onClick={handleClick(image)}
                    loading="lazy"
                    placeholder="blur"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    blurDataURL={blurredImages[year][idx].base64}
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
              target={i === 2 || i === 1 ? '_self' : '_blank'}
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
