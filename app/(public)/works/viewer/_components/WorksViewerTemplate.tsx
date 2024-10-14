'use client';

import { useViewerQuery } from '@/hooks/queries/getViewer.hook';
import { useTapScroll } from '@/hooks/useTabScroll';
import Link from 'next/link';
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
} from 'react-icons/md';
import ViewerClass from '../_class/viewer.class';
import styles from '../viewer.module.css';

const delay = 300; // 더블 탭으로 판단하기 위한 시간 간격(밀리초)

function WorksViewerTemplate() {
  const { data: viewerData, isPending, error } = useViewerQuery();
  const [selected, setSelected] = useState(0);

  const imagesRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<ViewerClass | null>(null);
  const rafRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const guiMainRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const loadDivRef = useRef<HTMLDivElement>(null);
  const lastTapTime = useRef<number>(0);
  const idleTime = useRef<number>(0);

  const { scrollHandlers } =
    useTapScroll({
      ref: imagesRef,
    }) ?? {};

  const toggle = useCallback((target: SVGElement) => {
    const rightIcon = document.querySelectorAll('.xyzright');
    if (target.classList.value.includes(styles.xyzon)) {
      rightIcon.forEach((el) => {
        el.classList.remove(styles.xyzon);
      });
      appRef.current?.removeLight();
    } else {
      rightIcon.forEach((el) => {
        el.classList.remove(styles.xyzon);
      });
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
          const target = e.target;
          const bottomUi = document.querySelector(styles.guiSwipe3d);
          switch (target.dataset.ui) {
            case 'expand_less':
              bottomUi?.classList.remove(styles.xyzhide);
              scrollToSelected(selected);
              break;
            case 'expand_more':
              bottomUi?.classList.add(styles.xyzhide);
              scrollToSelected(selected);
              break;
            case 'question_mark':
              const midInfo = document.querySelector(styles.midInfo);
              const mid3d = document.querySelector(styles.mid3d);
              if (target.classList.value.includes(styles.xyzon)) {
                target.classList.remove(styles.xyzon);
                midInfo?.classList.remove(styles.active);
                mid3d?.classList.remove(styles.midChange);
              } else {
                target.classList.add(styles.xyzon);
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
          const target = e.target;
          switch (target.dataset.ui) {
            case '360':
              appRef.current.toggleRotation(target);
              break;
            case 'wb_sunny':
              console.log(target);
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
      } else {
        console.log('not ready!');
        return;
      }
    },
    [appRef, toggle],
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (appRef.current !== undefined && appRef.current !== null) {
        if (appRef.current.nowLoading === 0 || e.detail === 2) {
          alert('좀 천천히하셈');
        }
      }
    },
    [appRef],
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      let currentTime = new Date().getTime();
      let timeDifference = currentTime - lastTapTime.current;

      if (timeDifference < delay && timeDifference > 0) {
        alert('좀 천천히하셈');
      } else {
        if (appRef.current?.nowLoading === 0) {
          alert('좀 천천히하셈');
        }
      }
      lastTapTime.current = currentTime; // 마지막 탭 시간을 현재 시간으로 업데이트
    },
    [appRef],
  );

  const handleNext = useCallback(() => {
    appRef.current?.next();
    setSelected((prev) => prev + 1);
  }, [appRef, setSelected]);

  const handlePrev = useCallback(() => {
    appRef.current?.prev();
    setSelected((prev) => prev - 1);
  }, [appRef, setSelected]);

  const handleThumbnailClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (appRef.current) {
        if (e.target instanceof HTMLDivElement) {
          const target = e.target;
          const num = target.dataset.num;
          if (num) {
            setSelected(parseInt(num));
          }
        }
      }
    },
    [appRef, setSelected],
  );

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  useEffect(() => {
    scrollToSelected(selected);
  }, [selected, scrollToSelected]);

  useEffect(() => {
    const idleTimeReset = () => {
      idleTime.current = 0;
      console.log('idleTime reset');
    };

    if (canvasRef.current && overlayRef.current && loadDivRef.current && viewerData) {
      appRef.current = new ViewerClass(
        canvasRef.current,
        overlayRef.current,
        loadDivRef.current,
        viewerData,
      );

      window.onresize = appRef.current.resize.bind(appRef.current);
      appRef.current.resize();

      const animate = () => {
        appRef.current?.render(); // 실제 렌더링 함수
        rafRef.current = requestAnimationFrame(animate);
      };
      animate();
    }
    document.body.addEventListener('click', idleTimeReset);

    intervalRef.current = setInterval(() => {
      idleTime.current = idleTime.current + 1;
      if (idleTime.current >= 3) {
        // 3 minutes
        console.log('reload!');
        // router.push("/sonny");
      }
    }, 60000);

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
      appRef.current?.destroy();
    };
  }, [viewerData]);

  return (
    <div className={styles.guiMain3d} ref={guiMainRef}>
      <div className={styles.temporal} ref={overlayRef}></div>
      <div className={styles.xyzNoneLandscape}>
        <h3>Looks good in portrait mode!</h3>
      </div>
      <div className={styles.guiWrapper3d} onClick={handleMouseDown} onTouchEnd={handleTouchEnd}>
        <div className={styles.top3d}>
          <Link href="/works/2023">
            <MdClear className="xyzright w-6 h-6 cursor-pointer select-all pointer-events-auto" />
          </Link>
        </div>

        <div className={styles.mid3d}>
          <div className={styles.midLeft3d}>
            <MdNavigateBefore className="xyznavigate w-6 h-6 cursor-pointer" onClick={handlePrev} />
          </div>
          <div className={styles.midRight3d}>
            <MdNavigateNext className="xyznavigate w-6 h-6 cursor-pointer" onClick={handleNext} />
          </div>
          <div className={styles.xyzLoading} ref={loadDivRef}></div>
        </div>

        <div className={styles.midInfo}>
          <p>{viewerData?.[selected].title}</p>
          <p>{viewerData?.[selected].author}</p>
          <p>{viewerData?.[selected].year}</p>
          <p>{viewerData?.[selected].size}</p>
          <p>{viewerData?.[selected].material}</p>
        </div>

        <div className={styles.btm3d} onClick={handleBottomLeftClick}>
          <div className={styles.btmLeft3d}>
            <MdExpandLess className="xyzright w-6 h-6 cursor-pointer" data-ui="expand_less" />
            <MdExpandMore className="xyzright w-6 h-6 cursor-pointer" data-ui="expand_more" />
            <MdQuestionMark className="xyzright w-6 h-6 cursor-pointer" data-ui="question_mark" />
          </div>
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
      </div>

      <div className={`${styles.guiSwipe3d} ${styles.xyzhide}`}>
        <div className={styles.guiSwipeEachBox} ref={imagesRef} onClick={handleThumbnailClick}>
          {viewerData?.map((item, index) => (
            <div
              className={styles.guiSwipeEach}
              key={item.id}
              data-num={index}
              style={{ backgroundImage: `url(${item.thumb})` }}
            />
          ))}
        </div>
      </div>

      <div className={styles.xyzCanvas} ref={canvasRef}></div>
    </div>
  );
}

export default WorksViewerTemplate;
