
const tasks = [
  { id: 1, text: 'Complete project proposal' },
  { id: 2, text: 'Review code submissions' },
  { id: 3, text: 'Update documentation' },
  { id: 4, text: 'Team meeting' }
];

const listContainer = document.getElementById('task-list');
let dragSrcEl = null;

function createTaskItem(task) {
  const item = document.createElement('div');
  item.className = 'task-item';
  item.draggable = true;
  item.textContent = task.id+" "+task.text  ;
  item.dataset.id = task.id;

  item.addEventListener('dragstart', handleDragStart);
  item.addEventListener('dragover', handleDragOver);
  item.addEventListener('drop', handleDrop);
  item.addEventListener('dragend', handleDragEnd);

  return item;
}

function handleDragStart(e) {
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
  this.classList.add('dragging');
}

function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  return false;
}

function handleDrop(e) {
  e.stopPropagation();
  if(dragSrcEl !== this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
  }
  return false;
}

function handleDragEnd() {
  this.classList.remove('dragging');
}

tasks.forEach(task => {
  const taskItem = createTaskItem(task);
  listContainer.appendChild(taskItem);
});

