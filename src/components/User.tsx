import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Theme} from "@material-ui/core";
import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { USER_LIST_URL } from "../constants";
import Loader from "./Loader";


interface InitialProp {
    isLoggedIn: boolean,
    setIsLoggedIn?: Dispatch<SetStateAction<boolean>>
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
      width: '100%',
      maxWidth: '100%',
      backgroundColor: theme.palette.background.paper,
      margin: '5px 10px',
      height: 'calc(100vh - 180px)',
      maxHeight: 'calc(100vh - 180px)',
      overflowY: 'scroll',
      borderRadius: '5px',
      '&::-webkit-scrollbar': {
        width: '0.4em'
      },
      '&::-webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.1)',
        outline: '1px solid slategrey'
      }
    },
    inline: {
      display: 'inline',
    },
  }));

type USER = {
    name: {
        first: string,
        last: string,
    },
    picture: {
        thumbnail: string
    };
}

const Users = (props: InitialProp) => {
    const classes = useStyles();

    let [dataLoading, setDataLoading] = useState(false);
    let [pageNum, setPageNum] = useState(1);
    
    let [userList, setUserList] = useState<USER[]>([]);

    const checkForMoreLoad = (event: any) => {
        if (event.target.offsetHeight + event.target.scrollTop === event.target.scrollHeight) {
            loadMoreData()
        }
    };

    const loadMoreData = () => {
        setDataLoading(true);

        let oneSecDelay = new Promise((res, rej) => {
            setTimeout(() => {
                res(true);
            }, 1000);
        });

        Promise.all([axios(USER_LIST_URL, { params : {
            page: pageNum,
            incl: 'name,picture'
        }}), oneSecDelay]).then((res) => {
            let data = res[0];
            setUserList([...userList, ...data.data.results]);
            setPageNum(++pageNum);
        }).finally(() => {
            setDataLoading(false);
        })
    };

    useEffect(() => {
        window.history.replaceState(null, '', '/home');
    }, []);

    useEffect(() => {
        if (!userList.length) {
            loadMoreData();
        }
    }, []);

    return (
        <Box m={1}>
            <Loader dataLoading={dataLoading}></Loader>
            <List className={classes.root} onScroll={checkForMoreLoad} >
                {
                    userList.map((user) => {
                        return (<>
                            <ListItem>
                                <ListItemText
                                primary={`${user.name.first} ${user.name.last}`}
                                />
                                <ListItemAvatar>
                                    <Avatar alt={`${user.name.first} ${user.name.last}`} src={user.picture.thumbnail} />
                                </ListItemAvatar>
                            </ListItem>
                            <Divider />
                        </>)
                    })
                }
            </List>
        </Box>
    )
}

export default Users;