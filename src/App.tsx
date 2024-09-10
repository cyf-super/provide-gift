import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const [tabId, setTabId] = useState('home');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    navigate(`/${tabId}`);
  }, [tabId]);

  return (
    <div className={styles.box}>
      <div className="content">
        <Outlet />
      </div>
      <Tab tabId={tabId} setTabId={setTabId} />
    </div>
  );
}

function Tab({
  tabId,
  setTabId
}: {
  tabId: string;
  setTabId: (tab: string) => void;
}) {
  const tabs = [
    {
      id: 'home',
      name: '首页',
      icon: tabId === 'home' ? 'homeActive' : 'home'
    },
    {
      id: 'sources',
      name: '资源',
      icon: tabId === 'sources' ? 'resourceActive' : 'resource'
    }
  ];
  return (
    <div className="tabs">
      {tabs.map(tab => (
        <div key={tab.name} className="tab" onClick={() => setTabId(tab.id)}>
          <img src={`/tabs/${tab.icon}.svg`} />
          <div
            className={['name', tabId === tab.id ? 'nameActive' : ''].join(' ')}
          >
            {tab.name}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
