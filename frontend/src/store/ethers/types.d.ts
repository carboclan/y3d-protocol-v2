export interface Y3DEthersState {
  initialized: boolean
  connected: boolean
  error: unknown | null
  user: string
  address: string
  blance: number
  coinName: string
  network: string
  ens: string | null
}
