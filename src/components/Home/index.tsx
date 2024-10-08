import styles from './index.module.scss';
import daily from '../../data/daily.json';
import { motion } from 'framer-motion';

const visible = { opacity: 1, y: 0, transition: { duration: 0.5 } };

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible
};

export default function Home() {
  return (
    <>
      <motion.div
        className={styles.box}
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, transition: { duration: 1 } }}
        variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
      >
        <motion.div
          className="shopTitle"
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible
          }}
        >
          长安不止三万里
        </motion.div>
        <motion.header className="header" variants={itemVariants}>
          <h2>好评送礼</h2>
          <div className="detail">
            <div className="first">
              <span>几个字</span> + <span className="start">五星好评</span>
            </div>
            <div>您可以任选一份资料【免费赠送】</div>
          </div>
          <p>希望能够帮到您～</p>
        </motion.header>
        <motion.section className="yijvBox" variants={itemVariants}>
          <div className="yijv">每日一句</div>
          <div
            dangerouslySetInnerHTML={{ __html: daily[new Date().getDate()] }}
            className="detail"
          ></div>
        </motion.section>
        <motion.section className="explain">
          1.喜欢的资源，复制名称后找店小二领取呢
          <br />
          2.保持更新，每周都会新增资源，敬请期待
          <br />
          3.百分之百免费，发百度网盘哦
        </motion.section>
      </motion.div>
    </>
  );
}
