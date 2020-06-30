export class Search {
  search (tasks, value) {
    const matches =[];
    tasks.forEach(task => {
      if (task.title.toLowerCase().indexOf(value.toLowerCase()) !== -1 || task.description.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
        matches.push(task);
      } else {
       task.labels.forEach(label => {
         if (label.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
          matches.push(task);
         }
       }) 
      }
    });
    return matches
  }

  render() {
    const search = document.createElement('div');
    search.innerHTML =
      `     
      <input class="search_input" type="text">
      <button class="search_button"></button>
      <button class="button_add"></button>
    `
    search.setAttribute('type', 'text');
    search.className = 'search';
    return search
  }
} 