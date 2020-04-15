function rref(A) {
  var rows = A.length;
  var columns = A[0].length;
  
  var lead = 0;
  for (var k = 0; k < rows; k++) {
    if (columns <= lead) return;
    
    var i = k;
    while (A[i][lead] === 0) {
      i++;
      if (rows === i) {
        i = k;
        lead++;
        if (columns === lead) return;
      }
    }
    var irow = A[i], krow = A[k];
    A[i] = krow, A[k] = irow;
      
    var val = A[k][lead];
    for (var j = 0; j < columns; j++) {
      A[k][j] /= val;
    }
      
    for (var i = 0; i < rows; i++) {
      if (i === k) continue;
      val = A[i][lead];
      for (var j = 0; j < columns; j++) {
          A[i][j] -= val * A[k][j];
      }
    }
    lead++;
  }
  return A;
}

function main() {
  var text = document.getElementById('matrix').value;
  var A = text.split('\n');
  for (var i=0; i<A.length; i++) {
    A[i] = A[i].trim().split(' ');
    for (var j=0; j<A[i].length; j++) {
      A[i][j] = parseFloat(A[i][j]);
    }
  }

  A = rref(A);
  document.getElementById('result').innerHTML = '';
  for (var i=0; i<A.length; i++) {
    for (var j=0; j<A[i].length; j++) {
      document.getElementById('result').innerHTML += '&nbsp;' + parseFloat(A[i][j].toFixed(3)) + '&nbsp;';
    }
    document.getElementById('result').innerHTML += '<br>';
  }
  document.getElementById('result').style.display = 'inline-block';
}