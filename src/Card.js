
export class Card {
  constructor(title, description, labels) {
    this.title = title;
    this.description = description;
    this.labels = labels
  }
  dropHandler(tasks, card1, card2) {
    if (card1 !== card2) {
      if (card1.status === card2.status) {
        const card1Index = tasks.findIndex(el => card1.id === el.id);
        const card2Index = tasks.findIndex(el => card2.id === el.id);
        console.log([tasks[card1Index], tasks[card2Index]]);
        [tasks[card1Index], tasks[card2Index]] = [tasks[card2Index], tasks[card1Index]];
      } else {
        tasks.splice(tasks.findIndex(el => card2.id === el.id), 1)
        tasks.splice(tasks.findIndex(el => card1.id === el.id) + 1, 0, card2);
        card2.status = card1.status
      }
    }
  }
  render() {
    const $card = document.createElement('div');
    $card.className = 'card';
    $card.setAttribute('draggable', true)
    $card.innerHTML =
      `
          <div class='card_title'>
            <p>${this.title}</p>
            <button class='edit_button'>Edit</button>
          </div>
          <p class="card_description">${this.description}</p>
      `;
    const $cardFooter = document.createElement('div');
    $cardFooter.className = 'card_footer';
    $card.append($cardFooter);
    return $card
  }
}