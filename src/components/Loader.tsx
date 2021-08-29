import { CircularProgress, makeStyles, Theme } from "@material-ui/core";

type LoaderProps = {
    dataLoading: boolean
}

const useStyles = makeStyles((theme: Theme) => ({
    modal: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        opacity: 0.8,
        left: 0,
        zIndex: 9999,
        top: 0
    },
    loader: {
        position: 'absolute',
        top: 'calc(50% - 20px)',
        left: 'calc(50% - 20px)',
        width: 40,
        height: 40
    }
}));

const Loader = (props: LoaderProps) => {
    let classes = useStyles();

    return (<>
        {
            props.dataLoading ? <div className={classes.modal}><CircularProgress className={classes.loader} /></div>: ''
        }
        </>
    )
}

export default Loader;