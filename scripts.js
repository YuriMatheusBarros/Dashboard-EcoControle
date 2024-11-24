// Função para gerar os dados e gráficos de área
function createLineChart(ctx, label, data1, data2) {
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // Dias da semana
      datasets: [{
        label: label + ' 1',
        data: data1,
        fill: true,
        backgroundColor: 'rgba(55, 218, 112, 0.3)', // Cor de fundo suave
        borderColor: 'rgba(55, 218, 112, 1)', // Cor da linha
        tension: 0.4, // Suaviza a curva da linha
        borderWidth: 2
      }, {
        label: label + ' 2',
        data: data2,
        fill: true,
        backgroundColor: 'rgba(162, 103, 255, 0.3)', // Cor de fundo suave
        borderColor: 'rgba(162, 103, 255, 1)', // Cor da linha
        tension: 0.4, // Suaviza a curva da linha
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 400, // Defina o máximo de acordo com o seu valor de poluição
          ticks: {
            stepSize: 50,
            color: 'white'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        },
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: 'white'
          }
        },
        tooltip: {
          callbacks: {
            label: function(tooltipItem) {
              return tooltipItem.dataset.label + ': ' + tooltipItem.raw;
            }
          }
        }
      }
    }
  });
}

// Função para gerar os gráficos de pizza
function createPieChart(ctx, label, data, backgroundColors) {
  return new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Água Limpa', 'Água Contaminada'],
      datasets: [{
        label: label,
        data: data,
        backgroundColor: backgroundColors,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: 'white'
          }
        },
        tooltip: {
          callbacks: {
            label: function(tooltipItem) {
              return tooltipItem.label + ': ' + tooltipItem.raw + '%';
            }
          }
        }
      }
    }
  });
}

// Função para gerar e atualizar os gráficos
function generateCharts() {
  // Dados simulados para a qualidade da água e do ar
  const waterQualityData1 = [150, 180, 200, 220, 240, 260, 300]; // Simulação de poluição da água
  const waterQualityData2 = [120, 160, 190, 210, 230, 250, 280]; // Outro conjunto de dados para comparar

  const airQualityData1 = [100, 130, 150, 170, 190, 210, 240]; // Simulação de poluição do ar
  const airQualityData2 = [80, 110, 140, 160, 180, 200, 230]; // Outro conjunto de dados para comparar

  // Dados de pizza para poluição (percentual)
  const waterPollutionData = [70, 30]; // 70% água limpa, 30% água contaminada
  const airPollutionData = [60, 40]; // 60% ar limpo, 40% ar poluído

  // Cores de fundo dos gráficos de pizza
  const waterPollutionColors = ['rgba(55, 218, 112, 0.7)', 'rgba(162, 103, 255, 0.7)'];
  const airPollutionColors = ['rgba(55, 218, 112, 0.7)', 'rgba(255, 99, 132, 0.7)'];

  // Criar gráficos de área
  const waterChartCtx = document.getElementById('waterQualityLineChart').getContext('2d');
  const airChartCtx = document.getElementById('airQualityLineChart').getContext('2d');
  createLineChart(waterChartCtx, 'Qualidade da Água', waterQualityData1, waterQualityData2);
  createLineChart(airChartCtx, 'Qualidade do Ar', airQualityData1, airQualityData2);

  // Criar gráficos de pizza
  const waterPieChartCtx = document.getElementById('waterPollutionPieChart').getContext('2d');
  const airPieChartCtx = document.getElementById('airPollutionPieChart').getContext('2d');
  createPieChart(waterPieChartCtx, 'Poluição da Água', waterPollutionData, waterPollutionColors);
  createPieChart(airPieChartCtx, 'Poluição do Ar', airPollutionData, airPollutionColors);
}

// Chama a função de gerar gráficos
generateCharts();

// Simulação de dados de poluição (exemplo)
const niveisPoluicao = {
  ar: 350, // Índice de qualidade do ar
  agua: 75, // Índice de poluição da água
};

// Definindo os limites para níveis altos de poluição
const LIMITE_POLUICAO_AR = 300;
const LIMITE_POLUICAO_AGUA = 70;

// Função para verificar os níveis de poluição e mostrar o alerta
function verificarPoluicao() {
  const hoje = new Date();
  const dia = hoje.getDate();
  const mes = hoje.getMonth(); // Mês começa do 0 (Janeiro = 0)

  // Definindo a data específica (exemplo: 24 de novembro)
  const dataAlerta = new Date(2024, 10, 24); // 2024, Novembro (mês 10), Dia 24

  // Verificando se é a data de alerta
  if (hoje.toDateString() === dataAlerta.toDateString()) {
    if (niveisPoluicao.ar > LIMITE_POLUICAO_AR || niveisPoluicao.agua > LIMITE_POLUICAO_AGUA) {
      // Exibindo o alerta
      document.getElementById("alerta-container").style.display = "block";
    }
  }
}

// Função para fechar o alerta
document.getElementById("fechar-alerta").addEventListener("click", () => {
  document.getElementById("alerta-container").style.display = "none";
});

// Chamar a função para verificar os níveis de poluição
verificarPoluicao();
