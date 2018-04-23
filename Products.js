var Products = function(
) {
  this.list = [];
  this.managerMode = false; // Set to true when a manager
  this.supervisorMode = false; // Set to true when a manager

  this.addProduct = function(product) {
    this.list.push(product);
    if (this.managerMode)
     product.managerMode = this.managerMode;
    return this.list;
  };

  this.emptyList = function() {
    while (this.list.length) {
      this.list.pop();
    }
    return this.list;
  };
  
  this.productDisplayList = function() {
    var displayList = [];
    this.list.forEach(element => {
      displayList.push(element.showItem());
    });
    return displayList;
  }

  this.getIdFromAns = function(str) {
    var id = -1;
    var arr = str.split(")");
    var id = parseInt(arr[0]);
    return id;
  };

  this.productQuestion = function(){
    if (this.managerMode)
    return "What product(s) would you like to edit?\n";
    else
    return "What product(s) would you like to buy?\n";

  };
  
  this.myFindIndexById = function(id_param) {
    var retval = -1;
    var id = parseInt(id_param);
    for (let i = 0; i < this.list.length; i++) {
      if (id === this.list[i].id) {
        retval = i;
        break;
      }
    }
    return retval;
  };
  
  this.showHeader = function() {
    const padding = ",                                                  ";
    let retval = ""; 
    retval += ( "  id)     ").slice(0, 7);
    retval +=   ("Product" + padding).slice(0, 30);
    retval +=   ("Price" + padding).slice(0, 10);
    retval += ("Qty" + padding).slice(0, 5);
      if(this.managerMode){
        retval += ("Department" + padding).slice(0, 26);
        retval +=   ("MaxStk" + padding).slice(0, 7);
        retval +=   ("ReStk#" + padding).slice(0, 7);
        retval +=   ("Ttl Sold" + padding).slice(0, 10);
        retval +=   ("Gross$" + padding).slice(0, 10); 
      }
      //" in stock"
    return retval; 
  };


};

module.exports = Products;
