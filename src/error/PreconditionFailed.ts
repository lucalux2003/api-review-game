export function preconditionFailed(name: string): never {
    const error = new Error(name + " exist and have to be deleted first");
    (error as any).status = 412;
    throw error;
  }