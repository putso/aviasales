import { Ticket } from '@/type';
const TICKETS = 'tickets';
const BASE_URL = `https://aviasales-test-api.kata.academy`;
const SEARCH = 'SEARCH';
let id = 0;
type fectchKey = {
  searchId: string;
};
const createGetterId = () => {
  let id: fectchKey;
  return async () => {
    if (!id) id = await fetchSearchId();
    return id;
  };
};
const getSearchId = createGetterId();
function createFetch<T>(baseUrl: string, keyGetter: () => Promise<fectchKey>) {
  return async (path: string, params = new URLSearchParams()): Promise<T> => {
    path = `/${path}`;
    const defaultParams = await keyGetter();
    Object.entries(defaultParams).forEach(([key, value]) => params.append(key, value));
    const paramsStr = params.toString().length ? `?${params.toString()}` : '';
    const url = [baseUrl, path, paramsStr].join('');
    const respnose = await fetch(url);
    const json = await respnose.json();
    return json;
  };
}
export type TicketFetchResponseType = {
  tickets: Ticket[];
  stop: boolean;
};
export const aviaFetch = createFetch<TicketFetchResponseType>(BASE_URL, getSearchId);
export const loadAllTickets = async function () {
  let data: Ticket[] = [];
  let next = true;
  while (next) {
    const res = await getTickets();
    data = data.concat(res.tickets);
    next = !res.stop;
  }
  return data;
};

async function fetchSearchId() {
  const data = await fetch(`${BASE_URL}/${SEARCH}`);
  const json = await data.json();
  return json;
}

export async function getTickets() {
  for (let i = 0; i < 5; i++) {
    try {
      const data = await aviaFetch(TICKETS);
      const tickets = data.tickets.map((el) => ({ ...el, id: `${id++}` }));
      data.tickets = tickets;
      return data;
    } catch {
      continue;
    }
  }
  throw new Error('Что-то пошло не так');
}
