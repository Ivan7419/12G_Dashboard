 class Sale {
    constructor(product, size, color, quantity, customer, price) {
        this.product = product;
        this.size = size;
        this.color = color;
        this.quantity = quantity;
        this.customer = customer;
        this.price = price;
        this.saleDate = new Date().toISOString();
    }

    toJSON() {
        return JSON.stringify(this);
    }
}