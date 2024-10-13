"use client";
import styles from "@/app/(public)/texts/_components/texts.module.css";
import usePagination from "@/hooks/useTextindex";
import { PaginationProps } from "@/types/texts.type";
import { sliceArrayByLimit } from "@/utils/texts/sliceArrayByLimit";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

// 총 페이지 갯수에 따라 Pagination 갯수 정하기, limit 단위로 페이지 리스트 넘기기
const Pagination = ({ totalPage, limit, page, curr }: PaginationProps) => {
    const {
        setAction: { setPage, setCurrNum },
    } = usePagination();
    const router = useRouter();

    const totalPageArray = useMemo(() => {
        const slicedPageArray = sliceArrayByLimit(totalPage.length, limit);

        return slicedPageArray;
    }, [totalPage, limit]);

    const [currentPageArray, setCurrentPageArray] = useState(totalPageArray[page]);

    const handleClick = (item: number, index: number) => (e: React.MouseEvent<HTMLSpanElement>) => {
        e.preventDefault();
        const target = Number(e.currentTarget.innerText);

        setCurrNum(index);
        totalPageArray.forEach((e, i) => {
            if (e.includes(target - 1)) {
                setPage(i);
            }
        });
        router.push(`/texts/article${item + 1 < 10 ? "0" + (item + 1) : item + 1}`);
    };

    const handleBefore = () => {
        if (page > 0) setPage(page - 1);
        setCurrNum(null);
    };

    const handleAfter = () => {
        if (page < totalPageArray.length - 1) setPage(page + 1);
        setCurrNum(null);
    };

    useEffect(() => {
        setCurrentPageArray(totalPageArray[page]);
    }, [page, totalPageArray]);

    return (
        <div
            className={styles.pagination}
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div className={styles.nextbefore}>
                <span onClick={() => setCurrentPageArray(totalPageArray[0])}>{"《"}</span>
                <span onClick={handleBefore}>{"〈"}</span>
            </div>

            <div>
                {currentPageArray?.map((e, i) => (
                    <Link key={i} href={totalPage[e].href as string} prefetch={false}>
                        <span
                            onClick={handleClick(e, i)}
                            // aria-current={page === i - 1 ? 'page' : null}
                            style={{
                                color: curr === i ? "rgb(255, 100, 100)" : "black",
                            }}
                        >
                            {e + 1}
                        </span>
                    </Link>
                ))}
            </div>

            <div className={styles.nextbefore}>
                <span onClick={handleAfter}>{"〉"}</span>
                <span onClick={() => setCurrentPageArray(totalPageArray[totalPageArray.length - 1])}>{"》"}</span>
            </div>
        </div>
    );
};

export default Pagination;
