const pickShuffled = (elements: Array<any>, picks: number) => {
  let currentIndex = elements.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = elements[currentIndex];
    elements[currentIndex] = elements[randomIndex];
    elements[randomIndex] = temporaryValue;
  }

  return elements.slice(0, picks);
};

export default pickShuffled;
