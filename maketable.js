function constructPurchseTable(selector, plist) {

    $(selector).empty();
    // Getting the all column names
    let ppriceqty = 0

    // Traversing the JSON data
    for (var i = 0; i < plist.length; i++) {
        var row = $('<tr/>');
        row.append($('<td/>').html(plist[i].productName));
        row.append($('<td/>').html(plist[i].purchasePrice));
        row.append($('<td/>').html(plist[i].qty));
        row.append($('<td/>').html(plist[i].purchasePrice * plist[i].qty));
        row.append($('<td/>').html(plist[i].sellingPrice));
        //add btn
        // Adding each row to the table
        ppriceqty += plist[i].purchasePrice * plist[i].qty

        $(selector).append(row);

    }

    $('#tltAmount').text('Total Purchase: ' + ppriceqty)

}

const constructSellTable = () => {
    let sellTableBody = $('#selltablebody').empty();

    for (var i = 0; i < productsList.length; i++) {
        var row = document.createElement('tr');;
        row.innerHTML = `<td>${productsList[i].productName}</td>
      <td>${productsList[i].purchasePrice}</td>
      <td><input class="form-control" id="sellqtyinput${i}" type="number" value="${productsList[i].qty}" max="${productsList[i].qty}"></td>
      <td><input class="form-control"  type="number" value="${productsList[i].sellingPrice}"></td>
      <td><button class="btn btn-red">Sell</button></td>`;
      sellTableBody.append(row);


      let sellInId = $("#sellqtyinput"+i);
       
        sellInId.bind('keyup mouseup', function () {
         
          let temsellprice = parseInt(sellInId.val());
          if(temsellprice > sellInId.attr('max') || temsellprice < 0){
            sellInId.css("background-color","#EC7063");
          }
          else{
            sellInId.css("background-color","#ffffff");
          }
          
      });
    }

    var sellTable = $('#SellTable').DataTable();
}
function constructTransactionTable() {
   
    let selector = '#transactionTable';

    TransactionList.map((val,ind)=>{
        val.total = parseFloat(val.qty)*parseFloat( val.price)
    });
    console.log(TransactionList);
    $(selector).empty();
    // Getting the all column names
    var cols = Headers(TransactionList, selector);
  
    var tbody = $('<tbody/>');
    // Traversing the JSON data
    for (var i = 0; i < TransactionList.length; i++) {
      var row = $('<tr/>');
      if (TransactionList[i].hasOwnProperty('type')) {
        if (TransactionList[i].type == 'sell') {
          row.addClass('green1');
        }
        if (TransactionList[i].type == 'buy') {
          row.addClass('red');
        }
      }
  
      for (var colIndex = 0; colIndex < cols.length; colIndex++) {
        var val = TransactionList[i][cols[colIndex]];
  
        // If there is any key, which is matching
        // with the column name
        if (val == null) val = "";
        row.append($('<td/>').html(val));
      }
  
      // Adding each row to the table
      $(tbody).append(row);
  
    }
  
    $(selector).append(tbody);
  
    $(selector).DataTable();
  
  }
  
  
  function constructProductTable() {
    let selector = '#ProductTable';
    $(selector).empty();
    // Getting the all column names
    var cols = Headers(productsList, selector, true);
  
    var tbody = $('<tbody/>');
    // Traversing the JSON data
    for (var i = 0; i < productsList.length; i++) {
      var row = $('<tr/>');
  
  
      for (var colIndex = 0; colIndex < cols.length; colIndex++) {
        var val = productsList[i][cols[colIndex]];
  
        // If there is any key, which is matching
  
        // with the column name
        if (val == null) val = "";
        row.append($('<td/>').html(val));
      }
      //add btn
      var editBtn = $('<button/>');
      editBtn.html('Edit');
      editBtn.addClass('btn green')
      row.append($('<td/>').append(editBtn));
      // Adding each row to the table
      $(tbody).append(row);
  
    }
  
    $(selector).append(tbody);
  
    $(selector).DataTable();
  
  }
  
  function Headers(list, selector, editBtn) {
    var columns = [];
    var header = $('<tr/>');
    var thead = $('<thead/>')
  
    for (var i = 0; i < list.length; i++) {
      var row = list[i];
  
      for (var k in row) {
        if ($.inArray(k, columns) == -1) {
          columns.push(k);
  
          // Creating the header
          header.append($('<th/>').html(k));
        }
      }
  
    }
    if (editBtn) {
      header.append($('<th/>').html("Action"));
    }
  
    // Appending the header to the table
    $(thead).append(header);
    $(selector).append(thead);
    return columns;
  }
  

