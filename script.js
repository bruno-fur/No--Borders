// ===== Cabeçalho com sombra ao scroll =====
window.addEventListener("scroll", function () {
  const header = document.querySelector(".custom-header");
  if (window.scrollY > 50) {
    header.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.3)";
  } else {
    header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.15)";
  }
});

// ===== Efeito hover nas redes sociais =====
document.querySelectorAll('.social-icon').forEach(icon => {
  icon.addEventListener('mouseenter', () => {
    icon.style.textShadow = '0 0 8px rgba(255,255,255,0.7)';
  });
  icon.addEventListener('mouseleave', () => {
    icon.style.textShadow = 'none';
  });
});

// ===== Copiar e-mail para a área de transferência =====
const copyBtn = document.getElementById("copyBtn");
if (copyBtn) {
  copyBtn.addEventListener("click", function () {
    const email = document.getElementById("emailValue").textContent.trim();
    navigator.clipboard.writeText(email).then(() => {
      showToast();
      copyBtn.textContent = "Copiado";
      setTimeout(() => (copyBtn.textContent = "Copiar"), 1500);
    });
  });
}

// ===== Toast de confirmação =====
function showToast() {
  const toast = document.getElementById("toast");
  toast.style.opacity = "1";
  toast.style.transform = "translateY(0)";
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(12px)";
  }, 1500);
}

// ===== Gráficos das abas (grafico0 ~ grafico4) =====
document.addEventListener('DOMContentLoaded', () => {
  const dataGrafico0 = {
    labels: ['2017', '2018', '2019', '2020', '2021', '2022', '2023'],
    datasets: [
      { label: 'Venezuelanos', data: [500, 800, 1100, 1000, 1550, 2900, 3450], backgroundColor: '#0d6efd' },
      { label: 'Haitianos', data: [1800, 2100, 2350, 1100, 1050, 1400, 1020], backgroundColor: '#dc3545' },
      { label: 'Senegaleses', data: [150, 200, 250, 180, 220, 450, 550], backgroundColor: '#198754' },
      { label: 'Paraguaios', data: [100, 150, 250, 220, 250, 350, 420], backgroundColor: '#ffc107' }
    ]
  };

  const optionsGrafico0 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'top' } },
    scales: { y: { beginAtZero: true, ticks: { stepSize: 500 } } }
  };

  const canvas0 = document.getElementById('grafico0');
  if (canvas0) {
    new Chart(canvas0.getContext('2d'), {
      type: 'bar',
      data: dataGrafico0,
      options: optionsGrafico0
    });
  }

  // ===== Alternar abas via combobox =====
  const select = document.getElementById('grafico-select');
  const tabContents = document.querySelectorAll('.tab-content');

  select.addEventListener('change', () => {
    const selectedIndex = parseInt(select.value); // <--- CONVERSÃO PARA NÚMERO
    tabContents.forEach((content, i) => {
      content.classList.toggle('active', i === selectedIndex);
    });
  });

  // Registrar o plugin (faça isso antes de criar os gráficos)
  Chart.register(ChartDataLabels);

  // ===== Gráfico 1 - Rosquinhas com animação =====
  const canvas1_1 = document.getElementById('grafico1_canvas1');
  const canvas1_2 = document.getElementById('grafico1_canvas2');
  const canvas1_3 = document.getElementById('grafico1_canvas3');

  if (canvas1_1 && canvas1_2 && canvas1_3) {
    new Chart(canvas1_1.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['Preenchido', 'Vazio'],
        datasets: [{
          data: [65, 35],
          backgroundColor: ['#265C2A', '#E0F2E3'],
          borderWidth: 4,
          borderColor: '#fff'
        }]
      },
      options: chartOptions('65%', '#265C2A')
    });

    new Chart(canvas1_2.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['Preenchido', 'Vazio'],
        datasets: [{
          data: [30, 70],
          backgroundColor: ['#90C16E', '#E0F2E3'],
          borderWidth: 4,
          borderColor: '#fff'
        }]
      },
      options: chartOptions('30%', '#90C16E')
    });

    new Chart(canvas1_3.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['Preenchido', 'Vazio'],
        datasets: [{
          data: [5, 95],
          backgroundColor: ['#B5CC73', '#E0F2E3'],
          borderWidth: 4,
          borderColor: '#fff'
        }]
      },
      options: chartOptions('5%', '#B5CC73')
    });
  }
});

function chartOptions(centerLabel, color) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: { display: false },
      datalabels: {
        color: color,
        font: {
          weight: 'bold',
          size: 18
        },
        formatter: () => centerLabel,
        anchor: 'center',
        align: 'center'
      },
      tooltip: { enabled: false }
    },
    animation: {
      animateRotate: true,
      duration: 1500,
      easing: 'easeOutCirc'
    }
  };
}