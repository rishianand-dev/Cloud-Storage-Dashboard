import type { ApiErrorDetail } from "@/types"

export class ApiRequestError extends Error {
  readonly status: number
  readonly details?: ApiErrorDetail[]

  constructor(message: string, status: number, details?: ApiErrorDetail[]) {
    super(message)
    this.name = "ApiRequestError"
    this.status = status
    this.details = details
  }
}

export function fieldErrorsFromApi(error: unknown): {
  form: string
  fields: Record<string, string>
  details?: ApiErrorDetail[]
} {
  if (error instanceof ApiRequestError) {
    const fields: Record<string, string> = {}
    for (const detail of error.details ?? []) {
      if (detail.path && detail.path !== "root") fields[detail.path] = detail.message
    }
    return { form: error.message, fields, details: error.details }
  }
  return {
    form: error instanceof Error ? error.message : "Something went wrong",
    fields: {},
  }
}
