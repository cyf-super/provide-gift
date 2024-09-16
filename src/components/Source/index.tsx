import { useState } from 'react';
import styles from './index.module.scss';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import giftList from '../../data/gift.json';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Toaster, toast } from 'sonner';

type Item = (typeof giftList)[number]['list'][number];
const THEME = [
  '#0990ff',
  '#FF8449',
  '#4CC410',
  '#e5983a',
  '#059581',
  '#8426f0',
  '#315CF3',
  '#04db48',
  '#777b00',
  '#db5e04'
];

export default function Source() {
  const [type, setType] = useState('');
  const [item, setItem] = useState<Item>({} as Item);
  const [isOpen, setIsOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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

  const onCopyReturn = () => {
    onCopy(type, item.name);
    toggleDrawer();
  };

  const onCopy = (type: string, name: string) => {
    copyToClipboard(`【${type}】— ${name}`);
  };

  const copyToClipboard = (text: string) => {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    toast.success('复制成功，快去找店小二领取叭~', {
      style: {
        background: 'rgba(255,255,255,0.5)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(1, 1, 1, 0.25)'
      },
      className: styles.toast
    });
  };

  return (
    <>
      <div className={styles.box}>
        <motion.div className="progressBar" style={{ scaleX }} />
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
          {giftList.map((item, index) => (
            <div key={item.type} className="typeModule">
              <div className="type">
                <span
                  className="icon"
                  style={{
                    background: `url(/icons/${item.type}.svg) center/100% 100% no-repeat`
                  }}
                ></span>
                {item.type}
              </div>
              <div className="list">
                {item.list.map(data => (
                  <li className="item" key={data.name}>
                    <div className="name" style={{ color: THEME[index] }}>
                      {data.name}
                    </div>
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
          <button className="btn" onClick={onCopyReturn}>
            复制并返回
          </button>
        </div>
      </Drawer>

      <Toaster
        position="top-center"
        toastOptions={{
          // unstyled: true,
          classNames: {
            error: 'bg-red-400',
            success: 'text-green-400',
            warning: 'text-yellow-400',
            info: 'bg-blue-400'
          }
        }}
      />
    </>
  );
}
