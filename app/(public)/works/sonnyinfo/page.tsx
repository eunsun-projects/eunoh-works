/* eslint-disable @next/next/no-img-element */
// import SonnyInfo from "./_components/sonnyInfo";
import styles from '@/app/(public)/works/sonnyinfo/sonnyinfo.module.css';
import { basicMeta } from '@/app/basicMeta';
import { alumni, rubicmono, silkscreen } from '@/app/fonts';
import OverScrollBehavior from '@/components/common/OverScrollBehavior';
import type { SonnyInfo } from '@/types/sonny.type';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import SonnyGoals from './_components/SonnyGoals';
const Timer = dynamic(() => import('@/app/(public)/works/sonnyinfo/_components/Timer'), {
  ssr: false,
});

export const metadata = basicMeta;

async function getData(): Promise<SonnyInfo | null> {
  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/eunohhh/get_sonny_goals/main/goals/goals.json',
      {
        method: 'GET',
        next: { revalidate: 3600 }, // 1시간마다 재검증
      },
    );

    if (response.ok) {
      const result: SonnyInfo = await response.json();
      console.log('데이터 수신 성공');
      return result;
    }
    console.log('데이터 수신 실패', response.statusText);
    // fallback 데이터 반환
    return {
      player: 'Son Heung-min',
      goals: '100',
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.log('API 호출 중 에러 발생:', error);
    // fallback 데이터 반환
    return {
      player: 'Son Heung-min',
      goals: '100',
      timestamp: new Date().toISOString(),
    };
  }
}

export default async function SonnyPage() {
  const sonnyInfo = await getData();

  return (
    <>
      <OverScrollBehavior />
      <div className={styles.sonnypage}>
        <div className={styles.sonnycontents}>
          <Link href={'/works/2023'}>
            <p className={styles.sonnytitle}>...요즘 같은 세상에 진심 기념할만한...?</p>
          </Link>

          <div className={styles.sonnybanner}>
            <p className={styles.sonnystar}>
              {'*******************************************************************'}
            </p>
            <div className={styles.sonnybannercon}>
              <Link href={'/works/2023'}>
                <img
                  className={styles.sonnyphoto}
                  src="/assets/sonnyinfo/photo.webp"
                  alt="sonnyshot"
                />
              </Link>
              <div className={`${styles.bannercon} ${alumni.className}`}>
                <div className={`${styles.sonnytime} ${rubicmono.className}`}>
                  <Timer />
                </div>
                <p>HAPPY</p>
                <div className={styles.bannercontwo}>
                  <p className={styles.sonnymark}>!</p>
                  {/* <p className={styles.sonnynum}>{String(goals.goals)}</p> */}
                  <SonnyGoals sonnyInfo={sonnyInfo} />
                  <p className={styles.sonnygoal}>GOAL</p>
                  <p className={styles.sonnymark}>!</p>
                </div>
              </div>
              <Link href={'/works/2023'}>
                <img
                  className={styles.sonnyphoto}
                  src="/assets/sonnyinfo/photo.webp"
                  alt="sonnyshot"
                />
              </Link>
            </div>
            <p className={styles.sonnystar}>
              {'*******************************************************************'}
            </p>
          </div>

          <div className={styles.sonnytext}>
            <p>
              조각이 다시 무언가를 기념할 수 있다면, 그 대상은 무엇이 되면 좋을까 생각해왔는데요.
              <br />
              요즘에는 함부로 조각을 통해, 거기다 형상을 통해 무언가를 기념하는 일이 쉽지는 않은 것
              같더라고요.
              <br />
              하지만 그러한 오늘날에도, 손흥민 선수라면 진심으로 기념할 수 있을 것 같았어요?
              <br />
              <br />
              아무튼 이런저런 생각을 하다가 몇 해 전에 손흥민 선수를 기념하는 조각을 하나
              만들었습니다.
              <br />
              엄청 재밌게 만들었는데 다 만들고보니까 마음에 안들기도하고 뭔가 부족해서 저기
              쳐박아놨다가 폐기했어요.
              <br />
              근데 다행히? 사진을 많이 찍어놔서 3D 파일로 만들 수 있겠더라구요.
              <br />
              <br />
              그래서 겸사겸사 3D로 만들었는데 어디 써먹을 데가 없어가지고.
              <br />
              웹에서 볼 수 있으면 좋겠다 해서 띄워봤는데 또 너무 심심한 것 같아서 몇 가지 효과를
              입혀본 그런 것입니다.
              <br />
              나이스 원 쏘니!
            </p>
          </div>

          <div className={styles.sonnygif}>
            <Image
              className={styles.sonnygifimg}
              src="/assets/sonnyinfo/sonny_low.gif"
              alt="sonnygif"
              unoptimized={true}
            />
          </div>

          <p className={styles.sonnycaption}>Sonny_2023_responsive web</p>

          <Link href="/works/sonny">
            <div className={`${styles.sonnyviewpage} ${silkscreen.className}`}>click</div>
          </Link>
        </div>
      </div>
    </>
  );
}
