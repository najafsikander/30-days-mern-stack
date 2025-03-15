import { useEffect } from "react";
import  NProgress  from "nprogress";
import 'nprogress/nprogress.css';
import { useNavigationType, useLocation } from "react-router";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";

//Customizing NProgress
NProgress.configure({
    showSpinner: false,
    minimum: 0.1,
    easing: 'ease',
    speed: 500
});

const LoadingBar = ():null => {
    const navigationType = useNavigationType();
    const location = useLocation();
    const isFetching = useIsFetching();
    const isMutating = useIsMutating();

    //Handle navigation loading
    useEffect(() => {
        NProgress.start();

        return () => {
            NProgress.done();
        }
    },[navigationType, location.pathname]);

    useEffect(() => {
        if(isFetching || isMutating) {
            NProgress.start();
        } else {
            NProgress.done();
        }
    },[isFetching,isMutating]);

    //This loading component doesnt render anything
    return null;
}

export default LoadingBar;
