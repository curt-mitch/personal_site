import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import Menu from './Menu';
import styles from './top-bar.module.scss';


export default function Topbar() {
  const [menuDrawerOpen, setMenuDrawer] = useState(false);

  const router = useRouter();

  const handleChange = (_event: React.SyntheticEvent, value: number) => {
    toggleMenuDrawer();
  };

  const toggleMenuDrawer = () => {
    setMenuDrawer(current => !current);
  }

  const current = () => {
    if (router.asPath === "/") {
      return 0;
    }
    if (router.asPath === "/posts") {
      return 1;
    }
    if (router.asPath === "/about") {
      return 2;
    }
    if (router.asPath.includes("/post/")) {
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
                    onClickCapture={toggleMenuDrawer}
                    className={styles.iconButton}
                    color="inherit"
                    aria-label="Menu"
                  >
                    <MenuIcon />
                  </IconButton>
                </div>
                <div className={styles.tabContainer}>
                  <SwipeableDrawer
                    className={styles.mobileSideMenu}
                    anchor="right"
                    open={menuDrawerOpen}
                    onClose={toggleMenuDrawer}
                    onOpen={toggleMenuDrawer}
                  >
                    <AppBar title="Menu" />
                    <List>
                      {Menu.map((item, _index) => (
                        <Link
                          href={item.pathname}
                          key={item.key}
                        >
                          <ListItemButton
                            style={{ display: item.display }}
                            key={item.label}
                          >
                            <ListItemText primary={item.label} />
                          </ListItemButton>
                        </Link>
                      ))}
                    </List>
                  </SwipeableDrawer>
                  <Tabs
                    value={current()}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                  >
                    {Menu.map((item, _index) => (
                      <Tab
                        key={item.label}
                        value={item.key}
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
