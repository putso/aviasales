import React from 'react';
import style from './CheckBoxFitler.module.scss';
import { filter } from '@/store/slice/ticketSlice';

interface CheckBoxFitlerProps {
  filter: filter;
  onChange: () => void;
}

export default function CheckBoxFitler({ filter, onChange }: CheckBoxFitlerProps) {
  return (
    <label className={style.label}>
      <input type="checkbox" name="" id="" checked={filter.value} onChange={onChange} />
      <span className={style.checkbox}>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4.28571 8L0 4.16123L1.20857 3.0787L4.28571 5.82726L10.7914 0L12 1.09021L4.28571 8Z"
            fill="#2196F3"
          />
        </svg>
      </span>
      <span>{filter.name}</span>
    </label>
  );
}
