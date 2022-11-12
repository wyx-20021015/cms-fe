declare module '*.svg' {
  const imgUrl: string
  export default imgUrl
}
declare module '*.png' {
  const imgUrl: string
  export default imgUrl
}
declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}
declare module 'react-syntax-highlighter/dist/esm/styles/prism' {
  export { default as vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus'
  export { default as coyWithoutShadows } from 'react-syntax-highlighter/dist/esm/styles/prism/coy-without-shadows'
  export { default as darcula } from 'react-syntax-highlighter/dist/esm/styles/prism/darcula'
}
