import c3 from "c3";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aud",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
//In questo modo filemaker può chiamare questa funzione
//assegno la funzione ad una variabile definita a livello di windows

window.loadChart = function (json) {
  console.log("loadChart", json);
  const obj = JSON.parse(json);
  console.log("loadChart2", obj);
  const data = obj.data;
  const chartType = obj.chartType;
  const labels = obj.labels;

  const options = {
    bindto: "#chart",
    axis: {
      x: {
        type: "category",
      },
      y: {},
    },
    data: {
      onclick: function (d) {
        //const index=d.index;
        //const name=d.name;
        //const value=d.value;
        // queste 3 righe si possono scivere così (destructuring)
        const { index, name, value } = d;

        console.log("INDEX", index);
        const month = months[index];

        const newObj = {
          month,
          name,
          value,
        };
        console.log("NewObj", newObj);
        //converte l'oggetto in JSON
        FileMaker.PerformScript("On chart click", JSON.stringify(newObj));
      },
      colors: {
        data1: "#ff0000",
      },
      type: chartType,
      labels: labels,
      json: data,
      keys: {
        x: "month",
        value: ["Apples", "Peaches", "Pears"],
      },
    },
    legend: {
      hide: false,
    },
  };

  const chart = c3.generate(options);

  window.trasformChart = function (type) {
    chart.transform(type);
  };

  window.loadData = function (json) {
    const obj = JSON.parse(json);
    const data = obj.data;
    console.log(data);
    chart.load({
      json: data,
      keys: {
        x: "month",
        value: ["Bananas"],
      },
    });
  };

  window.somma = function (a, b) {
    const tot = Number(a) + Number(b);
    FileMaker.PerformScript("mostra", tot);
  };
};
