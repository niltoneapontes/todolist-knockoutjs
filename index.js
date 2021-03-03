function ChronometerViewModel() {
  let self = this;
  self.time = ko.observable(0);
  self.message = ko.observable("Vamos lá");

  let lastTimer = 0;

  self.startCount = function(data, event) {
    lastTimer = self.time();
    self.message("GO!");

    const repeat = setInterval(() => {
      let aux = self.time() - 1;

      aux < 0 ? (
        clearInterval(repeat),
        self.message("STOP!")
      ) : (
        self.time(aux)
      )

    }, 1000);
  }

  self.resetCount = function(data, event) {
    clearInterval();
    self.time(0);
    self.message("Vamos lá");
  }

  self.again = function(data,event) {
    self.time(lastTimer);
    self.startCount();
  }
};

const selector = document.querySelector('main#binding');

ko.applyBindings(new ChronometerViewModel, selector);