import React from 'react';
import style from './Ticket.module.scss';
import { segmet, Ticket as TicketType } from '@/type';
import { addMinutes, intervalToDuration } from 'date-fns';
import { getFormatDates, getNoun } from '@/utils/date';
interface TicketProps {
  ticket: TicketType;
}
export default function Ticket({ ticket }: TicketProps) {
  const imgUrl = `https://pics.avs.io/99/36/${ticket.carrier}.png`;
  return (
    <article className={style.ticket}>
      <header>
        <div className={style.price}>{ticket.price} P</div>
        <div className={style.logo}>
          <img src={imgUrl} className={style.img} alt="" />
        </div>
      </header>
      <div className="routes">
        {ticket.segments.map((segmet, i) => {
          return <Route key={i} segmet={segmet}></Route>;
        })}
      </div>
    </article>
  );
}

function Route({ segmet }: { segmet: segmet }) {
  const { date, duration, origin, destination, stops } = segmet;
  const { endMH, startMH } = getFormatDates(date, duration);
  const { minutes, hours } = intervalToDuration({
    start: new Date(0),
    end: addMinutes(new Date(0), duration),
  });
  const transferWord = getNoun(stops.length, 'пересадка', 'пересадки', 'пересадок');
  const strTime = ({ hourse, minutes }: { hourse: number; minutes: number }) => {
    return `${String(hourse).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };
  return (
    <div className={style.route}>
      <div className={style.card_info}>
        <div className={style.name}>
          {origin} - {destination}
        </div>
        <div className={style.value}>
          {strTime(startMH)} – {strTime(endMH)}
        </div>
      </div>
      <div className={style.card_info}>
        <div className={style.name}>В пути</div>
        <div className={style.value}>
          {String(hours).padStart(2, '0')}ч {String(minutes).padStart(2, '0')}м
        </div>
      </div>
      <div className={style.card_info}>
        <div className={style.name}>
          {stops.length} {transferWord}
        </div>
        <div className={style.value}>{stops.join(' ')}</div>
      </div>
    </div>
  );
}
