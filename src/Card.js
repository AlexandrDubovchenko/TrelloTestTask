
export class Card {
  constructor(title, description, labels, db) {
    this.db = db
    this.title = title;
    this.description = description;
    this.labels = labels
  }
  dropHandler(tasks, card1, card2) {
    if (card1 !== card2) {
      if (card1.status === card2.status) {
        const card1Index = tasks.findIndex(el => card1.id === el.id);
        const card2Index = tasks.findIndex(el => card2.id === el.id);
        [tasks[card1Index], tasks[card2Index]] = [tasks[card2Index], tasks[card1Index]];
      } else {
        tasks.splice(tasks.findIndex(el => card2.id === el.id), 1)
        tasks.splice(tasks.findIndex(el => card1.id === el.id) + 1, 0, card2);
        card2.status = card1.status
      }
      this.db.collection("tasks").doc(card2.id).set({
        title: card2.title,
        description: card2.description,
        status: card2.status,
        labels: card2.labels
      })
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
    this.labels.forEach(label => {
      const $label = `<p class='card_label ${label.toLowerCase().split(' ').join('_')}'>${label}</p>`
      $cardFooter.innerHTML += $label
    })
    $card.append($cardFooter);
    return $card
  }
}