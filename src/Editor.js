export class Editor {
  constructor(db, tasks, task, statuses) {
    this.db = db
    this.tasks = tasks;
    this.task = task;
    this.statuses = statuses;
    this.$editor = document.createElement('form');
  }
  edit() {
    const formData = new FormData(this.$editor);
    const object = {};
    object.labels = [];
    object.status = '';
    formData.forEach(function (value, key) {
      if (key.split('_')[0] === 'check') {
        object.labels.push(key.split('_')[1])
      } else if (key === 'status') {
        object.status = value;
      } else {
        object[key] = value;
      }
    });
    return object
  }

  onSubmitHandler() {
    const obj = this.edit();
    [this.task.title, this.task.description, this.task.status, this.task.labels] = [obj.title, obj.description, obj.status, obj.labels];
    this.task.id ?
      this.db.collection("tasks").doc(this.task.id).set({
        title: obj.title,
        description: obj.description,
        status: obj.status,
        labels: obj.labels
      }) :
      this.db.collection("tasks").add({
        title: obj.title,
        description: obj.description,
        status: obj.status,
        labels: obj.labels
      })
  }

  render() {
    const $editorWrapper = document.createElement('div');
    $editorWrapper.className = 'editor_wrapper'
    this.$editor.className = 'editor';
    this.$editor.setAttribute('onclick', "event.stopPropagation()")
    this.$editor.innerHTML =
      `
      <textarea name='title' maxlength='200'  placeholder="Заголовок">${this.task.title || ''}</textarea>

      <textarea name='description' maxlength='200'  placeholder="Описание">${this.task.description || ''}</textarea>
      <ul class='statuses_list'>
      ${this.statuses.map((el, id) => {
        return `<li><input id=${id} name=${'status'} type="radio" value=${el} ${this.task.status === el.toLowerCase() && 'checked'} required>
          <label for="${id}">${el}</label>
        </li>`
      }).join('')}
      </ul>
      <ul class='labels_list'>
        <li>
          <input id='design' name='check_UI design' type="checkbox" ${this.task.labels.find(el => el === 'UI design') && 'checked'}>
          <label for="design">UI design</label>
        </li>
        
        <li>
          <input id='marketing' name='check_Marketing' type="checkbox" ${this.task.labels.find(el => el === 'Marketing') && 'checked'}>
          <label for="marketing">Marketing</label>
        </li>
        <li>
          <input id='research' name='check_Research' type="checkbox" ${this.task.labels.find(el => el === 'Research') && 'checked'}>
          <label for="research">Research</label>
        </li>
        
      </ul>
      <button class='editor_button' type="submit">Submit</button>
    `
    $editorWrapper.append(this.$editor)
    return $editorWrapper
  }
}