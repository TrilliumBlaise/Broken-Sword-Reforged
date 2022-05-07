export const elements = [
  { element: 'Fire', beats: 'Earth' },
  { element: 'Water', beats: 'Fire' },
  { element: 'Air', beats: 'Water' },
  { element: 'Earth', beats: 'Air' },
  { element: 'None' },
];

//First param is the whole exact property of the element to be matched
//Second param is the whole element object
export function isSameElement(current, other) {
  return current === other.element;
}
