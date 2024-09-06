import styles from './index.module.scss'

export default function Loading() {
    return <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <div className={styles.text}>正在拼命加载中...</div>
    </div>
}