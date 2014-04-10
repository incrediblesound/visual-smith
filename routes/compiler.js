exports.compileBar = function(body, title) {
  body = body.split('\r\n');
  var data = [];
  forEach(body, function(item) {
    item = item.split(' ');
    data.push({name: item[0], value: item[1]});
  })
  return {type: "bar", title: title, content: data};
};
exports.compileForce = function(body, title) {
  var names = {};
  var nodes = {};
  var links = [];
  body = body.split('<CONNECT>');
  console.log(body);
  var units = noSpace(body[0].split('\r\n'));
  var linkages = noSpace(body[1].split('\r\n'));
  forEach(units, function(unit) {
    unit = unit.split('.');
    names[unit[0]] = unit[1];
  })
  forEach(linkages, function(linkage) {
    linkage = linkage.split('->');
    links.push({source: linkage[0], target: linkage[1]});
  })
  return {type: "fce",title: title, names: names, links: links};
}

var forEach = function(array, fn) {
  for(i=0;i<array.length;i++) {
    fn(array[i]);
  }
};

var noSpace = function(array) {
  var New = [];
  forEach(array, function(el) {
    if(el !== '') {
      New.push(el);
    }
  })
  return New
}