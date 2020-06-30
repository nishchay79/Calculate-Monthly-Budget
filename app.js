// BUDGET CONTROLLER
var budgetController = (function () {
   var Expense = function (id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;

   };

   var Income = function (id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
   };

   var data = {
      allItems: {
         exp: [],
         inc: []
      },
      totals: {
         exp: 0,
         inc: 0
      }
   };

   return {
      addItem: function(type,des,val){
      var newItem,ID;
      // create new Id.  
      if(data.allItems[type].length > 0){
         ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else{
         ID = 0;
      }
      
      
      // create new item based on 'inc' or 'exp'.  
      if(type == 'exp'){
         newItem = new Expense(ID,des,val); 
      }else if(type == 'inc'){
         newItem = new Income(ID,des,val); 
      }
      // Push it into data structure
      data.allItems[type].push(newItem);

      // Return the new element.
      return newItem;  
      },
      testing: function(){
         console.log(data);
      }
   };
})();



// UI CONTROLLER
var UIController = (function () {

   var DOMStrings = {
      inputType: '.add__type',
      inputDescription: '.add__description',
      inputValue: '.add__value',
      inputBtn: '.add__btn'
   };

   return {
      getInput: function () {
         return {
            type: document.querySelector(DOMStrings.inputType).value, // will be either inc or exp.
            description: document.querySelector(DOMStrings.inputDescription).value,
            value: document.querySelector(DOMStrings.inputValue).value
         };
      },

      addListItem: function(obj,type){
         var html,newHtml;
         // create HTML String with placeholder text
         if(type == 'inc'){
            html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div> </div> </div>';
         }else if(type == 'exp'){
            html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
         }
        
        
         // Replace the placeholder text with some actual data
         newHtml = html.replace('%id%',obj.id);
         newHtml = newHtml.replace('%description%',obj.description);
         newHtml = newHtml.replace('%value%',obj.value);

         //Insert the HTML into DOM
         
      },

      getDOMStrings: function () {
         return DOMStrings;
      }
   };

})();




// GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {

   var setupEventListners = function () {
      var DOM = UICtrl.getDOMStrings();


      document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

      document.addEventListener('keypress', function (event) {
         if (event.keyCode === 13) {
            ctrlAddItem();
         }

      });

   }
   var ctrlAddItem = function () {

      var input,newItem;
      // 1. Get the filed input data.
      input = UICtrl.getInput();

      // 2. Add item to budget controller.
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);
   
      // 3. Add new item to the UI.

      // 4. calculate the budget.

      // 5. Display the budget on UI.


   };

   return {
      init: function () {
         console.log('Application has started.');
         setupEventListners();
      }
   };






})(budgetController, UIController);

controller.init();


