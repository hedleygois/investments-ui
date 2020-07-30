import { Either, left, right, toError } from "fp-ts/lib/Either";
import {
  TaskEither,
  tryCatch,
  chain,
  fromEither,
  map,
  fold as foldTE,
} from "fp-ts/lib/TaskEither";
import { of as ofT, Task } from "fp-ts/lib/Task";
import { fold as foldE } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/pipeable";
import { Option, none, some } from "fp-ts/lib/Option";

type QueryDBFP<T = unknown> = {
  query: string;
  variables?: unknown;
  emptyInitializer: () => T;
  // also maybe a function for when it fails
};

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

type QueryErrorExtensions = {
  path: string;
  code: string;
};

type QueryError = {
  extensions: QueryErrorExtensions[];
  message: string;
};

export type QueryErrorResponse = {
  errors: QueryError[];
};

const BASE_URL =
  process.env.REACT_APP_STAGE === "production"
    ? "https://investments-server.herokuapp.com"
    : "http://localhost:3001";

const API_URL = `${BASE_URL}/query`;

// point-free fp-ts is not so nice anymore
// TODO Add Sanctuary or Folktale (and check their ecosystems)
export const queryDBFP = () => <T>({
  query,
  variables,
  emptyInitializer,
}: QueryDBFP<T>): Task<T> => {
  const fetchedData = fetch(API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  return pipe(
    tryCatch(() => fetchedData, toError),
    chain((response) =>
      response.ok
        ? tryCatch(() => response.json(), toError)
        : fromEither(left(new Error("Unknown error")))
    ),
    map((data) =>
      data.errors
        ? left<QueryErrorResponse, QueryResponse<T>>(data)
        : right<QueryErrorResponse, QueryResponse<T>>(data)
    ),
    foldTE(
      (error) => {
        // Unknown error
        console.error(error);
        return ofT<T>(emptyInitializer());
      },
      (res) =>
        pipe(
          res,
          foldE(
            (error) => {
              // Hasura  error
              console.error(error);
              return ofT<T>(emptyInitializer());
            },
            (data) => {
              // That's a big shady but that's how our query is returned from Hasura
              const entry = Object.keys(data.data)[0];
              return ofT<T>(data.data[entry]);
            }
          )
        )
    )
  );
};

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

// TODO I'm not so sure if we need to invoke the Task<T> here. Check it later
export const mutateDBFP = () => <T>({
  query,
  variables,
}: QueryDB): Promise<Option<T>> => {
  const fetchedData = fetch(API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  // This is duplicated code. Refactor it to a function like <T, L = QueryErrorResponse, R = QueryResponse>(onError, onSuccess => T)
  return pipe(
    tryCatch(() => fetchedData, toError),
    chain((response) =>
      response.ok
        ? tryCatch(() => response.json(), toError)
        : fromEither(left(new Error("Unknown error")))
    ),
    map((data) =>
      data.errors
        ? left<QueryErrorResponse, MutationResponse<T>>(data)
        : right<QueryErrorResponse, MutationResponse<T>>(data)
    ),
    foldTE(
      (error) => {
        // Unknown error
        console.error(error);
        return ofT(none);
      },
      (res) =>
        pipe(
          res,
          foldE(
            (error) => {
              // Hasura  error
              console.error(error);
              return ofT(none);
            },
            (data) => {
              // That's a big shady but that's how our query is returned from Hasura
              const entry = Object.keys(data.data)[0];
              const result = data.data[entry].returning[0];
              return ofT(some(result));
            }
          )
        )
    )
  )();
};

export const QueryDB = queryDB();
export const MutateDB = mutateDB();
