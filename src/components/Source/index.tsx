import { useCallback, useEffect, useState } from 'react';
import styles from './index.module.scss';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import giftList from '../../data/gift.json';
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform
} from 'framer-motion';
import { Toaster, toast } from 'sonner';
// import { SelectBox } from '../common/Menu';

interface ListItem {
  type: string;
  list: Item[];
}

type Item = {
  name: string;
  imgSrc: string;
  images: string[];
  detail?: string;
  new?: boolean;
  hot?: boolean;
};
const THEME = [
  '#0990ff',
  '#3484b2',
  '#4CC410',
  '#e5983a',
  '#059581',
  '#8426f0',
  '#315CF3',
  '#04db48',
  '#777b00',
  '#db5e04'
];

// const OPTIONS = [
//   {
//     label: '全部',
//     value: 'all'
//   },
//   {
//     label: '最新',
//     value: 'new'
//   },
//   {
//     label: '热门',
//     value: 'hot'
//   }
// ];

const SCROLL_TOP = 1600;

export default function Source() {
  const [type, setType] = useState('');
  const [item, setItem] = useState<Item>({} as Item);
  const [list, setList] = useState<ListItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');
  const [num, setNum] = useState(0);
  const [showScroll, setShowScroll] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    setList(giftList);

    window.addEventListener('scroll', scrollHandle);
    return () => {
      window.removeEventListener('scroll', scrollHandle);
    };
  }, []);

  useEffect(() => {
    const data = list.reduce((res, itemList) => {
      res += itemList.list.length;
      return res;
    }, 0);
    setNum(data);
  }, [list.length]);

  function scrollHandle() {
    const top = document.documentElement.scrollTop;
    setShowScroll(top > SCROLL_TOP);
  }

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

  const onSearch = (value: string) => {
    setValue(value);
    if (!value.trim()) {
      setList(giftList);
    }
  };

  const searchList = useCallback((value: string) => {
    const newList: ListItem[] = [];
    giftList.forEach(typeList => {
      const l = typeList.list.filter(item => {
        const patt = new RegExp(value, 'i');
        return patt.test(item.name);
      });
      if (l.length) {
        newList.push({
          list: l,
          type: typeList.type
        });
      }
    });
    setList(newList);
  }, []);

  const onScroll = (id: string) => {
    const node = document.getElementById(id);
    node?.scrollIntoView({ behavior: 'smooth' });
  };

  const onScrollTop = () => {
    window.scrollTo({
      behavior: 'smooth',
      top: 0
    });
  };

  return (
    <>
      <div className={styles.box}>
        <motion.div className="numSources">
          资源数量：
          <AnimatedNumber value={num} />
        </motion.div>
        <motion.div className="progressBar" style={{ scaleX }} />
        <section className="typesBox">
          <div className="title">
            <span>类型</span>
            <span className="explain">点击滚动到对应类别</span>
          </div>
          <div className="types">
            {list.map(item => (
              <div
                key={item.type}
                className="type"
                onClick={() => onScroll(item.type)}
              >
                {item.type}
              </div>
            ))}
          </div>
        </section>

        <section className="search">
          {/* <SelectBox value={} onSelect={} OPTIONS={OPTIONS}></SelectBox> */}
          <span className="searchIcon"></span>
          <span className="clearIcon"></span>
          <input
            type="text"
            placeholder="搜索资源"
            value={value}
            onChange={e => onSearch(e.target.value)}
          />
          <button onClick={() => searchList(value.trim())}>搜索</button>
        </section>

        <motion.div
          layout
          layoutId={'list'}
          className="list-container"
          id="list"
        >
          <section className="container">
            <AnimatePresence>
              {list.map((item, index) => (
                <div key={item.type} className="typeModule" id={item.type}>
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
                    {item.list.map((data, i) => (
                      <li className="item" key={data.name}>
                        <div className="name" style={{ color: THEME[index] }}>
                          <div>
                            {i + 1}. {data.name}
                            {data.new && <span className="new"></span>}
                            {data.hot && <span className="hot"></span>}
                          </div>
                        </div>
                        <div className="handle">
                          <span onClick={() => onView(item.type, data)}>
                            详情
                          </span>
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
              {showScroll && (
                <div className="scrollTop" onClick={onScrollTop}></div>
              )}
            </AnimatePresence>
          </section>
        </motion.div>
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
          <section className="detail">
            {item.detail && <p>{item.detail}</p>}
          </section>
          <section className="imgBox">
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

function AnimatedNumber({ value }: { value: number }) {
  let spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
  let display = useTransform(spring, current =>
    Math.round(current).toLocaleString()
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{display}</motion.span>;
}
