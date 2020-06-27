import { Column } from './Column.js';
import { Card } from './Card.js';
import { Editor } from './Editor.js';

export class Trello {
  constructor() {
    this.columns = ['backlog', 'selected', 'running', 'evaluating', 'live'];
    this.tasks = [
      {
        id: 0,
        status: 'backlog',
        title: 'Всплытие идёт с «целевого» элемента прямо наверх. По умолчанию событие будет всплывать до элемента <html>, а затем до объекта document, а иногда даже до window, вызывая все обработчики на своём пути.',
        description: 'TaTaTa',
        labels: ['UI design'],
      },
      {
        id: 0,
        status: 'backlog',
        title: 'Всплытие идёт с «целевого» элемента прямо наверх. По умолчанию событие будет всплывать до элемента <html>, а затем до объекта document, а иногда даже до window, вызывая все обработчики на своём пути.',
        description: 'TaTaTa',
        labels: ['UI design'],
      },
      {
        id: 0,
        status: 'backlog',
        title: 'Всплытие идёт с «целевого» элемента прямо наверх. По умолчанию событие будет всплывать до элемента <html>, а затем до объекта document, а иногда даже до window, вызывая все обработчики на своём пути.',
        description: 'TaTaTa',
        labels: ['UI design'],
      },
      {
        id: 1,
        status: 'selected',
        title: 'blablawadwadwadwa',
        description: 'TaTaTa',
        labels: [],
      },

    ];
    this.root = document.querySelector('#root');
    this.app = document.createElement('div');
    this.draggable = '';
  }


  setDraggble(node) {
    this.draggable = node;
  }
  manageEditor(task) {
    const editor = new Editor(this.tasks, task, this.columns);
    const $editor = editor.render();
    document.body.append($editor);
    $editor.addEventListener('click', (e) => {
      e.currentTarget.remove();
    })
    $editor.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();
      editor.onSubmitHandler()
      $editor.remove();
      this.rerender()
    })
  }

  rerender() {
    this.app.innerHTML = '';
    this.init();
  }
  render() {
    this.app.className = 'app'
    this.root.append(this.app);
  }
  init() {
    this.columns.forEach(title => {
      const cards = this.tasks
        .filter(task => task.status === title)
        .map(task => {
          const card = new Card(task.title, task.description, task.label);
          const $card = card.render();
          $card.addEventListener('dragstart', (e) => {
            e.stopPropagation()
            this.setDraggble(task)
          });
          $card.addEventListener('dragend', (e) => {
            e.stopPropagation()
            this.setDraggble(null)
          });
          $card.addEventListener('drop', (e) => {
            e.stopPropagation()
            card.dropHandler(this.tasks, task, this.draggable);
            this.rerender();
          });
          $card.addEventListener('click', (e) => {
            if (e.target.classList.contains('edit_button')) {
              this.manageEditor(task)
            }
          });
          return $card
        })
      const column = new Column(title, cards)
      const $column = column.render();
      $column.addEventListener('click', (e) => {
        if (e.target.classList.contains('button_add')) {
          const newTask = {};
          newTask.labels = [];
          this.tasks.push(newTask);
          this.manageEditor(newTask)
        }
      })
      $column.addEventListener('drop', (e) => {
        column.dropHandler(title, this.draggable)
        this.rerender()
      })
      $column.addEventListener('dragover', (e) => {
        e.preventDefault()
      })
      this.app.append($column)
    })
    this.render()

  }
}