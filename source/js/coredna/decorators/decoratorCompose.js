const decoratorCompose = fn => (...decoratorArgs) => function(...args) {
  const result = f.apply(this, decoratorArgs.concat(args).filter(isDefined))
  if ((result instanceof $ && results.length) || result != null) {
    return g.apply(this, args.concat(result).filter(isDefined))
  }
}

export default decoratorCompose
