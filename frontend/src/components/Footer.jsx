import styles from './Footer.module.css';

export default function footer() {
  return (
    <footer className={styles.copyrightContainer}>
      <p className={styles.text}>
        Copyright © Designed & Developed by {' '}
        <span className={styles.primaryHighlight}>sidiki 2026</span>
      </p>
    </footer>
  )
}
