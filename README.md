## eunoh.top

### 미술가 홈페이지

개발 기간: 2023.01 ~ 2023.04  
플랫폼: web  
개발인원: FE 1명(개인프로젝트)  
담당역할: 프론트엔드

### 개발 환경

언어: TypeScript ^5, HTML/CSS  
프레임워크: Next.js 13, React 18  
데이터베이스: Supabase Baas  
라이브러리: Three.js, Zustand, Tailwind

### 주요 기능

#### ✅ 작품 갤러리
🔹 이미지 로딩 시 Next.js의 Image 컴포넌트에서 placeholder="blur"를 적용하였습니다.  
🔹 sharp 라이브러리를 사용해 블러 이미지를 생성하고 base64로 활용했습니다.

#### ✅ 작가 노트 게시판
🔹 Context API를 사용하여 페이지네이션 상태를 필요한 부분에 한해 전역적으로 관리하였습니다.  
🔹 react-markdown 라이브러리를 활용하여 .md 파일로 작성된 글을 렌더링했습니다.

#### ✅ 3D 작품 뷰어
🔹 3D 스캔된 작품을 웹에서 볼 수 있는 GLB 뷰어 기능을 구현했습니다.  
🔹 Three.js 라이브러리를 사용하여 GLB 형식의 3D 파일을 브라우저에서 렌더링했습니다.  
🔹 드래그와 휠을 통해 작품을 확대/축소하고 다양한 각도에서 감상할 수 있도록 구현했습니다.

### 트러블 슈팅

#### ✅ Next.js Image의 성능 이슈
🔹 문제 : Next Image의 최적화 및 성능 향상을 기대하였으나, 오히려 LCP 지표가 악화되는 문제가 발생하였습니다.  
🔹 해결 : priority로 이미지 우선순위를 조정하고, 필요한 경우 unoptimized로 설정하여 LCP 지표를 개선했습니다.  
🔹 성과 : 이미지 로딩 속도가 개선되어 Lighthouse 퍼포먼스 점수가 80점 대에서 95점 이상으로 상승하였습니다.

#### ✅ requestAnimationFrame 관련 문제
🔹 문제 : 클래스로 작성된 Three.js 인스턴스에서 render 메서드를 호출할 때 requestAnimationFrame이 정상 작동하지 않았습니다.  
🔹 해결 : 클래스 인스턴스의 메서드에서 호출하는 대신, useEffect 내부에서 직접 requestAnimationFrame을 호출하여 루프를 관리했습니다.  
🔹 성과 : React 컴포넌트에서 requestAnimationFrame을 효과적으로 사용하는 방법을 습득하였습니다.

#### ✅ Puppeteer와 GitHub Actions를 통한 데이터 업데이트
🔹 문제 : 특정 축구선수의 골 수를 자동으로 업데이트하고 관리할 방법이 필요했습니다.  
🔹 해결 : Puppeteer로 최신 데이터를 스크래핑하여 GitHub Actions으로 6시간마다 실행되도록 설정하였습니다.  
🔹 성과 : 별도의 서버 관리 없이 지속적으로 데이터를 업데이트하고 JSON으로 제공할 수 있었습니다.
