type QueryDB = {
  query: string;
  variables?: unknown;
};

export type QueryResponse<T> = {
  data: {
    [name: string]: T;
  };
};

type MutationResponse<T> = {
  data: {
    [name: string]: { returning: T[] };
  };
};

const BASE_URL =
  process.env.REACT_APP_STAGE === "production"
    ? "https://investments-server.herokuapp.com"
    : "http://localhost:3001";

const API_URL = `${BASE_URL}/query`;

const queryDB = () => <T>({
  query,
  variables,
}: QueryDB): Promise<QueryResponse<T>> => {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  }).then((res) => res.json());
};

const mutateDB = () => <T>({
  query,
  variables,
}: QueryDB): Promise<MutationResponse<T>> =>
  fetch(API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  }).then((res) => res.json());

export const QueryDB = queryDB();
export const MutateDB = mutateDB();
