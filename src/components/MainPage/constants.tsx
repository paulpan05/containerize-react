import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const drawerWidth = 260;

export const mainPageStyles = makeStyles((theme: Theme) =>
  createStyles({
    loadingGrid: {
      minHeight: '100vh',
      verticalAlign: 'middle'
    },
    loadProgress: {
      margin: theme.spacing(3)
    },
    mainDiv: {
      display: 'flex'
    },
    appBar: {
      marginLeft: drawerWidth,
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`
      }
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none'
      }
    },
    toolbar: theme.mixins.toolbar,
    drawer : {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0
      }
    },
    grow: {
      flexGrow: 1
    },
    drawerPaper: {
      width: drawerWidth
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      [theme.breakpoints.up('xs')]: {
        width: `calc(100vw - 2 * ${theme.spacing(3)}px)`
      },
      [theme.breakpoints.up('sm')]: {
        width: `calc(100vw - ${drawerWidth}px - 2 * ${theme.spacing(3)}px)`
      }
    },
    drawerTop: {
      height: '1em',
      width: 'auto',
      paddingTop: '0.25em'
    },
    drawerTopContent: {
      verticalAlign: 'middle'
    }
  })
);