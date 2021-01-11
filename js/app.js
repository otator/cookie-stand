//the container of the table, which is already exists in sales.html
var mainContainer = document.getElementById('main-container');
//create the main table for the data of all locations
var mainTable = document.createElement('table');
mainTable.setAttribute('border','2px solid black');
var hoursPerDay = 14;
//the total per location
var total = 0;
//2D array of all the location cookies
var allCookiesArray = [];
//the total cookies of all locations
var totalOfTotals = 0;

function LocationObject(city, minHourlyCustomers, maxHourlyCustomers, avgHourlyCookiesPerCustomer){
  this.city = city;
  this.minHourlyCustomers = minHourlyCustomers;
  this.maxHourlyCustomers = maxHourlyCustomers;
  this.avgHourlyCookiesPerCustomer = avgHourlyCookiesPerCustomer;
  this.amountOfCookiesPerHour = [];
  this.arrayOfHours = [];
  this.initializeData();
}


//this method generates random number between to values.
LocationObject.prototype.randonNumber = function(min, max){
  return Math.ceil(Math.random() * (max - min) + min);
};

//this methods calculates the sold cookies for eachhour
LocationObject.prototype.calculateSoldCookiesPerHour = function(customerNumber){
  return customerNumber * this.avgHourlyCookiesPerCustomer;
};

//the method tells how many cookies purchased per hour, and pushes it to the amountOfCookiesPerHour array
LocationObject.prototype.cookiesPurchasedPerHour = function(hoursPerDay){
  this.amountOfCookiesPerHour.push(this.city);
  for(var i=0; i<hoursPerDay; i++){
    this.customerNubmer = this.randonNumber(this.minHourlyCustomers, this.maxHourlyCustomers);
    var value = Math.ceil(this.calculateSoldCookiesPerHour(this.customerNubmer));
    total+=value;
    this.amountOfCookiesPerHour.push(value);
  }
  totalOfTotals+=total;
  allCookiesArray.push(this.amountOfCookiesPerHour.slice(1,this.amountOfCookiesPerHour.length));
};

//this method creates the hours as array insted of having them hard coded.
LocationObject.prototype.createHoursArray= function(startHour, allHours){
  var hour;
  //first push empty value to arrange the table
  this.arrayOfHours.push(' ');
  for(var i = startHour-1; i<allHours+startHour -1; i++){
    //taking the modulus so that after 12 return to 1, adding 1 so that 12%12 don't show 0pm.
    hour = i % 12 +1;
    //less than 11? since I added 1 to the hour as explained above 👆
    if(i<11){
      this.arrayOfHours.push(hour + 'am');
    }
    else{
      this.arrayOfHours.push(hour + 'pm');
    }
  }
  this.arrayOfHours.push('Total a day');
};

LocationObject.prototype.createHeader = function(parent, content){
  var tableHeader;
  for(var i=0; i<content.length; i++){
    tableHeader = document.createElement('th');
    tableHeader.setAttribute('width', '6%');
    tableHeader.textContent = content[i];
    if(i === 0)
      tableHeader.setAttribute('width', '10');
    tableHeader.setAttribute('scope', 'col');
    parent.appendChild(tableHeader);
  }
};

LocationObject.prototype.createFooter = function(parent, content){
  var footer;
  for(var i=0; i<content.length; i++){
    footer = document.createElement('td');
    footer.setAttribute('width', '6%');
    if(i===0){
      footer = document.createElement('th');
      footer.setAttribute('width', '%10');
      footer.setAttribute('scope', 'row');
    }
    footer.textContent = content[i];
    footer.setAttribute('style','text-align:center');
    parent.appendChild(footer);
  }
};

LocationObject.prototype.createColumn = function(parent, content){
  var tableColumn;
  for(var i=0; i<content.length; i++){
    tableColumn = document.createElement('td');
    tableColumn.setAttribute('width', '6%');
    if(i===0){
      tableColumn = document.createElement('th');
      tableColumn.setAttribute('width', '%10');
      tableColumn.setAttribute('scope', 'row');
    }
    tableColumn.textContent = content[i];
    tableColumn.setAttribute('style','text-align:center');
    parent.appendChild(tableColumn);
  }
};


LocationObject.prototype.createRow = function(parent, content, isHeader, isFooter){
  var tableColumn = document.createElement('tr');
  if(isHeader){
    this.createHeader(tableColumn, content);
  }
  else if(isFooter){
    this.createFooter(tableColumn, content);
  }
  else{
    this.createColumn(tableColumn, content);
  }
  parent.appendChild(tableColumn);
};

LocationObject.prototype.createFooterData = function(){
  var arrayOfTotals = [];
  arrayOfTotals.push('Totals');
  var sum = 0;
  for(var j=0; j<hoursPerDay; j++){
    for(var i=0; i<5; i++){
      sum+= allCookiesArray[i][j];
    }
    arrayOfTotals.push(sum);
    sum = 0;
  }
  arrayOfTotals.push(totalOfTotals);
  return arrayOfTotals;
};

LocationObject.prototype.initializeData = function(){
//call the createHoursArray method to fill the arrayOfHours array with data
  this.createHoursArray(6,hoursPerDay);
  //call the method cookiesPurchasedPerHour to fill the  amountOfCookiesPerHour array with data
  this.cookiesPurchasedPerHour(hoursPerDay);
};

LocationObject.prototype.render = function(){
  this.amountOfCookiesPerHour.push(total);
  this.createRow(mainTable, this.amountOfCookiesPerHour, false, false);
  total = 0;
};

var Seattle = new LocationObject('Seattle', 23, 65, 6.3);
Seattle.createRow(mainTable, Seattle.arrayOfHours, true, false);
Seattle.render();


var Tokyo = new LocationObject('Tokyo', 3,24, 1.2);
Tokyo.render();

var Dubai = new LocationObject('Dubai', 11, 38, 3.7);
Dubai.render();

var Paris = new LocationObject('Paris', 20, 38,2.3);
Paris.render();

var Lima = new LocationObject('Lima', 2, 16, 4.6);
Lima.render();
var footerContent = Lima.createFooterData();
Lima.createFooter(mainTable, footerContent);

mainContainer.appendChild(mainTable);
