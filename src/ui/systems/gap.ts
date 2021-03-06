import css from '@styled-system/css'
import {SystemFunction} from '@/types'
import {ResponsiveValue} from 'styled-system'

type ValueAble = number | string

const getMinusValue = (value?: ValueAble | null) => {
  if (typeof value === 'string') {
    return value
  }
  if (typeof value === 'number') {
    return value * -1
  }
  return value
}

const getMinusResponsiveValue = (value: ResponsiveValue<ValueAble>) => {
  if (Array.isArray(value)) {
    return value.map((element) => getMinusValue(element))
  }
  if (typeof value === 'object' && value !== null) {
    return Object.keys(value).reduce((result, key) => {
      const item = value[key]
      result[key] = getMinusValue(item)
      return result
    }, {})
  }
  return getMinusValue(value)
}

export interface GapProps {
  gap?: ResponsiveValue<ValueAble>
  /**
   * todo
   * @default between
   */
  gapStrategy?: ResponsiveValue<'between' | 'around'>
}

export const getTheme = (props: any, scale?: string | number | null, defaultValue?: any) => {
  if (scale === null || typeof scale === 'undefined') {
    return scale
  }
  const {space} = props?.theme || {}
  const value = space?.[scale]
  if (typeof value === 'undefined') {
    return typeof defaultValue === 'undefined' ? scale : defaultValue
  }
  return value
}

export const getResponsiveTheme = (props: any, scale: ResponsiveValue<string | number>, defaultValue?: any) => {
  if (Array.isArray(scale)) {
    return scale.map((item) => getTheme(props, item, defaultValue))
  }
  if (typeof scale === 'object' && scale !== null) {
    return Object.keys(scale).reduce((result, key) => {
      const item = scale[key]
      result[key] = getTheme(props, item, defaultValue)
      return result
    }, {})
  }
  return getTheme(props, scale, defaultValue)
}

export const createGap = (height?: string): (props) => SystemFunction<GapProps> => {
  return (props) => (gapWithHeight(props, height))
}

export const gap = (props): SystemFunction<any> => {
  return gapWithHeight(props)
}

const gapWithHeight = (props: any, size?: string): SystemFunction<any> => {
  const {gap} = props
  const sizeGap = getResponsiveTheme(props, gap)
  const oppositeGap = getMinusResponsiveValue(sizeGap)
  const style = {
    '>*': {
      paddingLeft: gap,
      paddingTop: gap,

    },
    height: size ? `calc(${size} + ${sizeGap}px)` : undefined,
    marginLeft: oppositeGap,
    marginTop: oppositeGap,
    width: size ? `calc(${size} + ${sizeGap}px)` : undefined,
  }

  return css(style)
}
