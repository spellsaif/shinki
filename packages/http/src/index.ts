export function notImplemented() {
  return (_req: any, res: any) => res.status(501).json({ error: 'Not implemented' });
}
