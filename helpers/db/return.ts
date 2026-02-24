export type MutationResult<T = undefined> = {
  success: {
    message: string;
    data?: T;
  } | null;

  error: {
    message: string;
  } | null;
};

export function customSuccess<T = undefined>(
  message?: string,
  data?: T,
): MutationResult<T> {
  return {
    success: {
      message: message ?? "Success",
      data,
    },
    error: null,
  };
}

export function customError(message?: string): MutationResult {
  return {
    success: null,
    error: {
      message: message ?? "Error occurred",
    },
  };
}
