let tarifas = {};

async function loadTarifas() {
  const res = await fetch("tarifas_por_tipo.json");
  tarifas = await res.json();
  tarifas["2.0TD"].forEach((t, i) =>
    document.getElementById("oferta_20td").add(new Option(t.oferta, i))
  );
}
loadTarifas();

function calcular(tipo) {
  const id = "20";
  const idx = document.getElementById(`oferta_${tipo}`).value;
  const t = tarifas["2.0TD"][idx];

  const dias = parseFloat(document.getElementById(`dias${id}`).value) || 0;
  const kw = parseFloat(document.getElementById(`potencia${id}`).value) || 0;
  const consumo1 = parseFloat(document.getElementById(`consumo1_${id}`).value) || 0;
  const consumo2 = parseFloat(document.getElementById(`consumo2_${id}`).value) || 0;
  const consumo3 = parseFloat(document.getElementById(`consumo3_${id}`).value) || 0;
  const alquiler = parseFloat(document.getElementById(`alquiler${id}`).value) || 0;
  const bono = parseFloat(document.getElementById(`bono${id}`).value) || 0;
  const iva = parseFloat(document.getElementById(`iva${id}`).value) || 0;
  const factura = parseFloat(document.getElementById(`factura${id}`).value) || 0;

  const pot1 = kw * dias * (t.potencia.P1 || 0);
  const pot2 = kw * dias * (t.potencia.P2 || 0);
  const ene1 = consumo1 * (t.consumo.P1 || 0);
  const ene2 = consumo2 * (t.consumo.P2 || 0);
  const ene3 = consumo3 * (t.consumo.P3 || 0);

  const bono_total = bono * dias;
  const beneficio_total = (t.beneficio_unico || 0) * dias;

  const base = pot1 + pot2 + ene1 + ene2 + ene3 + bono_total;
  const imp_elec = base * 0.0511;
  const subtotal = base + imp_elec + alquiler + beneficio_total;
  const iva_valor = subtotal * (iva / 100);
  const total = subtotal + iva_valor;

  const ahorro = factura - total;
  const ahorro_anual = (ahorro / dias) * 360;

  const resultado = document.getElementById("resultado_20td");

  resultado.style.backgroundColor = "#d4f7d4";
  resultado.style.transform = "scale(1.05)";
  setTimeout(() => {
    resultado.style.transform = "scale(1)";
  }, 150);

  const claseAhorro = ahorro >= 0 ? "ahorro-verde" : "ahorro-rojo";

  resultado.innerHTML = `
    <div class="resultado-principal">
      <strong>Factura actual:</strong> <span class="factura-actual-value">` + factura.toFixed(2) + ` €</span><br>
      <strong>Factura nueva:</strong> <span class="factura-nueva-value">` + total.toFixed(2) + ` €</span><br>
      <span class="` + claseAhorro + `">Ahorro: ` + ahorro.toFixed(2) + ` €</span><br>
      Ahorro anual: ` + ahorro_anual.toFixed(2) + ` €<br>
    </div>
    <div class="promo-box">
      <strong>Promoción oferta</strong><br>
      ` + (t.promocion || "Ninguna") + `
    </div>
`;

  // Ajustar las barras con escala lineal
  const valorActual = Math.max(factura, 0);
  const valorNueva = Math.max(total, 0);
  const maxVal = Math.max(valorActual, valorNueva, 1);

  const porcentajeActual = (valorActual / maxVal) * 100;
  const porcentajeNueva = (valorNueva / maxVal) * 100;

  document.getElementById("barra-actual").style.height = porcentajeActual + "%";
  document.getElementById("barra-nueva").style.height = porcentajeNueva + "%";
}

function autoCalcular20td() {
  calcular("20td");
}

document.querySelectorAll("input, select").forEach(input => {
  input.addEventListener("input", autoCalcular20td);
});

# PresupuestadorLuz
{
  "2.0TD": [
    {
      "oferta": "(RESI) NATURGY",
      "consumo": {
        "P1": 0.119166,
        "P2": 0.119166,
        "P3": 0.119166
      },
      "potencia": {
        "P1": 0.108163,
        "P2": 0.033392
      },
      "beneficio_unico": 0,
      "promocion": "huevos con patatas"
    },
    {
      "oferta": "(RESI) ENDESA",
      "consumo": {
        "P1": 0.1236,
        "P2": 0.1236,
        "P3": 0.1236
      },
      "potencia": {
        "P1": 0.112138,
        "P2": 0.040267
      },
      "beneficio_unico": 0,
      "promocion": ""
    },
    {
      "oferta": "2.0TD(PYME/RESI) GANA ENERGIA",
      "consumo": {
        "P1": 0.135,
        "P2": 0.135,
        "P3": 0.135
      },
      "potencia": {
        "P1": 0.127406,
        "P2": 0.049264
      },
      "beneficio_unico": 0,
      "promocion": "5€ descuento para combustible en repsol con Waylet"
    },
    {
      "oferta": "2.0TD(PYME/RESI) GANA Tramos",
      "consumo": {
        "P1": 0.184,
        "P2": 0.121,
        "P3": 0.097
      },
      "potencia": {
        "P1": 0.1274,
        "P2": 0.0493
      },
      "beneficio_unico": 0,
      "promocion": "5€ descuento para combustible en repsol con Waylet"
    },
    {
      "oferta": "2.0TD(index) GANA ENERGIA",
      "consumo": {
        "P1": 0.154,
        "P2": 0.09,
        "P3": 0.068
      },
      "potencia": {
        "P1": 0.0738,
        "P2": 0.0019
      },
      "beneficio_unico": 0.167,
      "promocion": "5€ descuento para combustible en repsol con Waylet"
    },
    {
      "oferta": "2.0TD(PYME) NATURGY",
      "consumo": {
        "P1": 0.134865,
        "P2": 0.134865,
        "P3": 0.134865
      },
      "potencia": {
        "P1": 0.120853,
        "P2": 0.0439
      },
      "beneficio_unico": 0,
      "promocion": ""
    },
    {
      "oferta": "2.0TD(PYME) NATURGY supra",
      "consumo": {
        "P1": 0.142865,
        "P2": 0.142865,
        "P3": 0.142865
      },
      "potencia": {
        "P1": 0.120853,
        "P2": 0.0439
      },
      "beneficio_unico": 0,
      "promocion": ""
    },
    {
      "oferta": "2.0TD(PYME) NATURGY one",
      "consumo": {
        "P1": 0.119365,
        "P2": 0.119365,
        "P3": 0.119365
      },
      "potencia": {
        "P1": 0.120853,
        "P2": 0.0439
      },
      "beneficio_unico": 0,
      "promocion": ""
    },
    {
      "oferta": "2.0TD(PYME) ENDESA",
      "consumo": {
        "P1": 0.1236,
        "P2": 0.1236,
        "P3": 0.1236
      },
      "potencia": {
        "P1": 0.112138,
        "P2": 0.040267
      },
      "beneficio_unico": 0,
      "promocion": ""
    }
  ],
  "3.0TD": [
    {
      "oferta": "3.0TD(PYME) INER fegasus boe",
      "consumo": {
        "P1": 0.1992,
        "P2": 0.18752,
        "P3": 0.16919,
        "P4": 0.15896,
        "P5": 0.14985,
        "P6": 0.13971
      },
      "potencia": {
        "P1": 0.04293,
        "P2": 0.02608,
        "P3": 0.01273,
        "P4": 0.01132,
        "P5": 0.00624,
        "P6": 0.00424
      },
      "beneficio_unico": 0,
      "promocion": ""
    },
    {
      "oferta": "3.0TD(PYME) INER fegasus i4",
      "consumo": {
        "P1": 0.1992,
        "P2": 0.18752,
        "P3": 0.16919,
        "P4": 0.15896,
        "P5": 0.14985,
        "P6": 0.13971
      },
      "potencia": {
        "P1": 0.053855,
        "P2": 0.037008,
        "P3": 0.023658,
        "P4": 0.022248,
        "P5": 0.017168,
        "P6": 0.015168
      },
      "beneficio_unico": 0,
      "promocion": ""
    },
    {
      "oferta": "3.0TD(PYME) NATURGY fijo",
      "consumo": {
        "P1": 0.1937,
        "P2": 0.1679,
        "P3": 0.1458,
        "P4": 0.133099,
        "P5": 0.126599,
        "P6": 0.1189
      },
      "potencia": {
        "P1": 0.055959,
        "P2": 0.030187,
        "P3": 0.013779,
        "P4": 0.012187,
        "P5": 0.008479,
        "P6": 0.005817
      },
      "beneficio_unico": 0,
      "promocion": ""
    },
    {
      "oferta": "3.0TD(PYME) NATURGY fijo supra",
      "consumo": {
        "P1": 0.2072,
        "P2": 0.1814,
        "P3": 0.1593,
        "P4": 0.146599,
        "P5": 0.140099,
        "P6": 0.1324
      },
      "potencia": {
        "P1": 0.055959,
        "P2": 0.030187,
        "P3": 0.013779,
        "P4": 0.012187,
        "P5": 0.008479,
        "P6": 0.005817
      },
      "beneficio_unico": 0,
      "promocion": ""
    },
    {
      "oferta": "3.0TD(PYME) NATURGY fijo one",
      "consumo": {
        "P1": 0.1882,
        "P2": 0.1624,
        "P3": 0.1403,
        "P4": 0.127599,
        "P5": 0.121099,
        "P6": 0.1134
      },
      "potencia": {
        "P1": 0.055959,
        "P2": 0.030187,
        "P3": 0.013779,
        "P4": 0.012187,
        "P5": 0.008479,
        "P6": 0.005817
      },
      "beneficio_unico": 0,
      "promocion": ""
    },
    {
      "oferta": "3.0TD(PYME) PLENITUDE",
      "consumo": {
        "P1": 0.215356,
        "P2": 0.180757,
        "P3": 0.161963,
        "P4": 0.136975,
        "P5": 0.113874,
        "P6": 0.125592
      },
      "potencia": {
        "P1": 0.053858,
        "P2": 0.028086,
        "P3": 0.022801,
        "P4": 0.021209,
        "P5": 0.020282,
        "P6": 0.01762
      },
      "beneficio_unico": 0,
      "promocion": ""
    },
    {
      "oferta": "3.0TD(PYME) PLENITUDE +",
      "consumo": {
        "P1": 0.225247,
        "P2": 0.195129,
        "P3": 0.168238,
        "P4": 0.146266,
        "P5": 0.129771,
        "P6": 0.136605
      },
      "potencia": {
        "P1": 0.056639,
        "P2": 0.033648,
        "P3": 0.022801,
        "P4": 0.023999,
        "P5": 0.025844,
        "P6": 0.025962
      },
      "beneficio_unico": 0,
      "promocion": ""
    }
  ]
}

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>2.0TD Presupuestador</title>
  <style>
    body {
      background: #eaf4ec;
      font-family: 'Segoe UI', sans-serif;
      padding: 20px;
    }
    .panel {
      max-width: 900px;
      margin: auto;
      background: white;
      border: 3px solid #2a6e36;
      padding: 20px;
    }
    .header {
      background: #2a6e36;
      color: white;
      text-align: center;
      padding: 10px;
      font-size: 32px;
      font-weight: bold;
    }
    .contenido {
      display: flex;
      margin-top: 20px;
      justify-content: space-between;
    }
    .tabla-datos {
      border-collapse: collapse;
      width: 50%;
    }
    .tabla-datos td, .tabla-datos th {
      border: 1px solid #999;
      padding: 8px;
    }
    .header-oferta {
      background: #a5d6a7;
      font-weight: bold;
      text-transform: uppercase;
    }
    .cell-oferta {
      background: #ffccbc;
    }
    .label-grey {
      background: #e0e0e0;
      font-weight: bold;
    }
    .label-green {
      background: #a5d6a7;
      font-weight: bold;
    }
    .cell-lightgreen {
      background: #e8f5e9;
    }
    input, select {
      width: 100%;
      box-sizing: border-box;
      padding: 4px;
      border: 1px solid #666;
    }
    .total-section {
      width: 45%;
      text-align: center;
    }
    .titulo-total {
      background: #ffccbc;
      color: #000;
      font-weight: bold;
      padding: 10px;
      font-size: 18px;
    }
    .resultado {
      margin-top: 10px;
      background: #d4f7d4;
      padding: 12px;
      text-align: center;
      border: 2px solid #2a6e36;
      transition: background-color 0.5s ease, transform 0.4s ease;
      animation: entrada 0.6s ease-in-out;
      font-size: 16px;
    }
    @keyframes entrada {
      0% {
        transform: scale(0.95);
        opacity: 0;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }
    .ahorro-verde {
      color: #388e3c;
      transition: color 0.4s ease;
      font-size: 18px;
      font-weight: bold;
    }
    .ahorro-rojo {
      color: #d32f2f;
      transition: color 0.4s ease;
      font-size: 18px;
      font-weight: bold;
    }
    .barras-container {
      margin-top: 30px;
      text-align: center;
    }
    .barras {
      display: flex;
      justify-content: space-around;
      align-items: flex-end;
      height: 150px;
      background: #f9f9f9;
      border: 1px solid #ccc;
      margin: 0 auto;
      max-width: 250px;
    }
    .barra {
      width: 60px;
      transition: height 0.6s ease;
    }
    .barra-actual {
      background-color: #ffcccb; /* pale red */
    }
    .barra-nueva {
      background-color: #4caf50; /* green */
    }
    .label-barras {
      display: flex;
      justify-content: space-around;
      margin-top: 5px;
    }
    .label-barras span {
      width: 60px;
      text-align: center;
      font-size: 14px;
      color: #2a6e36;
    }
  
/* Enlarge Factura actual value in table */
.tabla-datos td.factura-valor {
  font-size: 24px;
  font-weight: bold;
}


  /* Estilos para resultado reorganizado */
  .resultado-principal {
    text-align: left;
    padding: 10px;
  }
  .resultado-principal strong {
    display: inline-block;
    width: 120px;
    font-size: 18px;
  }
  .factura-actual-value, .factura-nueva-value {
    font-weight: bold;
    font-size: 20px;
  }
  .promo-box {
    margin-top: 15px;
    background-color: #ffecb3;
    border: 2px solid #ffb300;
    padding: 10px;
    text-align: center;
    font-size: 16px;
  }
</style>
</head>
<body>
  <div class="panel">
    <div class="header">2.0TD</div>
    <div class="contenido">
      <table class="tabla-datos">
        <tr>
          <th class="header-oferta">OFERTA</th>
          <td class="cell-oferta"><select id="oferta_20td"></select></td>
        </tr>
        <tr>
          <td class="label-grey">Potencia</td>
          <td><input id="potencia20" type="number" step="0.01"></td>
        </tr>
        <tr>
          <td class="label-green">Días</td>
          <td class="cell-lightgreen"><input id="dias20" type="number"></td>
        </tr>
        <tr>
          <td class="label-grey">Consumo P1</td>
          <td><input id="consumo1_20" type="number"></td>
        </tr>
        <tr>
          <td class="label-green">Consumo P2</td>
          <td class="cell-lightgreen"><input id="consumo2_20" type="number"></td>
        </tr>
        <tr>
          <td class="label-grey">Consumo P3</td>
          <td><input id="consumo3_20" type="number"></td>
        </tr>
        <tr>
          <td class="label-green">Alquiler de equipos</td>
          <td class="cell-lightgreen"><input id="alquiler20" type="number"></td>
        </tr>
        <tr>
          <td class="label-grey">Bono social</td>
          <td><input id="bono20" type="number" step="0.000001"></td>
        </tr>
        <tr>
          <td class="label-green">IVA</td>
          <td class="cell-lightgreen"><input id="iva20" type="number" value="21"></td>
        </tr>
        <tr>
          <td class="label-grey">Factura actual</td>
          <td><input id="factura20" type="number"></td>
        </tr>
      </table>
      <div class="total-section">
        <div class="titulo-total">TOTAL</div>
        <div class="resultado" id="resultado_20td"></div>
      </div>
    </div>
    <div class="barras-container">
      <div class="barras">
        <div id="barra-actual" class="barra barra-actual" style="height: 0%;"></div>
        <div id="barra-nueva" class="barra barra-nueva" style="height: 0%;"></div>
      </div>
      <div class="label-barras">
        <span>Actual</span><span>Nueva</span>
      </div>
    </div>
  </div>
  <script src="main.js"></script>
</body>
</html>
