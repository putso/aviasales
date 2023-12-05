import React from 'react';
import style from './App.module.scss';
import Filter from '@/components/Filter';
import Tabs from '@/components/Tabs';
import TicketList from '../TicketList';
import Logo from './Logo';

function App() {
  return (
    <div className={style.container}>
      <header>
        <Logo></Logo>
      </header>
      <Filter className={style.filter}></Filter>
      <Tabs />
      <TicketList></TicketList>
    </div>
  );
}

export default App;
