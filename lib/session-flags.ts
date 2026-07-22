/** Session-scoped flags shared across client shell components. */
export let homeLoaderFinished = false;

export function markHomeLoaderFinished() {
  homeLoaderFinished = true;
}
