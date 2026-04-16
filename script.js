document.getElementById('process-btn').addEventListener('click', async () => {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
    if (!file) {
        alert('Selecione um arquivo SPED.');
        return;
    }

    const content = await file.text();
    const result = parseSPED(content);
    displayResults(result);
});

function parseSPED(content) {
    const linhas = content.split('\n');
    let total = linhas.length;
    let blocos = {};
    let erros = 0;
    let warnings = 0;

    linhas.forEach((linha, i) => {
        const parts = linha.split('|');
        const registro = parts[1];

        if (!registro) return;

        const bloco = registro[0];
        blocos[bloco] = (blocos[bloco] || 0) + 1;

        // Exemplo de erro: registro 0000 sem CNPJ válido
        if (registro === '0000' && (!parts[7] || parts[7].length !== 14)) {
            erros++;
        }

        // Exemplo de warning: bloco sem linhas suficientes
        if (bloco === '0' && blocos[bloco] < 10) {
            warnings++;
        }
    });

    return {
        total_linhas: total,
        blocos: Object.keys(blocos).map(b => ({ bloco: b, linhas: blocos[b] })),
        erros_criticos: erros,
        warnings: warnings
    };
}

function displayResults(result) {
    const statusIndicator = document.getElementById('status-indicator');
    const suggestionsList = document.getElementById('suggestions-list');

    let statusClass = 'status-valid';
    let statusText = 'Validado';

    if (result.erros_criticos > 0) {
        statusClass = 'status-error';
        statusText = 'Erro';
    } else if (result.warnings > 0) {
        statusClass = 'status-warning';
        statusText = 'Aviso';
    }

    statusIndicator.className = statusClass;
    statusIndicator.textContent = statusText;

    // Visualizações
    const ctxBlocks = document.getElementById('blocks-chart').getContext('2d');
    new Chart(ctxBlocks, {
        type: 'bar',
        data: {
            labels: result.blocos.map(b => `Bloco ${b.bloco}`),
            datasets: [{
                label: 'Linhas por Bloco',
                data: result.blocos.map(b => b.linhas),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        }
    });

    const ctxErrors = document.getElementById('errors-chart').getContext('2d');
    new Chart(ctxErrors, {
        type: 'doughnut',
        data: {
            labels: ['Erros', 'Avisos', 'Válido'],
            datasets: [{
                data: [result.erros_criticos, result.warnings, Math.max(0, result.total_linhas - result.erros_criticos - result.warnings)],
                backgroundColor: ['red', 'yellow', 'green']
            }]
        }
    });

    // Sugestões da IA
    suggestionsList.innerHTML = '';
    if (result.erros_criticos > 0) {
        const li = document.createElement('li');
        li.className = 'error';
        li.textContent = 'Erro detectado: Verifique o CNPJ no registro 0000. Sugestão: Corrija o CNPJ para 14 dígitos.';
        suggestionsList.appendChild(li);
    }
    if (result.warnings > 0) {
        const li = document.createElement('li');
        li.className = 'warning';
        li.textContent = 'Aviso: Bloco 0 tem poucas linhas. Sugestão: Adicione mais registros para conformidade.';
        suggestionsList.appendChild(li);
    }
    if (result.erros_criticos === 0 && result.warnings === 0) {
        const li = document.createElement('li');
        li.textContent = 'Arquivo validado com sucesso. Nenhuma ação necessária.';
        suggestionsList.appendChild(li);
    }
}