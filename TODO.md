# TODO

- Virtualise the list using react-virtualized
  - https://github.com/bvaughn/react-virtualized/blob/master/docs/README.md
  - https://github.com/bvaughn/react-virtualized/blob/master/docs/WindowScroller.md
  - https://github.com/bvaughn/react-virtualized/blob/master/docs/usingAutoSizer.md
  - Use the above links to figure out the best way to implement the list
    virtualisation. The list needs to scroll with the window, and the list also
    needs to resize itself correctly when the viewport width changes. This is
    because the font-size of the titles are based on the viewport width (vw).
    When the viewport gets narrower, more items will be shown (unless the
    viewports aspect ratio is kept the same).
- Implement the image move thing when the active list item changes.
  - Look into using gatsby-image
  - Have a single container that has somewhere between 2-4 img tags and a solid
    div that will have an initial opacity of 0, then when a transition happens,
    the opacity is animated to 1. At the same time, the newly hovered item's
    image src is place in one of the images tags. When the image has fully
    loaded, fade the white divs opacity down back to 0 (also need to consider
    the z-index of the previous image as it needs to go below the white div when
    it has reached an opacity of 1).
  - If it proves too difficult to implment, fallback to the other proposed
    design where the image is locked to the first list items height and just
    fades between images when the user hovers on different items.
- Wire in actual data once Jsutts has put some in
- Implement the info section as per the design
  - When an info button is clicked, set the state of the Info component to the
    current items details, things like the title, image, link, catagory and
    tags.
  - At the same time, animate the list so that the current items title in the
    list is level with the title shown in the info section.
  - Once this animation has finshed and the state has been updated, open the
    info section.
  - Think about the case if the animation finshes but some data like the image
    in the info section has not been loaded yet. Maybe think of a placeholder.
