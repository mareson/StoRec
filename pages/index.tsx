import type { NextPage } from 'next';
import React from "react";
import Head from 'next/head';
import Layout from "../components/Layout";
import Header from "../components/Header";
import {SpeedDial, SpeedDialAction, SpeedDialIcon, styled} from "@mui/material";
import {Photo, PhotoCamera} from "@mui/icons-material";
import SearchField from "../components/SearchField";

const Home: NextPage = () => {
  return (
    <Layout>
        <Head>
            <title>StoRec – účtenky jsou moje starost</title>
        </Head>
        <Header />
        <SearchField />
        <StyledSpeedDial
            ariaLabel="SpeedDial"
            icon={<SpeedDialIcon />}
            direction={"up"}
        >
            <SpeedDialAction
                icon={<PhotoCamera />}
                tooltipTitle={"Pořídit fotku"}
            />
            <SpeedDialAction
                icon={<Photo />}
                tooltipTitle={"Nahrát fotku"}
            />
        </StyledSpeedDial>
    </Layout>
  );
}

export default Home;

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
    position: 'absolute',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
        top: theme.spacing(2),
        left: theme.spacing(2),
    },
}));
