//-----------------------------------------------------------------------
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
//-----------------------------------------------------------------------
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
//-----------------------------------------------------------------------
/*
function grafic(xi, yi, polin){
  let X = new Array();
  X = [];
  for(let i = xi[0]; i < xi[xi.length - 1]; i+=0.01){
    X.push(i);
  }
    var data = google.visualization.arrayToDataTable([
      X, polin
    ]);

    var options = {
      title: 'Company Performance',
      curveType: 'function',
      legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

    chart.draw(data, options);
}
*/
//-----------------------------------------------------------------------
function grafic(xi, yi, polin){
    // Получаем canvas элемент
    let canvas = document.getElementById('canvas');
    // Указываем элемент для 2D рисования
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = "black"; // Задаём чёрный цвет для линий
    ctx.lineWidth = 2.0; // Ширина линии
    ctx.beginPath(); // Запускает путь
    ctx.moveTo(250, 10); // Указываем начальный путь
    ctx.lineTo(250, 490); // Перемешаем указатель
    ctx.lineTo(250, 250); // Перемешаем указатель
    ctx.lineTo(10, 250); // Перемешаем указатель
    ctx.lineTo(490, 250); // Ещё раз перемешаем указатель
    ctx.stroke(); // Делаем контур

    // Цвет для рисования
ctx.fillStyle = "black";
// Цикл для отображения значений по Y
for(let i = 0; i < 7; i++) {
  if(i != 3){  // чтобы 2 раза ноль не рисовать
    ctx.fillText((3 - i) * 20 + "", 220, i * 60 + 70);
  }
    ctx.beginPath();
    ctx.moveTo(245, i * 60 + 70);
    ctx.lineTo(255, i * 60 + 70);
    ctx.stroke();
}
for(let i = 0; i < 7; i++) {
  if(i != 3){  // чтобы 2 раза ноль не рисовать
    ctx.fillText((i - 3) + "", i * 60 + 70, 220);
  }
    ctx.beginPath();
    ctx.moveTo(i * 60 + 70, 245);
    ctx.lineTo(i * 60 + 70, 255);
    ctx.stroke();
}
    // Объявляем массивы данных графика
    let X = new Array();
    X = [];
    for(let i = xi[0]; i < xi[xi.length - 1]; i+=0.01){
      X.push(i);
    }
    let Y = new Array();
    Y = [];
    for(let j = 0; j < yi.length - 1; j++){
      for(let i = yi[j]; i < yi[j + 1]; i+=0.1){
        Y.push(i);
      }
    }
    console.log("X", X);
    console.log("Y", Y);
    // Цикл для от рисовки графиков
    ctx.beginPath();
    ctx.moveTo(250 + X[0] * 10, 250 + (Y[0] * (-1)));   //  умножаем на -1 т.к. в канвасе используеться
                                                        //  перевернутая система координат
    for(var i = 0; i < Y.length - 1; i++) {
      ctx.lineTo(250 + X[i + 1] * 10, 250 + (Y[i + 1] * (-1))); //  умножаем на -1 т.к. в канвасе используеться
                                                                //  перевернутая система координат
    }
    ctx.stroke();
}
//-----------------------------------------------------------------------
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
  /*
  for(let i = 0; i < tmp.length + 1; i++){
    if(tmp[i] != ','){
      xi[i] = Number(tmp[i]);
    }
  }
  */
  console.log(xi);

  // Polinom Nutona
  let pol = Polinom(xi, yi, ApproxValue);
  //var searchValue = document.getElementById('func').value(pol);
  document.getElementById('func').value = pol;
  grafic(xi, yi, pol);
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
