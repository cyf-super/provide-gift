import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import { Outlet, useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const [tabId, setTabId] = useState('home');

  useEffect(() => {
    navigate(`/${tabId}`);
    console.log('tabId ', tabId);
  }, [tabId]);

  return (
    <div className={styles.box}>
      <div className="content">
        <Outlet />
      </div>
      <Tab setTabId={setTabId} />
    </div>
  );
}

function Tab({ setTabId }: { setTabId: (tab: string) => void }) {
  const tabs = [
    {
      id: 'home',
      name: '首页',
      icon: location.hash.slice(2) === 'home' ? 'homeActive' : 'home'
    },
    {
      id: 'sources',
      name: '资料',
      icon: location.hash.slice(2) === 'sources' ? 'resourceActive' : 'resource'
    }
  ];
  return (
    <div className="tabs">
      {tabs.map(tab => (
        <div key={tab.name} className="tab" onClick={() => setTabId(tab.id)}>
          <img src={`/tabs/${tab.icon}.svg`} />
          <div
            className={[
              'name',
              location.hash.slice(2) === tab.id ? 'nameActive' : ''
            ].join(' ')}
          >
            {tab.name}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
