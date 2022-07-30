interface IMenuItem {
  label: string;
  pathname: string;
  display?: string;
  external?: boolean;
}

const Menu: IMenuItem[] = [
  {
    label: 'Home',
    pathname: '/'
  },
  {
    label: 'Posts',
    pathname: '/posts'
  },
  {
    label: 'About',
    pathname: '/about'
  },
  {
    label: 'post',
    pathname: '/post',
    display: 'none'
  },
];

export default Menu;
