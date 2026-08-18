// Set today's date
document.getElementById("invoiceDate").value =
    new Date().toISOString().split("T")[0];


// ADD PRODUCT

function addProduct() {

    const productForm = document.getElementById("productForm");

    const row = document.createElement("div");

    row.className = "product-row";

    row.innerHTML = `
        <input type="text"
               class="p-description"
               placeholder="Description">

        <input type="text"
               class="p-hsn"
               placeholder="HSN">

        <input type="number"
               class="p-qty"
               placeholder="Qty"
               value="1"
               min="1">

        <input type="number"
               class="p-rate"
               placeholder="Rate"
               value="0"
               min="0">

        <button onclick="removeProduct(this)"
                class="remove-btn">
            ×
        </button>
    `;

    productForm.appendChild(row);
}


// REMOVE PRODUCT

function removeProduct(button) {

    const rows = document.querySelectorAll(".product-row");

    if (rows.length > 1) {
        button.parentElement.remove();
    }

    updateInvoice();
}


// UPDATE INVOICE

function updateInvoice() {

    // Customer details

    document.getElementById("outCustomerName").textContent =
        document.getElementById("customerName").value;

    document.getElementById("outCustomerAddress").textContent =
        document.getElementById("customerAddress").value;

    document.getElementById("outCustomerGST").textContent =
        document.getElementById("customerGST").value;

    document.getElementById("outCustomerState").textContent =
        document.getElementById("customerState").value;


    // Invoice details

    document.getElementById("outInvoiceNo").textContent =
        document.getElementById("invoiceNo").value;

    const date =
        document.getElementById("invoiceDate").value;

    if (date) {

        const formattedDate =
            new Date(date).toLocaleDateString("en-IN");

        document.getElementById("outInvoiceDate").textContent =
            formattedDate;

    }


    // Bank details

    document.getElementById("outBankName").textContent =
        document.getElementById("bankName").value;

    document.getElementById("outAccountNo").textContent =
        document.getElementById("accountNo").value;

    document.getElementById("outIFSC").textContent =
        document.getElementById("ifsc").value;


    // PRODUCTS

    const descriptions =
        document.querySelectorAll(".p-description");

    const hsns =
        document.querySelectorAll(".p-hsn");

    const quantities =
        document.querySelectorAll(".p-qty");

    const rates =
        document.querySelectorAll(".p-rate");

    const invoiceItems =
        document.getElementById("invoiceItems");


    invoiceItems.innerHTML = "";

    let subtotal = 0;


    for (let i = 0; i < descriptions.length; i++) {

        const description =
            descriptions[i].value || "";

        const hsn =
            hsns[i].value || "";

        const qty =
            Number(quantities[i].value) || 0;

        const rate =
            Number(rates[i].value) || 0;

        const amount =
            qty * rate;

        subtotal += amount;


        const tr =
            document.createElement("tr");

        tr.innerHTML = `

            <td>${i + 1}</td>

            <td>${description}</td>

            <td>${hsn}</td>

            <td>${qty}</td>

            <td>₹${rate.toFixed(2)}</td>

            <td>₹${amount.toFixed(2)}</td>

        `;

        invoiceItems.appendChild(tr);

    }


    // Add empty rows

    const currentRows =
        descriptions.length;

    const emptyRows =
        Math.max(8 - currentRows, 0);


    for (let i = 0; i < emptyRows; i++) {

        const tr =
            document.createElement("tr");

        tr.innerHTML = `
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        `;

        invoiceItems.appendChild(tr);
    }


    // GST

    const cgstRate =
        Number(document.getElementById("cgstRate").value) || 0;

    const sgstRate =
        Number(document.getElementById("sgstRate").value) || 0;


    const cgst =
        subtotal * cgstRate / 100;

    const sgst =
        subtotal * sgstRate / 100;


    const total =
        subtotal + cgst + sgst;


    // DISPLAY TOTALS

    document.getElementById("subtotal").textContent =
        "₹" + subtotal.toFixed(2);

    document.getElementById("cgstAmount").textContent =
        "₹" + cgst.toFixed(2);

    document.getElementById("sgstAmount").textContent =
        "₹" + sgst.toFixed(2);

    document.getElementById("grandTotal").textContent =
        "₹" + total.toFixed(2);


    document.getElementById("cgstLabel").textContent =
        cgstRate + "%";

    document.getElementById("sgstLabel").textContent =
        sgstRate + "%";

}


// AUTO UPDATE

document.addEventListener("input", function () {

    updateInvoice();

});


// FIRST LOAD

updateInvoice();