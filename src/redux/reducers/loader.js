const loaderReducer = (state = false, action) => {
  if (action.type === 'LOADER_SHOW') {
    return true
  } else if (action.type === 'LOADER_HIDE') {
    return false
  } else return state
}
export default loaderReducer
