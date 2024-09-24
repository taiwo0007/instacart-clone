export interface Address {
  id: number | null
  formattedAddress: string | null
  addressLine1: string
  addressLine2: string
  city: any
  state: any
  postalCode: any
  country: any
  longitude: number | null
  latitude: number | null
}

export const DEFAULT_ADDRESS: Address = {
  id: null,
  formattedAddress: "General Post Office, O'Connell Street Lower, Dublin 1, Co. Dublin, D01 F5P2",
  addressLine1: "General Post Office",
  addressLine2: "O'Connell Street Lower",
  city: "Dublin",
  state: "Co. Dublin",
  postalCode: "D01 F5P2",
  country: "Ireland",
  longitude: null,
  latitude: null
};
