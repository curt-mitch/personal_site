interface IMenuItem {
  label: string;
  key: number;
  pathname: string;
  display?: string;
  external?: boolean;
}

const Menu: IMenuItem[] = [
  {
    label: 'Home',
    pathname: '/',
    key: 0,
  },
  {
    label: 'Posts',
    pathname: '/posts',
    key: 1,
  },
  {
    label: 'About',
    pathname: '/about',
    key: 2,
  },
  {
    label: 'post',
    pathname: '/post',
    display: 'none',
    key: 3,
  },
];

export default Menu;
