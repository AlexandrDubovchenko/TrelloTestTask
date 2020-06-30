import { Column } from './Column.js';
import { Card } from './Card.js';
import { Editor } from './Editor.js';
import { Search } from './Search.js';

export class Trello {
  constructor(db, tasks) {
    this.db = db;
    this.columns = ['backlog', 'selected', 'running', 'evaluating', 'live'];
    this.tasks = tasks;
    this.tasksCopy;
    this.root = document.querySelector('#root');
    this.draggable = '';
  }

  setDraggble(node) {
    this.draggable = node;
  }

  manageEditor(app, task) {
    const editor = new Editor(this.db, this.tasks, task, this.columns);
    const $editor = editor.render();
    app.append($editor);
    $editor.addEventListener('click', (e) => {
      $editor.remove();
    })
    $editor.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();
      editor.onSubmitHandler()
        $editor.remove();
        this.tasks.push(task)
        this.rerender();
    })
  }

  renderSearched(searched) {
    this.tasksCopy = [...this.tasks];
    this.tasks = searched;
    this.rerender();
  }
  searchCancel() {
    if (this.tasksCopy.length) {
      this.tasks = [...this.tasksCopy];
    }
  }

  rerender() {
    this.root.innerHTML = '';
    this.init();
  }
  render(app) {
    this.root.append(app);
  }
  init() {
    const app = document.createElement('div');
    app.className = 'app';
    const search = new Search();
    const $search = search.render();
    app.append($search);
    $search.addEventListener('click', (e) => {
      if (e.target.classList.contains("search_button") && document.querySelector(".search_input").value) {
        const searched = search.search(this.tasks, document.querySelector(".search_input").value);
        this.renderSearched(searched);
        this.searchCancel();
      } else if (e.target.classList.contains("search_button")) {
        this.rerender();
      }
    });
    const $columnWrapper = document.createElement('div');
    $columnWrapper.className = 'column_wrapper';
    this.columns.forEach(title => {
      const cards = this.tasks
        .filter(task => task.status === title)
        .map(task => {
          const card = new Card(task.title, task.description, task.labels, this.db);
          const $card = card.render();
          $card.addEventListener('dragstart', (e) => {
            e.stopPropagation();
            this.setDraggble(task);
          });
          $card.addEventListener('dragend', (e) => {
            e.stopPropagation();
            this.setDraggble(null);
          });
          $card.addEventListener('drop', (e) => {
            e.stopPropagation();
            card.dropHandler(this.tasks, task, this.draggable);
            this.rerender();
          });
          $card.addEventListener('click', (e) => {
            if (e.target.classList.contains('edit_button')) {
              this.manageEditor(app, task)
            }
          });
          return $card
        })
      const column = new Column(title, cards, this.db);
      const $column = column.render();
      $column.addEventListener('drop', (e) => {
        column.dropHandler(title, this.draggable);
        this.rerender();
      })
      $column.addEventListener('dragover', (e) => {
        e.preventDefault();
      })
      $columnWrapper.append($column);
    })
    app.addEventListener('click', (e) => {
      if (e.target.classList.contains('button_add')) {
        const newTask = {};
        newTask.labels = [];
        if (e.target.parentNode.classList[1]) {
          newTask.status = e.target.parentNode.classList[1].split('_')[1];
        }
        this.manageEditor(app, newTask);
      }
    })
    app.append($columnWrapper);
    this.render(app);
  }
}