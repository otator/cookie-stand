var hoursPerDay = 14;
var mainContainer = document.getElementById('main-container');

var Seattle  = {
  minHourlyCustomers: 23,
  maxHourlyCustomers: 65,
  averageCookiesPerHour:6.3,
  randomNumber: function (min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
  },
  amountOfCookiesPerHourArray :[],
  cookiesPurchasedPerHour: function(hoursPerDay){
    for(var i=0; i<hoursPerDay; i++){
      var customerNubmer = this.randomNumber(this.minHourlyCustomers, this.maxHourlyCustomers);
      this.amountOfCookiesPerHourArray[i] = Math.floor(this.calculateSoldCookiesPerHour(customerNubmer));
    }
  },
  calculateSoldCookiesPerHour: function(numOfCustomers){
    return numOfCustomers * this.averageCookiesPerHour;
  }
};

Seattle.cookiesPurchasedPerHour(hoursPerDay);

var Tokyo  = {
  minHourlyCustomers: 3,
  maxHourlyCustomers: 24,
  averageCookiesPerHour:1.2,
  randomNumber: function (min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
  },
  amountOfCookiesPerHourArray :[],
  cookiesPurchasedPerHour: function(hoursPerDay){
    for(var i=0; i<hoursPerDay; i++){
      var customerNubmer = this.randomNumber(this.minHourlyCustomers, this.maxHourlyCustomers);
      this.amountOfCookiesPerHourArray[i] = Math.floor(this.calculateSoldCookiesPerHour(customerNubmer));
    }
  },
  calculateSoldCookiesPerHour: function(numOfCustomers){
    return numOfCustomers * this.averageCookiesPerHour;
  }
};

Tokyo.cookiesPurchasedPerHour(hoursPerDay);

var Dubai  = {
  minHourlyCustomers: 11,
  maxHourlyCustomers: 38,
  averageCookiesPerHour: 3.7,
  randomNumber: function (min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
  },
  amountOfCookiesPerHourArray :[],
  cookiesPurchasedPerHour: function(hoursPerDay){
    for(var i=0; i<hoursPerDay; i++){
      var customerNubmer = this.randomNumber(this.minHourlyCustomers, this.maxHourlyCustomers);
      this.amountOfCookiesPerHourArray[i] = Math.floor(this.calculateSoldCookiesPerHour(customerNubmer));
    }
  },
  calculateSoldCookiesPerHour: function(numOfCustomers){
    return numOfCustomers * this.averageCookiesPerHour;
  }
};
Dubai.cookiesPurchasedPerHour(hoursPerDay);
var Paris  = {
  minHourlyCustomers: 20,
  maxHourlyCustomers: 38,
  averageCookiesPerHour: 2.3,
  randomNumber: function (min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
  },
  amountOfCookiesPerHourArray :[],
  cookiesPurchasedPerHour: function(hoursPerDay){
    for(var i=0; i<hoursPerDay; i++){
      var customerNubmer = this.randomNumber(this.minHourlyCustomers, this.maxHourlyCustomers);
      this.amountOfCookiesPerHourArray[i] = Math.floor(this.calculateSoldCookiesPerHour(customerNubmer));
    }
  },
  calculateSoldCookiesPerHour: function(numOfCustomers){
    return numOfCustomers * this.averageCookiesPerHour;
  }
};
Paris.cookiesPurchasedPerHour(hoursPerDay);
var Lima  = {
  minHourlyCustomers: 2,
  maxHourlyCustomers: 16,
  averageCookiesPerHour:4.6,
  randomNumber: function (min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
  },
  amountOfCookiesPerHourArray :[],
  cookiesPurchasedPerHour: function(hoursPerDay){
    for(var i=0; i<hoursPerDay; i++){
      var customerNubmer = this.randomNumber(this.minHourlyCustomers, this.maxHourlyCustomers);
      this.amountOfCookiesPerHourArray[i] = Math.floor(this.calculateSoldCookiesPerHour(customerNubmer));
    }
  },
  calculateSoldCookiesPerHour: function(numOfCustomers){
    return numOfCustomers * this.averageCookiesPerHour;
  }
};
Lima.cookiesPurchasedPerHour(hoursPerDay);
createListDocument(Seattle);
createListDocument(Dubai);
createListDocument(Tokyo);
createListDocument(Paris);
createListDocument(Lima);


function createListDocument(locationObject){
  var listItem;
  var cookies;
  var total = 0;
  var arrayIndex = 0;
  var locationParagraph = document.createElement('h2');
  locationParagraph.textContent = locationObject.location;
  mainContainer.appendChild(locationParagraph);
  var listOfCookiesPerHour = document.createElement('ul');
  mainContainer.appendChild(listOfCookiesPerHour);

  for(var hour=5; hour<19; hour++){
    cookies = locationObject.amountOfCookiesPerHourArray[arrayIndex];
    total+=cookies;
    listItem = document.createElement('li');
    listItem.textContent = hour % 12 +1;
    if (hour < 11){
      listItem.textContent+='am: ';

    }
    else{
      listItem.textContent+='pm: ';
    }
    listItem.textContent+=cookies ;
    listOfCookiesPerHour.appendChild(listItem);
    arrayIndex++;
  }
  listItem.textContent = 'Total: ' + total;
  listOfCookiesPerHour.appendChild(listItem);

}

