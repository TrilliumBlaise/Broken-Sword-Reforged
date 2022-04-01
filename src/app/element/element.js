export const elements = [
  { element: 'Fire', beats: 'Earth' },
  { element: 'Water', beats: 'Fire' },
  { element: 'Air', beats: 'Water' },
  { element: 'Earth', beats: 'Air' },
  { element: 'None' },
];

export function isSameElement(current, other) {
  return current.element === other.element;
}
