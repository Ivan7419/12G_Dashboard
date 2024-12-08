import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import {renderStatus} from "../../helpers/status";


function isOverflown(element) {
  return (
      element.scrollHeight > element.clientHeight ||
      element.scrollWidth > element.clientWidth
  );
}

const GridCellExpand = React.memo(function GridCellExpand(props) {
  const { width, value } = props;
  const wrapper = React.useRef(null);
  const cellDiv = React.useRef(null);
  const cellValue = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showFullCell, setShowFullCell] = React.useState(false);
  const [showPopper, setShowPopper] = React.useState(false);

  const handleMouseEnter = () => {
    const isCurrentlyOverflown = isOverflown(cellValue.current);
    setShowPopper(isCurrentlyOverflown);
    setAnchorEl(cellDiv.current);
    setShowFullCell(true);
  };

  const handleMouseLeave = () => {
    setShowFullCell(false);
  };

  React.useEffect(() => {
    if (!showFullCell) {
      return undefined;
    }

    function handleKeyDown(nativeEvent) {
      if (nativeEvent.key === 'Escape') {
        setShowFullCell(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setShowFullCell, showFullCell]);

  return (
      <Box
          ref={wrapper}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          sx={{
            alignItems: 'center',
            lineHeight: '24px',
            width: '100%',
            height: '100%',
            position: 'relative',
            display: 'flex',
          }}
      >
        <Box
            ref={cellDiv}
            sx={{
              height: '100%',
              width,
              display: 'block',
              position: 'absolute',
              top: 0,
            }}
        />
        <Box
            ref={cellValue}
            sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {value}
        </Box>
        {showPopper && (
            <Popper
                open={showFullCell && anchorEl !== null}
                anchorEl={anchorEl}
                style={{ width, marginLeft: -17 }}
            >
              <Paper
                  elevation={1}
                  style={{ minHeight: wrapper.current.offsetHeight - 3 }}
              >
                <Typography variant="body2" style={{ padding: 8 }}>
                  {value}
                </Typography>
              </Paper>
            </Popper>
        )}
      </Box>
  );
});

function renderCellExpand(params) {
  return (
      <GridCellExpand value={params.value || ''} width={params.colDef.computedWidth} />
  );
}

export const columns = [
  {
    field: 'item',
    headerName: 'Покупка',
    flex: 0.5,
    minWidth: 300,
  },
  {
    field: 'fullname',
    headerName: 'Покупатель',
    flex: 1,
    width: 300,
  },
  {
    field: 'phone',
    headerName: 'Телефон',
    flex: 0.8,
    width: 80,
  },
  {
    field: 'address',
    headerName: 'Адрес',
    flex: 1,
    width: 300,
    renderCell: renderCellExpand,
  },
  {
    field: 'amount',
    headerName: 'Сумма',
    headerAlign: 'right',
    align: 'right',
    flex: 0.6,
    minWidth: 50,
    valueFormatter: (value) => {
      return `${value.toLocaleString()} грн.`;
    },
  },
  {
    field: 'tth',
    headerName: 'TTH',
    flex: 1,
    width: 100,
    headerAlign: 'right',
    align: 'right',
  },
  {
    field: 'status',
    headerName: 'Статус',
    renderCell: renderStatus,
    headerAlign: 'right',
    align: 'right',
    flex: 0.8,
    width: 100,
  },
];

export const initialRows = [
  {
    id: 1,
    item: 'ILL ZIP',
    fullname: 'Фёдор Садурский',
    phone: '073288549',
    address: '457651, Амурская область, город Раменское, пер. Домодедовская, 47',
    amount: 2500,
    tth: '556359484',
    status: 'Доставлено',
  },
  {
    id: 2,
    item: 'ULTRA BAG',
    fullname: 'Анна Ковалева',
    phone: '073112349',
    address: '784529, Орловская область, город Люберцы, шоссе Будапештсткая, 99',
    amount: 1200,
    tth: '923457281',
    status: 'Ожидание',
  },
  {
    id: 3,
    item: 'STYLISH WALLET',
    fullname: 'Игорь Шевченко',
    phone: '073553781',
    address: '329079, Новгородская область, город Талдом, пер. Гоголя, 81',
    amount: 700,
    tth: '665784321',
    status: 'Доставлено',
  },
  {
    id: 4,
    item: 'SUNGLASSES PRO',
    fullname: 'Мария Нечаева',
    phone: '073842398',
    address: '085455, Нижегородская область, город Дмитров, ул. Чехова, 56',
    amount: 600,
    tth: '232344883',
    status: 'Ожидание',
  },
  {
    id: 5,
    item: 'URBAN WATCH',
    fullname: 'Владислав Кравчук',
    phone: '073244890',
    address: '572577, Ульяновская область, город Одинцово, ул. Домодедовская, 30',
    amount: 3000,
    tth: '998345671',
    status: 'Отправлено',
  },
  {
    id: 6,
    item: 'SPORT SHOES',
    fullname: 'Светлана Петрова',
    phone: '073847932',
    address: '704072, Свердловская область, город Лотошино, наб. Ленина, 60',
    amount: 2200,
    tth: '771234569',
    status: 'Доставлено',
  },
  {
    id: 7,
    item: 'CASUAL BELT',
    fullname: 'Алексей Сергеев',
    phone: '073349821',
    address: '23.4',
    amount: 350,
    tth: '554671249',
    status: 'Ожидание',
  },
  {
    id: 8,
    item: 'CLASSIC HAT',
    fullname: 'Ольга Кузьмина',
    phone: '073229482',
    address: '24.2',
    amount: 800,
    tth: '667839403',
    status: 'Отправлено',
  },
  {
    id: 9,
    item: 'LEATHER JACKET',
    fullname: 'Елена Николаева',
    phone: '073993482',
    address: '26.4',
    amount: 4500,
    tth: '992837456',
    status: 'Доставлено',
  },
  {
    id: 10,
    item: 'ELEGANT SCARF',
    fullname: 'Максим Баранов',
    phone: '073123657',
    address: '28.7',
    amount: 600,
    tth: '445339221',
    status: 'Ожидание',
  },
  {
    id: 11,
    item: 'CLASSIC TIE',
    fullname: 'Вера Иванова',
    phone: '073452987',
    address: '30.2',
    amount: 500,
    tth: '879324101',
    status: 'Доставлено',
  },
  {
    id: 12,
    item: 'VINTAGE BAG',
    fullname: 'Николай Кузнецов',
    phone: '073893012',
    address: '31.5',
    amount: 1500,
    tth: '554329876',
    status: 'Отправлено',
  },
  {
    id: 13,
    item: 'LEATHER BELT',
    fullname: 'Галина Петрова',
    phone: '073301245',
    address: '33.1',
    amount: 400,
    tth: '998765432',
    status: 'Ожидание',
  },
  {
    id: 14,
    item: 'SILK TIE',
    fullname: 'Юрий Орлов',
    phone: '073210938',
    address: '32.3',
    amount: 350,
    tth: '556483902',
    status: 'Доставлено',
  },
  {
    id: 15,
    item: 'SUMMER SANDALS',
    fullname: 'Екатерина Белова',
    phone: '073782049',
    address: '34.7',
    amount: 900,
    tth: '332948576',
    status: 'Отправлено',
  },
  {
    id: 16,
    item: 'JEANS CLASSIC',
    fullname: 'Роман Ковалев',
    phone: '073192837',
    address: '36.4',
    amount: 1800,
    tth: '445302389',
    status: 'Доставлено',
  },
  {
    id: 17,
    item: 'WINTER COAT',
    fullname: 'Наталья Рябцева',
    phone: '073123678',
    address: '38.6',
    amount: 3800,
    tth: '923410987',
    status: 'Ожидание',
  },
  {
    id: 18,
    item: 'WOOLEN SWEATER',
    fullname: 'Андрей Ефимов',
    phone: '073678903',
    address: '40.3',
    amount: 1200,
    tth: '556789324',
    status: 'Отправлено',
  },
  {
    id: 19,
    item: 'AUTUMN JACKET',
    fullname: 'Людмила Карпова',
    phone: '073875490',
    address: '42.1',
    amount: 2500,
    tth: '778345290',
    status: 'Доставлено',
  },
  {
    id: 20,
    item: 'LEATHER SHOES',
    fullname: 'Владимир Соколов',
    phone: '073219847',
    address: '44.5',
    amount: 2900,
    tth: '665324781',
    status: 'Ожидание',
  },
  {
    id: 21,
    item: 'LIGHTWEIGHT JACKET',
    fullname: 'Дарья Макарова',
    phone: '073439876',
    address: '46.7',
    amount: 1600,
    tth: '992345870',
    status: 'Отправлено',
  },
  {
    id: 22,
    item: 'FASHION SHOES',
    fullname: 'Михаил Данилов',
    phone: '073123780',
    address: '48.2',
    amount: 2400,
    tth: '883902312',
    status: 'Доставлено',
  },
  {
    id: 23,
    item: 'SUN HAT',
    fullname: 'Татьяна Жукова',
    phone: '073999234',
    address: '50.1',
    amount: 500,
    tth: '556218490',
    status: 'Ожидание',
  },
  {
    id: 24,
    item: 'TRENCH COAT',
    fullname: 'Константин Власов',
    phone: '073348902',
    address: '52.4',
    amount: 4000,
    tth: '992817345',
    status: 'Отправлено',
  },
  {
    id: 25,
    item: 'HOODED SWEATSHIRT',
    fullname: 'Евгений Соловьев',
    phone: '073501238',
    address: '54.9',
    amount: 1200,
    tth: '445331987',
    status: 'Доставлено',
  },
  {
    id: 26,
    item: 'RAINCOAT',
    fullname: 'Оксана Смирнова',
    phone: '073982134',
    address: '56.7',
    amount: 2800,
    tth: '669210482',
    status: 'Ожидание',
  },
  {
    id: 27,
    item: 'COZY GLOVES',
    fullname: 'Валентин Чернов',
    phone: '073134589',
    address: '58.2',
    amount: 450,
    tth: '771294083',
    status: 'Доставлено',
  },
  {
    id: 28,
    item: 'AUTUMN SHOES',
    fullname: 'Полина Осипова',
    phone: '073198347',
    address: '60.4',
    amount: 1900,
    tth: '445678921',
    status: 'Отправлено',
  },
  {
    id: 29,
    item: 'CASUAL SHIRT',
    fullname: 'Сергей Морозов',
    phone: '073245981',
    address: '62.5',
    amount: 700,
    tth: '554291830',
    status: 'Ожидание',
  },
  {
    id: 30,
    item: 'DENIM JACKET',
    fullname: 'Марина Голубева',
    phone: '073784901',
    address: '64.9',
    amount: 2400,
    tth: '992345192',
    status: 'Доставлено',
  },
  {
    id: 31,
    item: 'SPORT CAP',
    fullname: 'Лев Орлов',
    phone: '073129387',
    address: '66.2',
    amount: 300,
    tth: '883210984',
    status: 'Ожидание',
  },
  {
    id: 32,
    item: 'WINTER GLOVES',
    fullname: 'Елена Фомина',
    phone: '073983215',
    address: '68.3',
    amount: 500,
    tth: '556312897',
    status: 'Отправлено',
  },
  {
    id: 33,
    item: 'SUMMER DRESS',
    fullname: 'Геннадий Павлов',
    phone: '073301928',
    address: '70.5',
    amount: 1800,
    tth: '778210394',
    status: 'Доставлено',
  },
  {
    id: 34,
    item: 'RAIN BOOTS',
    fullname: 'Инна Васильева',
    phone: '073874509',
    address: '72.7',
    amount: 1500,
    tth: '556432109',
    status: 'Ожидание',
  },
  {
    id: 35,
    item: 'WARM SOCKS',
    fullname: 'Виктор Никитин',
    phone: '073293847',
    address: '74.2',
    amount: 200,
    tth: '667298341',
    status: 'Доставлено',
  },
];
