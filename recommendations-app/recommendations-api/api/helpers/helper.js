module.exports = {
	dataMapperInsights : dataMapperInsights,
	getProduct : getProduct,
  dataMapperProductBaas : dataMapperProductBaas,
  appendCustomerIdtoQl : appendCustomerIdtoQl,
  //getInsightRecswithProduct : getInsightRecswithProduct
}

function dataMapperInsights(rawBaas, respObj){
  respObj.productName = rawBaas.get('Product');
  respObj.scoreType = rawBaas.get('scoreType');
  respObj.scoreValue = rawBaas.get('scoreValue');
  respObj.userId = rawBaas.get('userId');
  respObj.status = rawBaas.get('status');
  return respObj;
}

function dataMapperProductBaas(prodBaas, respObj){
  respObj.description =  prodBaas.get('description');
  respObj.category = prodBaas.get('category');
  respObj.CatName = prodBaas.get('CatName');
  respObj.discount = prodBaas.get('discount');
  respObj.partNo = prodBaas.get('partNo');
  respObj.photos = [ {"photo" : prodBaas.get('photos/0')}, {"photo" : prodBaas.get('photos/1')} ];
//  respObj['photos/0'] = prodBaas.get('photos/0');
//  respObj['photos/1'] = prodBaas.get('photos/1');
  respObj.price = prodBaas.get('price');
  respObj.productName2 = prodBaas.get('productName2');
  respObj.rating = prodBaas.get('rating');
  respObj['metadata/connecting/products'] = prodBaas.get('metadata/connecting/products');
  respObj['metadata/path'] = prodBaas.get('metadata/path');
  return respObj;
}

function getProduct(rawBaas, callback, client){
	var options = {
    type : 'products',
    qs : {ql : "select * where ShorProdName = '" + rawBaas.get('Product') + "'"}
  }
  client.createCollection(options, callback);
}

function appendCustomerIdtoQl(ql, customerId){
  var qlLocal = "";
  if(customerId === '@me')
    customerId = '1002024'; //@TODO - retrieve customer_id from access token
  if(ql){
    qlLocal = ql.replace("where", "where userId = '" + customerId + "' and ");
  } else{
    qlLocal = "select * where userId = '" + customerId + "' and status = 'current' order by scoreValue desc"
  }
  return(qlLocal);
}