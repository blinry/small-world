import {writable} from "svelte/store"

export const defaultScale = writable(100_000_000)
export const useMetric = writable(true)
