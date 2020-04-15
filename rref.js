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

function solve() {
  document.getElementById('rref').style.display = 'none';
  var text = document.getElementById('matrix').value;
  var A = text.split('\n');
  for (var i=0; i<A.length; i++) {
    A[i] = A[i].trim().split(' ');
    for (var j=0; j<A[i].length; j++) {
      A[i][j] = parseFloat(A[i][j]);
    }
  }

  A = rref(A);
  console.log(A);
  document.getElementById('rref').innerHTML = '';
  for (var i=0; i<A.length; i++) {
    for (var j=0; j<A[i].length; j++) {
      document.getElementById('rref').innerHTML += '&nbsp;' + parseFloat(A[i][j].toFixed(3)) + '&nbsp;';
    }
    document.getElementById('rref').innerHTML += '<br>';
  }
  document.getElementById('rref').style.display = 'inline-block';
}

function determinant(A) {
  var n = A.length;
  if (n==2) {
    return (A[0][0]*A[1][1])-(A[0][1]*A[1][0]);
  }
  A = rref(A);
  var det = A[0][0];

  for (var i=1; i<n; i++) {
    det*=A[i][i];
  }
  return det;
}

function det() {
  document.getElementById('det').style.display = 'none';
  var text = document.getElementById('matrix').value;
  var A = text.split('\n');
  for (var i=0; i<A.length; i++) {
    A[i] = A[i].trim().split(' ');
    if (A.length != A[i].length) {
      document.getElementById('det').innerHTML = 'matrix not square';
      document.getElementById('det').style.display = 'inline-block';
      return;
    }
    for (var j=0; j<A[i].length; j++) {
      A[i][j] = parseFloat(A[i][j]);
    }
  }

  document.getElementById('det').innerHTML = 'determinant: ' + determinant(A);
  document.getElementById('det').style.display = 'inline-block';
}