'use client';

import Navigate from '@/components/ui/navigate/Navigate';
import { useViewerQuery } from '@/hooks/queries/getViewer.hook';
import { useTapScroll } from '@/hooks/useTabScroll';
import cn from '@/utils/common/cn';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Md360,
  MdBlurOn,
  MdClear,
  MdContrast,
  MdExpandLess,
  MdExpandMore,
  MdGraphicEq,
  MdGridOn,
  MdGridView,
  MdLightbulbOutline,
  MdNavigateBefore,
  MdNavigateNext,
  MdOutlineHighlight,
  MdOutlineWbIridescent,
  MdOutlineWbSunny,
  MdQuestionMark,
  MdShare,
} from 'react-icons/md';
import ViewerClass from '../_class/viewer.class';
import styles from '../viewer.module.css';

const delay = 300; // 더블 탭으로 판단하기 위한 시간 간격(밀리초)

function WorksViewerTemplate() {
  const { data: viewerData, isPending, error } = useViewerQuery();
  const [selected, setSelected] = useState(0);
  const [isBottomVisible, setIsBottomVisible] = useState(false);

  const imagesRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<ViewerClass | null>(null);
  const rafRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const guiMainRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const lastTapTime = useRef<number>(0);
  const idleTime = useRef<number>(0);
  const temporalRef = useRef<HTMLDivElement>(null);
  const guiWrapperRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true); // 첫 렌더링 여부 추적

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const { scrollHandlers } =
    useTapScroll({
      ref: imagesRef,
    }) ?? {};

  const toggle = useCallback((target: HTMLElement | SVGElement) => {
    const rightIcon = document.querySelectorAll('.xyzright');
    if (target.classList.value.includes(styles.xyzon)) {
      for (const el of Array.from(rightIcon)) {
        el.classList.remove(styles.xyzon);
      }
      appRef.current?.removeLight();
    } else {
      for (const el of Array.from(rightIcon)) {
        el.classList.remove(styles.xyzon);
      }
      target.classList.add(styles.xyzon);
      if (target.dataset.ui) appRef.current?.lightModeChange(target.dataset.ui);
    }
  }, []);

  const scrollToSelected = useCallback((selected: number) => {
    const swipeAll = document.querySelectorAll(styles.guiSwipeEach);
    if (swipeAll[selected]) {
      swipeAll[selected].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, []);

  const handleBottomLeftClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (appRef.current) {
        if (e.target instanceof SVGElement) {
          const target = e.target.tagName === 'path' ? e.target.parentElement : e.target;
          const bottomUi = document.querySelector(`.${styles.guiSwipe3d}`);
          switch (target?.dataset.ui) {
            case 'expand_less':
              setIsBottomVisible(true);
              bottomUi?.classList.remove(styles.xyzhide);
              scrollToSelected(selected);
              break;
            case 'expand_more':
              setIsBottomVisible(false);
              bottomUi?.classList.add(styles.xyzhide);
              scrollToSelected(selected);
              break;
            case 'question_mark':
              if (target?.classList.value.includes(styles.xyzon)) {
                const midInfo = document.querySelector(`.${styles.midInfo}`);
                const mid3d = document.querySelector(`.${styles.mid3d}`);
                target.classList.remove(styles.xyzon);
                midInfo?.classList.remove(styles.active);
                mid3d?.classList.remove(styles.midChange);
              } else {
                const midInfo = document.querySelector(`.${styles.midInfo}`);
                const mid3d = document.querySelector(`.${styles.mid3d}`);
                target?.classList.add(styles.xyzon);
                midInfo?.classList.add(styles.active);
                mid3d?.classList.add(styles.midChange);
              }
              break;
          }
        }
      }
    },
    [selected, scrollToSelected],
  );

  const handleBottomRightClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (appRef.current) {
        if (e.target instanceof SVGElement) {
          const target = e.target.tagName === 'path' ? e.target.parentElement : e.target;
          if (target?.dataset.ui) {
            switch (target?.dataset.ui) {
              case '360':
                appRef.current.toggleRotation(target);
                break;
              case 'wb_sunny':
                toggle(target);
                break;
              case 'wb_iridescent':
                toggle(target);
                break;
              case 'lightbulb':
                toggle(target);
                break;
              case 'highlight':
                toggle(target);
                break;
              case 'grid_on':
                appRef.current?.toggleWireframe(target);
                break;
              case 'contrast':
                appRef.current?.toggleMap(target);
                break;
              case 'grid_view':
                appRef.current?.togglePixelate(target);
                break;
              case 'graphic_eq':
                appRef.current?.toggleGlitch(target);
                break;
              case 'blur_on':
                appRef.current?.toggleDotScreen(target);
                break;
            }
          }
        }
      } else {
        console.log('not ready!');
        return;
      }
    },
    [toggle],
  );

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (appRef.current !== undefined && appRef.current !== null) {
      if (appRef.current.nowLoading === 0 || e.detail === 2) {
        alert('좀 천천히하셈');
      }
    }
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - lastTapTime.current;

    if (timeDifference < delay && timeDifference > 0) {
      alert('좀 천천히하셈');
    } else {
      if (appRef.current?.nowLoading === 0) {
        alert('좀 천천히하셈');
      }
    }
    lastTapTime.current = currentTime; // 마지막 탭 시간을 현재 시간으로 업데이트
  }, []);

  const preventTouch = useCallback(() => {
    if (temporalRef.current && guiWrapperRef.current && imagesRef.current) {
      temporalRef.current.style.display = 'flex';
      temporalRef.current.style.opacity = '1';
      guiWrapperRef.current.style.opacity = '0.8';
      guiWrapperRef.current.style.pointerEvents = 'none';
      guiWrapperRef.current.style.touchAction = 'none';
      imagesRef.current.style.pointerEvents = 'none';
      imagesRef.current.style.touchAction = 'none';
    }
  }, []);

  const handleNext = useCallback(() => {
    preventTouch();
    if (appRef.current && viewerData && selected < viewerData.length - 1) {
      appRef.current?.next();
      setSelected((prev) => prev + 1);
      router.push(`${pathname}?${createQueryString('number', (selected + 1).toString())}`);
    }
  }, [viewerData, selected, preventTouch, router, pathname, createQueryString]);

  const handlePrev = useCallback(() => {
    preventTouch();
    if (appRef.current && viewerData && selected > 0) {
      appRef.current?.prev();
      setSelected((prev) => prev - 1);
      router.push(`${pathname}?${createQueryString('number', (selected - 1).toString())}`);
    }
  }, [viewerData, selected, preventTouch, router, pathname, createQueryString]);

  const handleThumbnailClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (appRef.current) {
        if (e.target instanceof HTMLDivElement) {
          const target = e.target;
          const num = target.dataset.num;
          if (num) {
            if (Number.parseInt(num) === selected) return;
            preventTouch();
            setSelected(Number.parseInt(num));
            appRef.current.selectedChange(Number.parseInt(num));
            scrollToSelected(Number.parseInt(num));
            router.push(`${pathname}?${createQueryString('number', num)}`);
          }
        }
      }
    },
    [scrollToSelected, selected, preventTouch, router, pathname, createQueryString],
  );

  const handleShare = useCallback(() => {
    if (window.innerWidth > 575) {
      window.navigator.clipboard.writeText(window.location.href);
    } else if (window.innerWidth <= 575) {
      /** ==== when mobile auto open share api ==== */
      if (navigator.share) {
        navigator
          .share({
            title: 'works-viewer',
            text: "EunOh's works-viewer",
            url: window.location.href,
          })
          .then(() => {
            console.log('Thanks for sharing!');
          })
          .catch(console.error);
      } else {
        /** ==== when desktop write Url to clipbaord ==== */
        window.navigator.clipboard.writeText(window.location.href);
      }
    }
    const copied = document.createElement('div');
    copied.setAttribute('class', styles.xyzCopied);
    copied.innerText = 'URL Copied!';
    guiMainRef.current?.insertAdjacentElement('afterbegin', copied);

    const timer = setTimeout(() => {
      copied.remove();
      clearTimeout(timer);
    }, 700);
  }, []);

  const handleClear = useCallback(() => {
    appRef.current?.destroy();
  }, []);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  useEffect(() => {
    const idleTimeReset = () => {
      idleTime.current = 0;
      console.log('idleTime reset');
    };
    document.body.addEventListener('click', idleTimeReset);
    document.documentElement.style.overscrollBehavior = 'none';

    return () => {
      document.documentElement.style.overscrollBehavior = 'auto';
      document.body.removeEventListener('click', idleTimeReset);
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      window.onresize = null;
    };
  }, []);

  useEffect(() => {
    const number = searchParams.get('number');
    if (canvasRef.current && viewerData && isFirstRender.current) {
      if (number && Number(number) >= 0) {
        setSelected(Number.parseInt(number));
      }
      router.push(`${pathname}?${createQueryString('number', number ?? '0')}`);
      appRef.current = new ViewerClass(
        canvasRef.current,
        viewerData,
        Number.parseInt(number ?? '0'),
      );
    }

    if (appRef.current) {
      window.onresize = appRef.current.resize.bind(appRef.current);
      appRef.current.resize();

      const animate = () => {
        appRef.current?.render(); // 실제 렌더링 함수
        rafRef.current = requestAnimationFrame(animate);
      };
      animate();
      isFirstRender.current = false;
    }
    // 린트 경고 무시: 검색 파라미터가 업데이트되더라도 첫 렌더링 이후에는 동작하지 않도록
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewerData, searchParams, createQueryString, pathname, router]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      idleTime.current = idleTime.current + 1;
      if (idleTime.current >= 3) {
        // 3 minutes
        console.log('reload!');
        router.refresh();
      }
    }, 60000);
  }, [router]);

  return (
    <>
      <div>
        <div className={styles.temporal} ref={temporalRef} />
      </div>

      <div className={styles.guiMain3d} ref={guiMainRef}>
        <div className={styles.xyzNoneLandscape}>
          <h3>Looks good in portrait mode!</h3>
        </div>
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <div
          className={styles.guiWrapper3d}
          onClick={handleMouseDown}
          onTouchEnd={handleTouchEnd}
          ref={guiWrapperRef}
        >
          <div className={styles.top3d}>
            <div className="h-6 flex items-center">
              <MdShare
                className="xyzright w-5 h-5 cursor-pointer select-all pointer-events-auto"
                onClick={handleShare}
              />
            </div>
            <Link href="/works/2023">
              <MdClear
                className="xyzright w-6 h-6 cursor-pointer select-all pointer-events-auto"
                onClick={handleClear}
              />
            </Link>
          </div>

          <div className={styles.mid3d}>
            <div className={styles.midLeft3d}>
              <MdNavigateBefore
                className="xyznavigate w-6 h-6 cursor-pointer select-all pointer-events-auto"
                onClick={handlePrev}
              />
            </div>
            <div className={styles.midRight3d}>
              <MdNavigateNext
                className="xyznavigate w-6 h-6 cursor-pointer select-all pointer-events-auto"
                onClick={handleNext}
              />
            </div>
            <div className={styles.xyzLoading} />
          </div>

          <div className={styles.midInfo}>
            <p>{viewerData?.[selected].title}</p>
            <p>{viewerData?.[selected].author}</p>
            <p>{viewerData?.[selected].year}</p>
            <p>{viewerData?.[selected].size}</p>
            <p>{viewerData?.[selected].material}</p>
          </div>

          <div className={styles.btm3d}>
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <div className={styles.btmLeft3d} onClick={handleBottomLeftClick}>
              <MdExpandLess
                className={cn(
                  'xyzleft w-6 h-6 cursor-pointer',
                  isBottomVisible ? 'hidden' : 'visible',
                )}
                data-ui="expand_less"
              />
              <MdExpandMore
                className={cn(
                  'xyzleft w-6 h-6 cursor-pointer',
                  isBottomVisible ? 'visible' : 'hidden',
                )}
                data-ui="expand_more"
              />
              <MdQuestionMark className="xyzleft w-6 h-6 cursor-pointer" data-ui="question_mark" />
            </div>
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <div className={styles.btmRight3d} onClick={handleBottomRightClick}>
              <Md360 className="xyzright w-6 h-6 cursor-pointer" data-ui="360" />
              <MdOutlineWbSunny className="xyzright w-6 h-6 cursor-pointer" data-ui="wb_sunny" />
              <MdOutlineWbIridescent
                className="xyzright w-6 h-6 cursor-pointer"
                data-ui="wb_iridescent"
              />
              <MdLightbulbOutline className="xyzright w-6 h-6 cursor-pointer" data-ui="lightbulb" />
              <MdOutlineHighlight className="xyzright w-6 h-6 cursor-pointer" data-ui="highlight" />
              <MdGridOn className="xyzview w-6 h-6 cursor-pointer" data-ui="grid_on" />
              <MdContrast className="xyzview w-6 h-6 cursor-pointer" data-ui="contrast" />
              <MdGridView className="xyzeffects w-6 h-6 cursor-pointer" data-ui="grid_view" />
              <MdGraphicEq className="xyzeffects w-6 h-6 cursor-pointer" data-ui="graphic_eq" />
              <MdBlurOn className="xyzeffects w-6 h-6 cursor-pointer" data-ui="blur_on" />
            </div>
          </div>

          <div className={`${styles.guiSwipe3d} ${styles.xyzhide}`}>
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <div className={styles.guiSwipeEachBox} ref={imagesRef} onClick={handleThumbnailClick}>
              {viewerData?.map((item, index) => (
                <div
                  className={styles.guiSwipeEach}
                  key={item.id}
                  data-num={index}
                  style={{ backgroundImage: `url(${item.thumb})` }}
                />
              ))}
              {scrollHandlers?.createScrollLeft && scrollHandlers?.createScrollRight && (
                <div className="absolute flex w-dvw h-full top-[50%]">
                  <Navigate
                    mode="before"
                    onClick={scrollHandlers.createScrollLeft()}
                    className={cn(isBottomVisible ? 'visible' : 'hidden')}
                  />
                  <Navigate
                    mode="after"
                    onClick={scrollHandlers.createScrollRight()}
                    className={cn(isBottomVisible ? 'visible' : 'hidden')}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.xyzCanvas} ref={canvasRef} />
      </div>
    </>
  );
}

export default WorksViewerTemplate;
