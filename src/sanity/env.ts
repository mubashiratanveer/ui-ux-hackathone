export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-18'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const token = assertValue(
 "skOes8kQwHYiosOt4cuOKWB1XxUbrwaZPLy4HUbDKflmHKbPf1cXzHn8Jg8uEvrgjWtBOeKTg77qTHFTIBCZr3TZ5GOLtUq6LN4HaGjClj3Lkr8mW3I2K9uVNe13MuIqZ7zhllzEcoh0Q5dx7OCtQjVPaudT70vU4mdzyowyPPHKJudtDpHY",
  'Missing environment variable: SANITY_API_TOKEN'
)


function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
