import { useTypedSelector } from 'store/storeConfig'

export const useSwitches = (switches: string[]) => {
  const app = useTypedSelector((state) => state.modules.app)
  return switches.map((s) => app.switches.find((switchOn) => switchOn === s))
}
