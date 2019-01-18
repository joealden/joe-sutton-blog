// @ts-check

/**
 * NOTE:
 * As mentioned in [1], the commit that made use of the History API to make
 * the site's navigation feel more like a native app on mobile had a pretty
 * big bug. This was that when the user clicked the back button in their
 * browser / OS (Android), or they clicked on a button that called
 * `history.back()` (the back buttons in both the Info and About sections),
 * the main list would be scrolled back to the top. This was an issue
 * because it meant that user would lose their position in the list, which
 * is really bad UX wise.
 *
 * After spending some time researching the issue, I figured out that it
 * was due to how Gatsby's routing implementation works. From what I can
 * tell, an `onpopstate` event handler is registered in Gatsby's routing
 * implementation (possibly in `@reach/router` itself). This event handler
 * seems to reset the scroll position of the page when a `popstate` event
 * occurs (if the below `shouldUpdateScroll` returns `true`). This is why
 * the list was getting scrolled back to the top every time the user went
 * back to the main list from either the Info section or the About section.
 *
 * To control this behaviour, Gatsby exposes a hook that is called to make
 * the decision on whether the page should be scrolled to the top. This is
 * the `shouldUpdateScroll` function ([2]). If the function returns true
 * (the default value), the page will be scrolled back to the top. If this
 * function returns false, the scroll position will be left where it was.
 * This is the behaviour that we want.
 *
 * Due to the fact that Listed is only a single page site, I have
 * implemented the `shouldUpdateScroll` function to always return false.
 *
 * Links:
 * -------------------------------------------------------------------------
 * [1] https://github.com/joealden/listed/issues/18#issuecomment-455259862 |
 * [2] https://www.gatsbyjs.org/docs/browser-apis/#shouldUpdateScroll      |
 * -------------------------------------------------------------------------
 */

exports.shouldUpdateScroll = () => {
  return false;
};
