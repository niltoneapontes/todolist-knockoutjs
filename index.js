class Task {
  constructor({title, isDone = false}) {
    this.title = ko.observable(title);
    this.isDone = ko.observable(isDone);
  }
}

function ToDoViewModel() {
  let self = this;
  const storagedTasks = localStorage.getItem('@KnockList:tasks');
  self.tasks = ko.observableArray(storagedTasks ? JSON.parse(storagedTasks) : []);
  self.newTask = ko.observable("").extend({
    validation: {
      message: "Digite mais de 3 caractéres",
      validator: function(value) {
        return value.length > 2;
      }
    }
  });

  self.addTask = function() {
    var errors = ko.validation.group(self);
    if (errors().length > 0)
    {
        alert("Insira uma tarefa válida");
        errors.showAllMessages(true);

        return false;
    }
    self.tasks.push(new Task({ title: self.newTask() }));
    self.newTask();
  };

  self.tasks.subscribe(() => {
    let tasksToStorage = self.tasks();
    localStorage.setItem('@KnockList:tasks', ko.toJSON(tasksToStorage));
  })

  self.deleteTask = function(task) {
    self.tasks.remove(task);
  }
};

const selector = document.querySelector('main#binding');

ko.applyBindings(new ToDoViewModel(), selector);