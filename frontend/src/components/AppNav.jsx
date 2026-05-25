import PageNav from "./PageNav";
import styles from './AppNav.module.css';
import Content from "./Content";
import Header from "./Header";

export default function AppNav() {
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <Header  />
        </div>


  <div className={styles.layout}>
    <nav className={styles.sidebar}>
      <PageNav />
    </nav>

    <main className={styles.content}>
      <Content />
    </main>
    </div>
   
</div>
  )
}
