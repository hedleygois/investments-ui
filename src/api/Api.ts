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

const queryDB = () => <T>({
  query,
  variables,
}: QueryDB): Promise<QueryResponse<T>> => {
  return fetch("http://localhost:3001/query", {
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
  fetch("http://localhost:3001/query", {
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
