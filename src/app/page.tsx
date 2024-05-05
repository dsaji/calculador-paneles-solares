import PanelsForm from '../components/PanelsForm';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <PanelsForm />
    </main>
  );
}
