var hoursPerDay = 14;
var mainContainer = document.getElementById('main-container');

var locationObject = {
  minHourlyCustomers: 0,
  maxHourlyCustomers: 0,
  averageCookiesPerHour:0,
  location:'',
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
var locationDetails = [['Seattle',23,65,6.3],['Tokyo',3,24,1.2],['Dubai', 11,38, 3.7],['Paris', 20,38,2.3],['Lima',2,16,4.6]];
for(var i=0; i<locationDetails.length; i++){
  locationObject.location = locationDetails[i][0];
  locationObject.minHourlyCustomers = locationDetails[i][1];
  locationObject.maxHourlyCustomers = locationDetails[i][2];
  locationObject.averageCookiesPerHour= locationDetails[i][3];
  locationObject.cookiesPurchasedPerHour(hoursPerDay);
  createListDocument(locationObject);
}


//fill the array of hourly cookies amount

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
