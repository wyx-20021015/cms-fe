// 在新的@types/react中，移除了React.FC的隐式children类型，手动加上。
import { ReactNode } from 'react'
declare type PropsWithChildren<P = unknown> = P & {
  children?: ReactNode | undefined
}
export default PropsWithChildren
