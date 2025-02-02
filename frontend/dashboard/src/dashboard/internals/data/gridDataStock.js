export const columns = [
    {
        field: 'name',
        headerName: 'Название',
        flex: 1,
    },
    {
        field: 'brand',
        headerName: 'Бренд',
        flex: 0.8,
    },
    {
        field: 'article',
        headerName: 'Артикул',
        flex: 0.6,
        width: 80,
    },
    {
        field: 'color',
        headerName: 'Цвет',
        flex: 0.8,
        width: 300
    },
    {
        field: 'price',
        headerName: 'Цена',
        headerAlign: 'right',
        align: 'right',
        flex: 0.6,
        width: 50,
        valueFormatter: (value) => {
            return `${value.toLocaleString()} грн.`;
        }
    }
];