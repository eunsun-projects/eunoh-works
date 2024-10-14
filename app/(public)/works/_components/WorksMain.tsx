import styles from '@/app/(public)/works/_components/works.module.css';
import { gothicA1 } from '@/app/fonts';

export default function WorksMain() {
  return (
    <div className="flex-1 flex items-center">
      <div className={`${styles.worksdef} ${gothicA1.className}`}>
        <h3>년도를 선택하세요 {':)'}</h3>
      </div>
    </div>
  );
}
