// Set new default font family and font color to mimic Bootstrap's default styling
(Chart.defaults.global.defaultFontFamily = "Nunito"),
  '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = "#858796";

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + "").replace(",", "").replace(" ", "");
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = typeof thousands_sep === "undefined" ? "," : thousands_sep,
    dec = typeof dec_point === "undefined" ? "." : dec_point,
    s = "",
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return "" + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || "").length < prec) {
    s[1] = s[1] || "";
    s[1] += new Array(prec - s[1].length + 1).join("0");
  }
  return s.join(dec);
}
//Meses
let MESES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

var dates = [];
var Visitas = [];
var Favorables = [];
var Desfavorables = [];
var FavReque = [];

for (var i = 0; i < barChaVisit.length; i++) {
  if (barChaVisit[i] == new Date().getFullYear()) {
    dates.push(MESES[barChaVisit[i + 1] - 1]);
    Visitas.push(barChaVisit[i + 2]);

    if (barChaFav.includes(barChaVisit[i + 1])) {
      for (var k = 0; k < barChaFav.length; k++) {
        if (
          barChaFav[k] == new Date().getFullYear() &&
          barChaFav[k + 1] == barChaVisit[i + 1]
        ) {
          Favorables.push(barChaFav[k + 2]);
        }
      }
    } else {
      Favorables.push("0");
    }

    if (barChaDes.includes(barChaVisit[i + 1])) {
      for (var j = 0; j < barChaDes.length; j++) {
        if (
          barChaDes[j] == new Date().getFullYear() &&
          barChaDes[j + 1] == barChaVisit[i + 1]
        ) {
          Desfavorables.push(barChaDes[i + 2]);
        }
      }
    } else {
      Desfavorables.push("0");
    }

    if (barChaFavRe.includes(barChaVisit[i + 1])) {
      for (var x = 0; x < barChaFavRe.length; x++) {
        if (
          barChaFavRe[x] == new Date().getFullYear() &&
          barChaFavRe[x + 1] == barChaVisit[i + 1]
        ) {
          FavReque.push(barChaFavRe[x + 2]);
        }
      }
    } else {
      FavReque.push("0");
    }
  }
}

console.log(dates);
console.log(Visitas);
console.log(Favorables);
console.log(Desfavorables);
console.log(FavReque);

var ctx = document.getElementById("myBarChart");
var myBarChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: dates,
    datasets: [
      {
        label: "Visitas",
        backgroundColor: "#4e73df",
        hoverBackgroundColor: "#2e59d9",
        borderColor: "#4e73df",
        data: Visitas,
      },
      {
        label: "Favorables",
        backgroundColor: "#36C123",
        hoverBackgroundColor: "#25E10B",
        borderColor: "#36C123",
        data: Favorables,
      },
      {
        label: "Favorables Con Requerimientos",
        backgroundColor: "#E3DB24",
        hoverBackgroundColor: "#F1E70D",
        borderColor: "#E3DB24",
        data: FavReque,
      },
      {
        label: "Desfavorables",
        backgroundColor: "#CA3A3A",
        hoverBackgroundColor: "#F10A0A",
        borderColor: "#CA3A3A",
        data: Desfavorables,
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0,
      },
    },
    scales: {
      xAxes: [
        {
          time: {
            unit: "month",
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            maxTicksLimit: 12,
          },
          maxBarThickness: 25,
        },
      ],
      yAxes: [
        {
          ticks: {
            min: 0,
            max: visitAcep * 2,
            maxTicksLimit: 10,
            padding: 10,
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return "" + number_format(value);
            },
          },
        },
      ],
    },
    legend: {
      display: false,
    },
    tooltips: {
      mode: "label",
      titleMarginBottom: 10,
      titleFontColor: "#6e707e",
      titleFontSize: 14,
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: "#dddfeb",
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      caretPadding: 10,
      callbacks: {
        label: function (tooltipItem, chart) {
          var datasetLabel =
            chart.datasets[tooltipItem.datasetIndex].label || "";
          return datasetLabel + ": " + number_format(tooltipItem.yLabel);
        },
      },
    },
  },
});
