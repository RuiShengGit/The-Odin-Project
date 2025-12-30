# Etch-a-Sketch-2025
Odin Project to create an Etch-a-Sketch 

## What I Learned

- Gained a better understanding of event listeners and how to properly select elements in the DOM.

- Learned that child elements do not automatically inherit the parent’s background color — if no background color is assigned, they remain transparent.

- Discovered that event.target refers to the specific element that triggered the event, which could be a child element, even if the event listener is attached to the parent. (Be careful and include failsafe, such as the one i implemented to ensure the cells are the ones being targeted and not the parent container).

- Understood that events propagate (bubble) upward through the DOM tree, not sideways. This means neighboring elements are not affected when an event occurs on one element.