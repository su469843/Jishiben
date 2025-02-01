// 从 LocalStorage 加载数据
document.addEventListener('DOMContentLoaded', function () {
    loadExpenses();
});

// 表单提交事件
document.getElementById('expenseForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value).toFixed(2);
    const date = document.getElementById('date').value;

    if (description && amount && date) {
        addExpense(description, amount, date);
        document.getElementById('expenseForm').reset();
    } else {
        alert('请填写所有字段');
    }
});

// 添加记录
function addExpense(description, amount, date) {
    const expense = { description, amount, date };
    const expenses = getExpenses();
    expenses.push(expense);
    saveExpenses(expenses);
    renderExpenses();
}

// 删除记录
function deleteExpense(index) {
    const expenses = getExpenses();
    expenses.splice(index, 1);
    saveExpenses(expenses);
    renderExpenses();
}

// 获取所有记录
function getExpenses() {
    const expenses = localStorage.getItem('expenses');
    return expenses ? JSON.parse(expenses) : [];
}

// 保存记录到 LocalStorage
function saveExpenses(expenses) {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// 渲染记录到表格
function renderExpenses() {
    const tableBody = document.querySelector('#expenseTable tbody');
    const expenses = getExpenses();
    tableBody.innerHTML = '';

    expenses.forEach((expense, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.description}</td>
            <td>${expense.amount}</td>
            <td>${expense.date}</td>
            <td><span class="delete-btn" onclick="deleteExpense(${index})">删除</span></td>
        `;
        tableBody.appendChild(row);
    });
}

// 加载记录
function loadExpenses() {
    renderExpenses();
}
