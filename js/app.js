//the container of the table, which is already exists in sales.html
var mainContainer = document.getElementById('main-container');
//create the main table for the data of all locations
var mainTable = document.createElement('table');
mainTable.setAttribute('border', '2px solid black');
var hoursPerDay = 14;
//the total per location
var total = 0;
//2D array of all the location cookies
var allCookiesArray = [];
//the total cookies of all locations
var totalOfTotals = 0;
var locationsArray = [['Seattle', 23, 65, 6.3],['Tokyo', 3, 24, 1.2],['Dubai', 11, 38, 3.7],['Paris', 20, 38, 2.3],['Lima', 2, 16, 4.6]];

function LocationObject(city, minHourlyCustomers, maxHourlyCustomers, avgHourlyCookiesPerCustomer) {
  this.city = city;
  this.minHourlyCustomers = minHourlyCustomers;
  this.maxHourlyCustomers = maxHourlyCustomers;
  this.avgHourlyCookiesPerCustomer = avgHourlyCookiesPerCustomer;
  this.amountOfCookiesPerHour = [];
  this.arrayOfHours = [];
  this.initializeData();
}


//this method generates random number between to values.
LocationObject.prototype.randonNumber = function (min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
};

//this methods calculates the sold cookies for each hour
LocationObject.prototype.calculateSoldCookiesPerHour = function (customerNumber) {
  return customerNumber * this.avgHourlyCookiesPerCustomer;
};

//the method tells how many cookies purchased per hour, and pushes it to the amountOfCookiesPerHour array
LocationObject.prototype.cookiesPurchasedPerHour = function (hoursPerDay) {
  this.amountOfCookiesPerHour.push(this.city);
  for (var i = 0; i < hoursPerDay; i++) {
    this.customerNubmer = this.randonNumber(this.minHourlyCustomers, this.maxHourlyCustomers);
    var value = Math.ceil(this.calculateSoldCookiesPerHour(this.customerNubmer));
    total += value;
    this.amountOfCookiesPerHour.push(value);
  }
  totalOfTotals += total;
  allCookiesArray.push(this.amountOfCookiesPerHour.slice(1, this.amountOfCookiesPerHour.length));
};

//this method creates the hours as array insted of having them hard coded.
LocationObject.prototype.createHoursArray = function (startHour, allHours) {
  var hour;
  //first push empty value to arrange the table
  this.arrayOfHours.push(' ');
  for (var i = startHour - 1; i < allHours + startHour - 1; i++) {
    //taking the modulus so that after 12 return to 1, adding 1 so that 12%12 don't show 0pm.
    hour = i % 12 + 1;
    //less than 11? since I added 1 to the hour as explained above 👆
    if (i < 11) {
      this.arrayOfHours.push(hour + 'am');
    }
    else {
      this.arrayOfHours.push(hour + 'pm');
    }
  }
  this.arrayOfHours.push('Total a day');
};

LocationObject.prototype.createHeader = function (parent, content) {
  var tableHeader;
  for (var i = 0; i < content.length; i++) {
    tableHeader = document.createElement('th');
    tableHeader.setAttribute('width', '6%');
    tableHeader.textContent = content[i];
    if (i === 0)
      tableHeader.setAttribute('width', '10');
    tableHeader.setAttribute('scope', 'col');
    parent.appendChild(tableHeader);
  }
};

LocationObject.prototype.createFooter = function (parent, content) {
  var footer;
  for (var i = 0; i < content.length; i++) {
    footer = document.createElement('td');
    footer.setAttribute('width', '6%');
    if (i === 0) {
      footer = document.createElement('th');
      footer.setAttribute('width', '%10');
      footer.setAttribute('scope', 'row');
    }
    footer.textContent = content[i];
    footer.setAttribute('style', 'text-align:center');
    parent.appendChild(footer);
  }
};

LocationObject.prototype.createColumn = function (parent, content) {
  var tableColumn;
  for (var i = 0; i < content.length; i++) {
    if (i === 0) {
      tableColumn = document.createElement('th');
      tableColumn.setAttribute('width', '%10');
      tableColumn.setAttribute('scope', 'row');
    } else {
      tableColumn = document.createElement('td');
      tableColumn.setAttribute('width', '6%');
    }
    tableColumn.textContent = content[i];
    tableColumn.setAttribute('style', 'text-align:center');
    parent.appendChild(tableColumn);
  }
};


LocationObject.prototype.createRow = function (parent, content, isHeader, isFooter) {
  var tableColumn = document.createElement('tr');
  if (isHeader) {
    this.createHeader(tableColumn, content);
  }
  else if (isFooter) {
    this.createFooter(tableColumn, content);
  }
  else if (!isFooter && !isHeader) {
    this.createColumn(tableColumn, content);
  }
  parent.appendChild(tableColumn);
};

LocationObject.prototype.createFooterData = function () {
  var arrayOfTotals = [];
  arrayOfTotals.push('Totals');
  var sum = 0;
  for (var j = 0; j < hoursPerDay; j++) {
    for (var i = 0; i < locationsArray.length; i++) {
      sum += allCookiesArray[i][j];
    }
    arrayOfTotals.push(sum);
    sum = 0;
  }
  arrayOfTotals.push(totalOfTotals);
  return arrayOfTotals;
};

LocationObject.prototype.initializeData = function () {
  //call the createHoursArray method to fill the arrayOfHours array with data
  this.createHoursArray(6, hoursPerDay);
  //call the method cookiesPurchasedPerHour to fill the  amountOfCookiesPerHour array with data
  this.cookiesPurchasedPerHour(hoursPerDay);
};

LocationObject.prototype.render = function () {
  this.amountOfCookiesPerHour.push(total);
  this.createRow(mainTable, this.amountOfCookiesPerHour, false, false);
  total = 0;
};
//this function to render all the content depending on locationsArray values
function renderPage(array){
  var object1 = array[0];
  var pCity = object1[0];
  var pMin = object1[1];
  var pMax = object1[2];
  var pAvg = object1[3];
  var object = new LocationObject(pCity, pMin, pMax, pAvg);
  object.createRow(mainTable, object.arrayOfHours, true, false);
  object.render();
  for(var i=1; i<locationsArray.length; i++){
    pCity = locationsArray[i][0];
    pMin = locationsArray[i][1];
    pMax = locationsArray[i][2];
    pAvg = locationsArray[i][3];
    object = new LocationObject(pCity, pMin, pMax, pAvg);
    object.render();
  }
  var footerContent0 = object.createFooterData();
  object.createRow(mainTable, footerContent0,false, true );
  mainContainer.appendChild(mainTable);
}
//call the function so that we have first 5 branches shown on the screeen
renderPage(locationsArray);


//get the submit button as variable in java script
var addBranchButton = document.getElementById('form-id');
//add en eveent listener to the button of type click, and a function
//to be executed once the click event happen
addBranchButton.addEventListener('submit', addBranch);

//this function takes the input information from the form ans store them in variables
function addBranch(event) {
  //preventing the default behaviour of the form, (reloading the page after each submit)
  event.preventDefault();
  //get the city name from input filed
  var cityName = event.target.cityNameField.value;
  //get the minCustomersNumber from input field
  var minCustomersNumber = Number(event.target.minCustomerField.value);
  //get the mazCustomersNumber from input field
  var maxCustomersNumber = Number(event.target.maxCustomerField.value);
  //check if the the minCustomersNumber bigger that maxCustomersNumber, if true

  // switch them, and alert the user of the changing
  if(minCustomersNumber > maxCustomersNumber){
    //switch the values using third variable
    var temp = minCustomersNumber;
    minCustomersNumber = maxCustomersNumber;
    maxCustomersNumber = temp;
    alert('You entered min value  bigger than the max value\nSo that the values switched');
  }
  //get the avgCookiesNumber from input filed
  var avgCookiesNumber = Number(event.target.avgCookiesField.value);
  //empty the table, so that the content won't be duplicated once new branch added
  mainTable.textContent = '';
  //empty the 2D array the has the amount of cookies sold per each branch for each hour
  //so that we don't  get duplicated values, since it is global variable
  allCookiesArray = [];
  //empty the total number of sold cookies of all branchs and for all hours
  //so that we don't  get duplicated values, since it is global variable
  totalOfTotals = 0;
  //adding the new information to the array of cities that will be called later to create the objects
  locationsArray.push([cityName, minCustomersNumber, maxCustomersNumber, avgCookiesNumber]);
  //call the renderPage function again on all the branches including the new one
  renderPage(locationsArray);
}
