import React, { useEffect, useState } from 'react';
import style from './TicketList.module.scss';
import Ticket from '../Ticket/Ticket';
import {
  fetchTickets,
  selectError,
  selectFilter,
  selectLoading,
  selectSort,
  selectStop,
  selectTickets,
  sortType,
} from '@/store/slice/ticketSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Ticket as TicketType } from '@/type';
import { Alert, Button, Spin } from 'antd';

function transferFilter(ticket: TicketType, tranferCount: number[]) {
  return ticket.segments.every((item) => tranferCount.includes(item.stops.length));
}
function getDurationSum(ticket: TicketType) {
  const min = Math.min(ticket.segments[1].duration, ticket.segments[0].duration);
  return min;
}
function ticketSortCoompare(sort: sortType) {
  return (a: TicketType, b: TicketType) => {
    const sum1 = getDurationSum(a);
    const sum2 = getDurationSum(b);
    const price1 = a.price;
    const price2 = b.price;
    if (sort == 'duration') {
      return sum1 - sum2;
    }
    if (sort == 'price') {
      return price1 - price2;
    }
    if (sort == 'optinal') {
      const value1 = sum1 + price1;
      const value2 = sum2 + price2;
      return value1 - value2;
    }
    return 0;
  };
}
export default function TicketList() {
  const dispatch = useAppDispatch();
  const [pageSize, setpageSize] = useState(10);
  const stop = useAppSelector(selectStop);
  const sort = useAppSelector(selectSort);
  const tickets = useAppSelector(selectTickets);
  const isloading = useAppSelector(selectLoading);
  const isError = useAppSelector(selectError);
  const filter = useAppSelector(selectFilter)
    .filter((el) => el.value)
    .map((filter) => filter.tranferCount);
  useEffect(() => {
    if (!stop) dispatch(fetchTickets());
  }, [stop, isloading]);
  const filteredTickets = tickets
    .filter((ticket) => transferFilter(ticket, filter))
    .sort(ticketSortCoompare(sort))
    .slice(0, pageSize);
  if (isError)
    return (
      <Contaier>
        {' '}
        <Alert
          className={style.middle}
          message="Что-то пошло не так"
          type="error"
          action={
            <Button size="small" type="primary" onClick={() => dispatch(fetchTickets())}>
              Обновить страницу
            </Button>
          }
        />
      </Contaier>
    );
  if (filteredTickets.length == 0 && !isloading)
    return (
      <Contaier>
        {' '}
        <Alert className={style.middle} message="Ничего не найдено" type="info" />
      </Contaier>
    );
  return (
    <Contaier>
      {filteredTickets.map((ticket) => (
        <Ticket key={ticket.id} ticket={ticket}></Ticket>
      ))}
      {isloading && <Spin className={style.middle} size="large"></Spin>}
      <Button size="large" type="primary" onClick={() => setpageSize((value) => value + 10)}>
        Показать еще
      </Button>
    </Contaier>
  );
}
const Contaier = ({ children }: { children: React.ReactNode }) => <div className={style.ticket_list}>{children}</div>;
