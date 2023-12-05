import React from 'react';
import style from './Filter.module.scss';
import CheckBoxFitler from './CheckBoxFitler';
import { classNames } from '@/utils';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { filter, selectFilter, updaAllFilter, updateFilter } from '@/store/slice/ticketSlice';

interface FilterProps {
  className: string;
}
export default function Filter({ className }: FilterProps) {
  const filters = useAppSelector(selectFilter);
  const dispatch = useAppDispatch();
  const all: filter = {
    name: 'Все',
    tranferCount: -1,
    value: filters.every((el) => el.value),
  };

  return (
    <div className={classNames(style.container, className)}>
      <header>
        <h3>Количество пересадок</h3>
      </header>
      <ul className={style.filterList}>
        <CheckBoxFitler filter={all} onChange={() => dispatch(updaAllFilter(!all.value))}></CheckBoxFitler>
        {filters.map((filter, i) => (
          <CheckBoxFitler onChange={() => dispatch(updateFilter(filter))} key={i} filter={filter}></CheckBoxFitler>
        ))}
      </ul>
    </div>
  );
}
