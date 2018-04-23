var Product = function(
  id,
  name,
  dept,
  price,
  qty,
  maxQty,
  restockQty,
  qtySold,
  grossRevenue
) {
  this.id = id;
  this.name = name;
  this.dept = dept;
  this.price = price;
  this.qty = qty;
  this.maxQty = maxQty;
  this.restockQty = restockQty;
  this.qtySold = qtySold;
  this.grossRevenue = grossRevenue;
  this.managerMode = false; 

  this.showItem = function() {
    const padding = ",                                                  ";
    let retval = "";
    retval += (this.id + ")   ").slice(0, 5) ;
    retval += (this.name + padding).slice(0, 30) ;
    retval +=  (" $" + this.price.toFixed(2) + padding).slice(0, 10) ;
    retval += (this.qty + padding).slice(0, 5);
      if(this.managerMode){
          retval += (this.dept + padding).slice(0, 26) ;
          retval += (this.maxQty + padding).slice(0, 7) ;
          retval += (this.restockQty + padding).slice(0, 10) ;
          retval += (this.qtySold + padding).slice(0, 10) ;
          retval += ("$" + this.grossRevenue + padding).slice(0, 10); 
      }
      //" in stock"
    return retval; 
  };

  this.showItemMgr = function() {
    return (
      this.id +
      ") " +
      (this.name + ",                                   ").slice(0, 30) +
      " $" +
      (this.price.toFixed(2) + ",         ").slice(0, 10) +
      +this.qty +
      " in stock"
    );
  };

  this.sellItem = function(qty) {
    this.qty -= parseInt(qty);
    this.qtySold += qty;
    this.grossRevenue += qty * this.price;
    return qty * this.price;
  };
  this.restockItem = function(qty) {
    this.qty += parseInt(qty);;
    // this.qtySold += qty;
    // this.grossRevenue += (qty * this.price);
    return qty * this.price;
  };
};

module.exports = Product;
