// Função para criar o gráfico de linhas (área)
function criarGraficoLinha(ctx, rotulo, dados1, dados2) {
  return new Chart(ctx, {
    type: 'line', // Define o tipo do gráfico como 'line' (gráfico de linha)
    data: {
      labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], // Define os rótulos dos eixos X (dias da semana)
      datasets: [{
        label: rotulo + ' 1', // Rótulo do primeiro conjunto de dados
        data: dados1, // Dados para o primeiro conjunto de dados (qualidade da água ou do ar)
        fill: true, // Preenche a área abaixo da linha
        backgroundColor: 'rgba(55, 218, 112, 0.3)', // Cor de fundo suave para o primeiro conjunto de dados
        borderColor: 'rgba(55, 218, 112, 1)', // Cor da linha do gráfico
        tension: 0.4, // Controla a suavização da curva da linha
        borderWidth: 2 // Largura da linha do gráfico
      }, {
        label: rotulo + ' 2', // Rótulo do segundo conjunto de dados
        data: dados2, // Dados para o segundo conjunto de dados
        fill: true, // Preenche a área abaixo da linha
        backgroundColor: 'rgba(162, 103, 255, 0.3)', // Cor de fundo suave para o segundo conjunto de dados
        borderColor: 'rgba(162, 103, 255, 1)', // Cor da linha do gráfico
        tension: 0.4, // Suaviza a curva da linha
        borderWidth: 2 // Largura da linha
      }]
    },
    options: {
      responsive: true, // Torna o gráfico responsivo (se ajusta ao tamanho da tela)
      scales: {
        y: {
          beginAtZero: true, // Começa o eixo Y no zero
          max: 400, // Define o valor máximo no eixo Y (ajustar conforme necessário)
          ticks: {
            stepSize: 50, // Define o intervalo de marcações no eixo Y
            color: 'white' // Cor das marcações no eixo Y
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)' // Cor da linha da grade no eixo Y
          }
        },
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)' // Cor da linha da grade no eixo X
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: 'white' // Cor das legendas do gráfico
          }
        },
        tooltip: {
          callbacks: {
            label: function(tooltipItem) {
              return tooltipItem.dataset.label + ': ' + tooltipItem.raw; // Exibe o valor ao passar o mouse sobre o gráfico
            }
          }
        }
      }
    }
  });
}

// Função para criar o gráfico de pizza
function criarGraficoPizza(ctx, rotulo, dados, coresFundo) {
  return new Chart(ctx, {
    type: 'pie', // Define o tipo do gráfico como 'pie' (gráfico de pizza)
    data: {
      labels: ['Água Limpa', 'Água Contaminada'], // Rótulos das fatias do gráfico
      datasets: [{
        label: rotulo, // Rótulo do gráfico
        data: dados, // Dados a serem exibidos no gráfico (percentuais)
        backgroundColor: coresFundo, // Cores de fundo para cada fatia do gráfico
        borderColor: 'rgba(255, 255, 255, 0.1)', // Cor da borda das fatias
        borderWidth: 2 // Largura da borda das fatias
      }]
    },
    options: {
      responsive: true, // Torna o gráfico responsivo
      plugins: {
        legend: {
          labels: {
            color: 'white' // Cor das legendas do gráfico
          }
        },
        tooltip: {
          callbacks: {
            label: function(tooltipItem) {
              return tooltipItem.label + ': ' + tooltipItem.raw + '%'; // Exibe a porcentagem ao passar o mouse sobre a fatia
            }
          }
        }
      }
    }
  });
}

// Função para gerar e atualizar os gráficos
function gerarGraficos() {
  // Dados simulados para a qualidade da água e do ar
  const dadosQualidadeAgua1 = [150, 180, 200, 220, 240, 260, 300]; // Simulação de dados para a qualidade da água (exemplo)
  const dadosQualidadeAgua2 = [120, 160, 190, 210, 230, 250, 280]; // Outro conjunto de dados para comparar

  const dadosQualidadeAr1 = [100, 130, 150, 170, 190, 210, 240]; // Simulação de dados para a qualidade do ar
  const dadosQualidadeAr2 = [80, 110, 140, 160, 180, 200, 230]; // Outro conjunto de dados para comparar

  // Dados de pizza para poluição (percentual)
  const dadosPoluicaoAgua = [70, 30]; // 70% de água limpa, 30% de água contaminada
  const dadosPoluicaoAr = [60, 40]; // 60% de ar limpo, 40% de ar poluído

  // Cores de fundo dos gráficos de pizza
  const coresPoluicaoAgua = ['rgba(55, 218, 112, 0.7)', 'rgba(162, 103, 255, 0.7)']; // Cores para o gráfico de poluição da água
  const coresPoluicaoAr = ['rgba(55, 218, 112, 0.7)', 'rgba(255, 99, 132, 0.7)']; // Cores para o gráfico de poluição do ar

  // Criar gráficos de linha
  const contextoGraficoAgua = document.getElementById('graficoLinhaQualidadeAgua').getContext('2d');
  const contextoGraficoAr = document.getElementById('graficoLinhaQualidadeAr').getContext('2d');
  criarGraficoLinha(contextoGraficoAgua, 'Qualidade da Água', dadosQualidadeAgua1, dadosQualidadeAgua2); // Cria o gráfico da qualidade da água
  criarGraficoLinha(contextoGraficoAr, 'Qualidade do Ar', dadosQualidadeAr1, dadosQualidadeAr2); // Cria o gráfico da qualidade do ar

  // Criar gráficos de pizza
  const contextoGraficoPizzaAgua = document.getElementById('graficoPizzaPoluicaoAgua').getContext('2d');
  const contextoGraficoPizzaAr = document.getElementById('graficoPizzaPoluicaoAr').getContext('2d');
  criarGraficoPizza(contextoGraficoPizzaAgua, 'Poluição da Água', dadosPoluicaoAgua, coresPoluicaoAgua); // Cria o gráfico de pizza para a poluição da água
  criarGraficoPizza(contextoGraficoPizzaAr, 'Poluição do Ar', dadosPoluicaoAr, coresPoluicaoAr); // Cria o gráfico de pizza para a poluição do ar
}

// Chama a função para gerar os gráficos
gerarGraficos();

// Simulação de dados de poluição (exemplo)
const niveisDePoluicao = {
  ar: 350, // Índice de qualidade do ar (valor alto, indicando poluição)
  agua: 75, // Índice de poluição da água
};

// Definindo os limites para níveis altos de poluição
const LIMITE_POLUICAO_AR = 300; // Limite para a poluição do ar
const LIMITE_POLUICAO_AGUA = 70; // Limite para a poluição da água

// Função para verificar os níveis de poluição e mostrar o alerta
function verificarPoluicao() {
  const hoje = new Date(); // Obtém a data atual
  const dia = hoje.getDate(); // Obtém o dia do mês
  const mes = hoje.getMonth(); // Obtém o mês (começa do 0, Janeiro = 0)

  // Definindo a data específica (exemplo: 24 de novembro)
  const dataAlerta = new Date(2024, 10, 24); // Define a data de alerta para 24 de novembro de 2024

  // Verificando se é a data de alerta
  if (hoje.toDateString() === dataAlerta.toDateString()) { // Compara a data atual com a data de alerta
    if (niveisDePoluicao.ar > LIMITE_POLUICAO_AR || niveisDePoluicao.agua > LIMITE_POLUICAO_AGUA) {
      // Se os níveis de poluição estiverem acima dos limites, exibe o alerta
      document.getElementById("alerta-container").style.display = "block";
    }
  }
}

// Verifica os níveis de poluição
verificarPoluicao();
