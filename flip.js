document.getElementById("downloadBtn").addEventListener("click", () => {
  const link = document.createElement('a');
  link.download = 'flip_chart.png';
  link.href = document.getElementById("flipChart").toDataURL();
  link.click();
});
function simulateProgression(start, goal, winMult, lossMult, wins, losses) {
    let value = start;
    const values = [value];
    const pattern = Array(wins).fill(winMult).concat(Array(losses).fill(lossMult));
    let i = 0;
  
    while (value < goal && values.length < 100) { // limit to 100 flips
      const mult = pattern[i % pattern.length];
      value *= mult;
      values.push(value);
      i++;
    }
  
    return values;
  }
  
  let progressChart;
  
  function showProgression() {
    const startA = parseFloat(document.getElementById("startAmountA").value);
    const startB = parseFloat(document.getElementById("startAmountB").value);
    const goal = parseFloat(document.getElementById("goalAmount").value);
    const winMult = parseFloat(document.getElementById("winMultiplier").value);
    const lossMult = parseFloat(document.getElementById("lossMultiplier").value);
    const wins = parseInt(document.getElementById("winsPerCycle").value);
    const losses = parseInt(document.getElementById("lossesPerCycle").value);
  
    const valuesA = simulateProgression(startA, goal, winMult, lossMult, wins, losses);
    const valuesB = simulateProgression(startB, goal, winMult, lossMult, wins, losses);
  
    const labels = Array.from({ length: Math.max(valuesA.length, valuesB.length) }, (_, i) => `Flip ${i}`);
  
    const ctx = document.getElementById('progressChart').getContext('2d');
    if (progressChart) progressChart.destroy();
  
    progressChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: `Start A: $${startA}`,
            data: valuesA,
            borderColor: '#4CAF50',
            fill: false,
            tension: 0.2
          },
          {
            label: `Start B: $${startB}`,
            data: valuesB,
            borderColor: '#2196F3',
            fill: false,
            tension: 0.2
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: 'Account Value ($)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Flip Number'
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Value Growth Over Flips'
          }
        }
      }
    });
  }
  