

export class Column {
  constructor(title, cards) {
    this.title = title;
    this.cards = cards;
  }
  dropHandler(column, card) {
    if (card.status !== column) {
      card.status = column
    }
  }
  render() {
    const $column = document.createElement('div');
    $column.className = `column column_${this.title}`;
    const $title =
      `
      <div class="column_title">
        <p class="title_name">${this.title}</p>
        <p class="title_count">${this.cards.length}</p>
      </div>
    `;
    const $content = document.createElement('div');
    $content.className = 'column_content';
    this.cards.forEach($card => {
      $content.append($card)
    });
    $column.innerHTML = $title;
    $column.append($content)
    const $buttonAdd = document.createElement('button');
    $buttonAdd.setAttribute('type', 'button');
    $buttonAdd.className = 'button_add';
    $column.append($buttonAdd);
    return $column
  }
}