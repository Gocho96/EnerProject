export const validateSchema =
  (schema: any) =>
  (
    req: { body: any },
    res: { status: (arg0: number) => { json: (arg0: string[]) => void } },
    next: () => void
  ): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      res
        .status(400)
        .json((error as any).errors.map((e: { message: string }) => e.message));
    }
  };
