// 行追加の関数
function addRow(tableId) {
    const table = document.getElementById(tableId);
    const newRow = table.insertRow(table.rows.length); 

    const cell1 = newRow.insertCell(0); // 行番号
    const cell2 = newRow.insertCell(1); // 数字1
    const cell3 = newRow.insertCell(2); // 数字2
    const cell4 = newRow.insertCell(3); // 数字3

    // 行番号を付与
    cell1.textContent = table.rows.length - 1; // 最後の行を除いて番号付け
    cell1.className = "row-index"; // クラスを付与

    // 各セルに入力フィールドを追加
    cell2.innerHTML = '<input type="number" onchange="updateSums()">';
    cell3.innerHTML = '<input type="number" onchange="updateSums()">';
    cell4.innerHTML = '<input type="number" onchange="updateSums()">';
}

// 合計を計算して合計テーブルに反映する関数
function updateSums() {
    const table = document.getElementById("excelTable");
    let sum1 = 0, sum2 = 0, sum3 = 0;

    // 各行の入力値を取得して合計を計算
    for (let i = 1; i < table.rows.length; i++) {
        const row = table.rows[i];
        const val1 = parseFloat(row.cells[1].querySelector("input").value || 0);
        const val2 = parseFloat(row.cells[2].querySelector("input").value || 0);
        const val3 = parseFloat(row.cells[3].querySelector("input").value || 0);

        sum1 += val1;
        sum2 += val2;
        sum3 += val3;

        // 行番号の色を変更
        const rowIndexCell = row.cells[0];
        if (val1 + val2 + val3 === 0) {
            rowIndexCell.className = "row-index green";
        } else {
            rowIndexCell.className = "row-index red";
        }
    }

    // 合計テーブルに反映
    const sumTable = document.getElementById("sumTable");
    sumTable.rows[0].cells[1].querySelector("input").value = sum1;
    sumTable.rows[0].cells[2].querySelector("input").value = sum2;
    sumTable.rows[0].cells[3].querySelector("input").value = sum3;
}

// 清算テーブルを計算して更新する関数
function updateCheckTable() {
    const rate = parseFloat(document.getElementById("rateInput").value || 0);
    const chip = parseFloat(document.getElementById("chipInput").value || 0);
    let sum1 = 0, sum2 = 0, sum3 = 0;

    const sumTable = document.getElementById("sumTable");
    const sumRow = sumTable.rows[0]; // "計"行
    const chipRow = sumTable.rows[1]; // "チ"行

    const sumA = parseFloat(sumRow.cells[1].querySelector("input").value || 0);
    const sumB = parseFloat(sumRow.cells[2].querySelector("input").value || 0);
    const sumC = parseFloat(sumRow.cells[3].querySelector("input").value || 0);

    const chip1 = parseFloat(chipRow.cells[1].querySelector("input").value || 0);
    const chip2 = parseFloat(chipRow.cells[2].querySelector("input").value || 0);
    const chip3 = parseFloat(chipRow.cells[3].querySelector("input").value || 0);

    sum1 = sumA*rate + chip1*chip;
    sum2 = sumB*rate + chip2*chip;
    sum3 = sumC*rate + chip3*chip;

    // 合計テーブルに反映
    const checkTable = document.getElementById("checkTable");
    checkTable.rows[0].cells[1].querySelector("input").value = sum1;
    checkTable.rows[0].cells[2].querySelector("input").value = sum2;
    checkTable.rows[0].cells[3].querySelector("input").value = sum3;

    // 行番号の色を変更
    const row = checkTable.rows[0];
    const rowIndexCell = row.cells[0];
    if (sum1 + sum2 + sum3 === 0) {
        rowIndexCell.className = "row-index green";
    } else {
        rowIndexCell.className = "row-index red";
    }
}