"use client"

import { useSearchParams } from "next/navigation"

/**
 * Utilidad para agregar o reemplazar parámetros en la URL.
 */
export function createQueryString(
  name: string,
  value: string,
  searchParams?: URLSearchParams
) {
  const params = new URLSearchParams(searchParams?.toString())
  params.set(name, value)

  return params.toString()
}
