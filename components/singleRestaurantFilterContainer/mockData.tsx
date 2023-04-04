import foodPic from '../assets/extra-images/cover-photo07-1-1-359x212.jpg';
export const mockData = [
  {
    id: 1,
    foodName: 'Beef sandwich',
    rank: '4.2',
    time: '30',
    price: '15.000',
    img: foodPic,
    count: 0,
  },
  {
    id: 2,
    foodName: 'Salmon & Leek Dumplingsq',
    rank: '4.2',
    time: '15',
    price: '15.000',
    img: foodPic,
    count: 0,
  },
  {
    id: 3,
    foodName: 'Salmon & Leek Dumplingsw',
    rank: '4.2',
    time: '15',
    price: '15.000',
    img: foodPic,
    count: 0,
  },
  {
    id: 4,
    foodName: 'Beef sandwiches',
    rank: '4.2',
    time: '30',
    price: '15.000',
    img: foodPic,
    count: 0,
  },
  {
    id: 5,
    foodName: 'Salmon & Leek Dumplingsr',
    rank: '4.2',
    time: '15',
    price: '15.000',
    img: foodPic,
    count: 0,
  },
  {
    id: 6,
    foodName: 'Salmon & Leek Dumplingsf',
    rank: '4.2',
    time: '15',
    price: '15.000',
    img: foodPic,
    count: 0,
  },
  {
    id: 7,
    foodName: 'Beef sandwichs',
    rank: '4.2',
    time: '30',
    price: '15.000',
    img: foodPic,
    count: 0,
  },
  {
    id: 8,
    foodName: 'Salmon & Leek Dumplingsj',
    rank: '4.2',
    time: '15',
    price: '15.000',
    img: foodPic,
    count: 0,
  },
  {
    id: 9,
    foodName: 'Salmon & Leek Dumplingsi',
    rank: '4.2',
    time: '15',
    price: '15.000',
    img: foodPic,
    count: 0,
  },
];

export interface typeData {
  id: number;
  foodName: string;
  rank: string;
  time: string;
  price: string;
  img: any;
  count: number;
}

interface PushData {
  id: number;
  foodName: string;
  rank: string;
  time: string;
  price: string;
  img: any;
  count: number;
}

export const demoData: Array<PushData> = [];
