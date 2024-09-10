import styles from './index.module.scss';
import daily from '../../data/daily.json';

export default function Home() {
  return (
    <>
      <div className={styles.box}>
        <div className="shopTitle">长安不止三万里</div>
        <header className="header">
          <h2>好评送礼</h2>
          <div className="detail">
            <div className="first">
              <span>几个字</span> + <span className="start">五星好评</span>
            </div>
            <div>您可以任选一份资料【免费赠送】</div>
          </div>
          <p>非常感谢您</p>
        </header>
        <section className="yijvBox">
          <div className="yijv">每日一句</div>
          <div
            dangerouslySetInnerHTML={{ __html: daily[new Date().getDay()] }}
            className="detail"
          ></div>
        </section>
      </div>
    </>
  );
}
