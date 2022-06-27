export const renderSkeleton = (SkeletonElement, amount = 1) => {
  const skeletonArray = []
  for (let i = 0; i < amount; i++) {
    skeletonArray.push(SkeletonElement)
  }
  return skeletonArray
}
