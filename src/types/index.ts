export interface IGoodBE {
  B: boolean
  C: number
  CV: null
  G: number
  P: number
  Pl: null
  T: number
}
export interface Ilist {
  Error: string
  Id: number
  Success: boolean
  Value: {
    Goods: Array<IGoodBE>
  }
}

export interface IName {
  G: string
  C: number
  B: {
    [key: string]: { N: string; T: number }
  }
}

export interface INames {
  [key: string]: IName
}

export interface IState {
  list: Ilist
  names: INames
  cart: ICart
  goods: IGroup[]
}

export interface IGroup {
  ID: number
  groupName: string
  groupGoods: IGood[]
}

export interface IGood {
  amount: number
  cost: number
  itemID: number
  itemName: string
  maxAmoount?: number
}

export type ICart = Array<IGood>
