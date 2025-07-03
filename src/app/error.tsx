'use client';

import useErrorReport from "../lib/useErrorReport";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
  }) {
  const reportProgress = useErrorReport(error, true);

  return (
    <>
      <h1>This is error page.</h1>
      <p>We are sorry that something went wrong:{error.message}</p>
      {
        reportProgress === 'doing' ? (
          <p>Now reporting the error information for implovement.</p>
        ) : (
            <>
              <p>Finish reporting. Thank you for contributing.</p>
              <p>Push Reload button below to reset and try again!</p>
              <button onClick={reset}>Reload</button>
            </>
        )
      }
    </>
  );
}
