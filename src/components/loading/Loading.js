import { Fragment } from "react";

export function Loading({ loading }) {
  return (
    <Fragment>
      {loading === true ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "gray",
            height: "100vh",
          }}
        >
          <h1>Carregando...</h1>
        </div>
      ) : null}
    </Fragment>
  );
}