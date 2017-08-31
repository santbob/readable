
export default function blah(state = null, action) {
  switch (action.type) {
    case 'DEPLOYMENT_SELECTED':
      if (action.deploymentId === 'init') {
        return null
      } else if (action.deploymentId || action.deploymentId === '') {
        return action.deploymentId
      } else {
        return state;
      }
    default:
      return state;
  }
}
