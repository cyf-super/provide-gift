import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import giftList from './data/gift.json';
import daily from './data/daily.json';

type Item = (typeof giftList)[number]['list'][number];

function App() {
  const [type, setType] = useState('');
  const [item, setItem] = useState<Item>({} as Item);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen && type && item) {
    }
  }, [isOpen]);

  const toggleDrawer = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (!newState) {
      setItem({} as Item);
      setType('');
    }
  };

  const onView = (type: string, item: Item) => {
    setItem(item);
    setType(type);
    toggleDrawer();
  };

  const onCopy = (type: string, name: string) => {
    copyToClipboard(`【${type}】— ${name}`);
  };

  const copyToClipboard = (text: string) => {
    // 创建一个临时的 input 元素
    const tempInput = document.createElement('input');
    // 设置其值为要复制的文本
    tempInput.value = text;
    // 将临时 input 添加到文档中
    document.body.appendChild(tempInput);
    // 选中 input 中的文本
    tempInput.select();
    // 执行复制命令
    document.execCommand('copy');
    // 移除临时 input
    document.body.removeChild(tempInput);
  };

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
        <section className="typesBox">
          <div className="title">
            <span>类型</span>
          </div>
          <div className="types">
            {giftList.map(item => (
              <div key={item.type} className="type">
                {item.type}
              </div>
            ))}
          </div>
        </section>
        <section className="container">
          {giftList.map(item => (
            <div key={item.type} className="typeModule">
              <div className="type"><span className='icon' style={{background: `url(/icons/${item.type}.svg) center/100% 100% no-repeat`}}></span>{item.type}</div>
              <div>
                {item.list.map(data => (
                  <li className="item">
                    <div className="name">{data.name}</div>
                    <div className="handle">
                      <span onClick={() => onView(item.type, data)}>详情</span>
                      <span
                        className="copy"
                        onClick={() => onCopy(item.type, data.name)}
                      >
                        复制
                      </span>
                    </div>
                  </li>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>

      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
        size={'100vw'}
      >
        <div className={styles.drawer} onScroll={e => e.stopPropagation()}>
          <div
            className="header"
            onScroll={e => {
              e.stopPropagation();
            }}
          >
            <span className="closeIcon" onClick={toggleDrawer}></span>
            <div>大纲和目录</div>
          </div>
          <section>
            {item.images?.map(name => (
              <img src={`/${type}/${item.imgSrc}/${name}`} key={name} />
            ))}
          </section>
          <button className="btn" onClick={toggleDrawer}>
            复制并返回
          </button>
        </div>
      </Drawer>
    </>
  );
}

export default App;
