import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import MenuIcon from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import Menu from './Menu';
import styles from './top-bar.module.scss';


export default function Topbar() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const router = useRouter();
  const state = {
    value: 0,
    menuDrawer: false
  };

  const handleChange = (_event: React.SyntheticEvent, value: number) => {
    state.value = value;
  };

  const mobileMenuOpen = (_event: React.MouseEvent<HTMLButtonElement>) => {
    state.menuDrawer = true;
  };

  const mobileMenuClose = (_event: React.MouseEvent<HTMLButtonElement>) => {
    state.menuDrawer = false;
  };

  const current = () => {
    if (router.pathname === "/home") {
      return 0;
    }
    if (router.pathname === "/posts") {
      return 1;
    }
    if (router.pathname === "/about") {
      return 2;
    }
    if (router.pathname.includes("/post/")) {
      return 3;
    }
  };

  return (
    <AppBar color="default" className={styles.appBar} style={{boxShadow: 'none'}}>
      <Toolbar>
        <Grid container spacing={10} alignItems="baseline">
          <Grid item xs={12} className={styles.flex}>
            <div className={styles.inline}>
              <Typography variant="h6" color="inherit" noWrap>
                <Link
                  href="/"
                  className={styles.link}
                  passHref
                  >
                  <span className={styles.tagline}>Curtis Mitchell</span>
                </Link>
              </Typography>
            </div>
            {(
              <React.Fragment>
                <div className={styles.iconContainer}>
                  <IconButton
                    onClickCapture={mobileMenuOpen}
                    className={styles.iconButton}
                    color="inherit"
                    aria-label="Menu"
                  >
                    <MenuIcon open={false} />
                  </IconButton>
                </div>
                <div className={styles.tabContainer}>
                  <SwipeableDrawer
                    className={styles.mobileSideMenu}
                    anchor="right"
                    open={state.menuDrawer}
                    onClose={mobileMenuClose}
                    onOpen={mobileMenuOpen}
                  >
                    <AppBar title="Menu" />
                    <List>
                      {Menu.map((item, _index) => (
                        <ListItemButton
                          component={Link}
                          href={item.pathname}
                          style={{ display: item.display }}
                          key={item.label}
                        >
                          <ListItemText primary={item.label} />
                        </ListItemButton>
                      ))}
                    </List>
                  </SwipeableDrawer>
                  <Tabs
                    value={current() || state.value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                  >
                    {Menu.map((item, _index) => (
                      <Tab
                        key={item.label}
                        href={item.pathname}
                        classes={{ root: styles.tabItem }}
                        label={item.label}
                        style={{ display: item.display }}
                      />
                    ))}
                  </Tabs>
                </div>
              </React.Fragment>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
