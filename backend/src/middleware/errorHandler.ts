import { Request, Response, NextFunction } from 'express';

/**
 * Global error handler middleware.
 * Must be registered last in the Express middleware chain.
 */
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
}
