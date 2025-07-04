export function deleteBy<TItem>(list: TItem[], predicate: (item: TItem) => boolean) {
  const index = list.findIndex(predicate)
  if (index !== -1) {
    list.splice(index, 1)
  }
}
