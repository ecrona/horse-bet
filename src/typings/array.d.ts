interface Array<T> {
  find<S extends T>(
    predicate: (this: void, value: T, index: number, obj: T[]) => value is S,
    thisArg?: any
  ): S | undefined
  find(
    predicate: (value: T, index: number, obj: T[]) => boolean,
    thisArg?: any
  ): T | undefined
  includes(searchElement: T, fromIndex?: number): boolean
}
