function Coef( x, f0){
  let table = new Array();
  table = [];

  table.push(f0);

  let coef = new Array();

  for (j = 1; j < x.length; j++){

      let fj = new Array();
      fj = [];
      for (i = 0; i < (table[j-1].length - 1); i++){
          let f = (table[j-1][i+1]-table[j-1][i])/(x[i+j]-x[i]);

          fj.push(f);
      }
      table.push(fj);
  }
  for(i = 0; i < x.length; i++){
      coef.push(table[i][0]);
  }
  return coef;


}

function Polinom( xi, yi, ApproxValue){
    let sum = 0;
    let ai = new Array();
    ai = Coef(xi, yi);
    for (i = 0; i < xi.length; i++){
        s = ai[i];
        for (j = 0; j < i; j++){
            s *= (ApproxValue - xi[j]);
        }
        sum += s;
      }
    return(sum);

}

function Start() {

  let a = 1;
  let xi = new Array();
  let yi = new Array();
  xi = [1, 2, 3, 4, 5 , 6];  //  изначальные значения массива xi
  yi = [-8, -17, -22, -17, 4, 47];  //  изначальные значения массива yi

  let tmpX = document.getElementById('Xi').value;
  let tmpY = document.getElementById('Yi').value;
  let ApproxValue = Number(document.getElementById('ApproxValue').value);

  if (Number.isInteger(ApproxValue)) {
  }
  else{
    ApproxValue = 1;
  }
  console.log(ApproxValue);

  if(tmpX != ''){  //  если строка не пустая, то
      xi.splice(0,xi.length);  //  опустошаем массив
      xi = tmpX.split(',').map(Number);  //  переводим нашу строку в массив чиссел, а потом заполняем им xi
  }
  if(tmpY != ''){  //  если строка не пустая, то
      yi.splice(0,yi.length);  //  опустошаем массив
      yi = tmpY.split(',').map(Number);  //  переводим нашу строку в массив чиссел, а потом заполняем им xi
  }

  // Polinom Nutona
  let pol = Polinom(xi, yi, ApproxValue);
  document.getElementById('func').value = pol;
}

//   для открытия вкладки
function OpenFragm(evt, FragmName) {
    let tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(FragmName).style.display = "block";
    evt.currentTarget.className += " active";
}
