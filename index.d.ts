// TODO:
interface PropsToCombine {
  [key: string]: string[]
}

/** Create React components from a given combinations of props. */
declare function generate<C extends React.FC | React.ComponentClass>(
  Component: C,
  propsToCombine: PropsToCombine,
  prop?: {[key: string]}
): C;

export default generate;