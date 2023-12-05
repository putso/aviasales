import React from 'react';
import style from './Tabs.module.scss';
import { classNames } from '@/utils';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { selectSort, sortType, updateSort } from '@/store/slice/ticketSlice';
type tabsSchemeType = {
  text: string;
  type: sortType;
};
const tabsScheme: tabsSchemeType[] = [
  {
    text: 'Самый дешевый',
    type: 'price',
  },
  {
    text: 'Самый быстрый',
    type: 'duration',
  },
  {
    text: 'Оптимальный',
    type: 'optinal',
  },
];
export default function Tabs() {
  const sort = useAppSelector(selectSort);
  const dispatch = useAppDispatch();

  const isActive = (name: sortType) => (name == sort ? style.active : '');
  return (
    <div className={style.tabs}>
      {tabsScheme.map((tab, i) => (
        <div
          key={i}
          className={classNames(style.tab, isActive(tab.type))}
          onClick={() => dispatch(updateSort(tab.type))}
        >
          {tab.text}
        </div>
      ))}
    </div>
  );
}
