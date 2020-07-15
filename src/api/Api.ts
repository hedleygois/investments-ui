type QueryDB = {
  query: string;
  variables?: unknown;
};

type QueryResponse<T> = {
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
}: QueryDB): Promise<QueryResponse<T>> =>
  fetch("https://investments-server.herokuapp.com/query", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  }).then((res) => res.json());

const mutateDB = () => <T>({
  query,
  variables,
}: QueryDB): Promise<MutationResponse<T>> =>
  fetch("https://investments-server.herokuapp.com/query", {
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
