import { Selector } from "react-redux"
import { DeserializedCatalogue } from "src/globalTypes"
import { RootState } from "./reducers"

export const catalogueSelector = (id: number): Selector<RootState, DeserializedCatalogue> => {
    return state => state.catalogues.catalogues.filter(c => c.id == id)[0]
  }