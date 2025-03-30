export const columns = [
    {
        field: 'name',
        headerName: 'Название',
        flex: 0.5,
    },
    {
        field: 'brand',
        headerName: 'Бренд',
        flex: 0.6,
        width: 80,
    },
    {
        field: 'price',
        headerName: 'Цена',
        flex: 0.6,
        width: 80,
        valueFormatter: (value) => {
            return `${value.toLocaleString()} грн.`;
        },
    },
    {
        field: 'color',
        headerName: 'Цвет',
        flex: 0.6,
        width: 80,
        rowSpanValueGetter: (value, row) => {
            return row ? `${row.name}-${row.color}` : value;
        },
    },
    {
        field: 'size',
        headerName: 'Размер',
        flex: 0.6,
        width: 80,
        rowSpanValueGetter: (value, row) => {
            return row ? `${row.name}-${row.size}` : value;
        },
    },
    {
        field: 'quantity',
        headerName: 'Количество',
        flex: 0.6,
        width: 80,
        rowSpanValueGetter: (value, row) => {
            return row ? `${row.name}-${row.quantity}` : value;
        },
    },
];
// export const initialRows = [
//     { id: 1, name: 'Футболка', brand: 'Nike', price: 2500, color: 'Черный', size: 'M', quantity: 50 },
//     { id: 21, name: 'Футболка', brand: 'Nike', price: 2500, color: 'Черный', size: 'S', quantity: 15 },
//     { id: 2, name: 'Футболка', brand: 'Nike', price: 2500, color: 'Белый', size: 'L', quantity: 40 },
//     { id: 3, name: 'Футболка', brand: 'Nike', price: 2500, color: 'Красный', size: 'S', quantity: 30 },
//     { id: 4, name: 'Кроссовки', brand: 'Adidas', price: 7800, color: 'Белый', size: '42', quantity: 30 },
//     { id: 5, name: 'Кроссовки', brand: 'Adidas', price: 7800, color: 'Черный', size: '44', quantity: 25 },
//     { id: 6, name: 'Джинсы', brand: 'Levi’s', price: 5500, color: 'Синий', size: '32', quantity: 20 },
//     { id: 7, name: 'Джинсы', brand: 'Levi’s', price: 5500, color: 'Голубой', size: '34', quantity: 18 },
//     { id: 8, name: 'Рубашка', brand: 'Zara', price: 3200, color: 'Голубой', size: 'L', quantity: 15 },
//     { id: 9, name: 'Рубашка', brand: 'Zara', price: 3200, color: 'Белый', size: 'M', quantity: 20 },
//     { id: 10, name: 'Рубашка', brand: 'Zara', price: 3200, color: 'Черный', size: 'XL', quantity: 10 },
//     { id: 11, name: 'Куртка', brand: 'The North Face', price: 12000, color: 'Серый', size: 'XL', quantity: 10 },
//     { id: 12, name: 'Куртка', brand: 'The North Face', price: 12000, color: 'Черный', size: 'L', quantity: 8 },
//     { id: 13, name: 'Шапка', brand: 'Puma', price: 1800, color: 'Черный', size: 'Универсальный', quantity: 60 },
//     { id: 14, name: 'Шапка', brand: 'Puma', price: 1800, color: 'Красный', size: 'Универсальный', quantity: 50 },
//     { id: 15, name: 'Перчатки', brand: 'Reebok', price: 1500, color: 'Красный', size: 'M', quantity: 25 },
//     { id: 16, name: 'Перчатки', brand: 'Reebok', price: 1500, color: 'Черный', size: 'L', quantity: 22 },
//     { id: 17, name: 'Ботинки', brand: 'Timberland', price: 10500, color: 'Коричневый', size: '43', quantity: 20 },
//     { id: 18, name: 'Ботинки', brand: 'Timberland', price: 10500, color: 'Черный', size: '42', quantity: 15 },
//     { id: 19, name: 'Рюкзак', brand: 'Adidas', price: 6200, color: 'Серый', size: 'Универсальный', quantity: 12 },
//     { id: 20, name: 'Рюкзак', brand: 'Adidas', price: 6200, color: 'Черный', size: 'Универсальный', quantity: 10 },
// ];
//
