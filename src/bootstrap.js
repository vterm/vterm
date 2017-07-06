import Config from './config'


/*
 * SEE: https://github.com/LucaT1/yat/pull/6
 *
 * Here we are bootstrapping the application programmatically
 * We are running preselected tasks asyncronously in order
 * To wait for every change before proceding, leaving no margin
 * For \undefined\ errors or mistakes.
 * This is the current queee of actions:
 * - Load configuration
 * - Setup store.js with config's values
 * - Setup global events listeners, like configuration
 *   update or window maximize/minimize
 * - Load plugins with the store fully setup and give
 *   them the possibility to execute functions even on
 *   a specific situation, for example `onConfigUpdate`
 * - Render the UI to the user with the effects caused by plugins
 *
 * This will also involve using `pify` promisify to create
 * FS calls as promises and rewriting part of the loader and configuration
 * to make them classes. Also involves creating a new plugins system
 */
export default async () => {
  await Config.load()

  console.log(Config.get());
}
