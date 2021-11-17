import type { NextPage } from 'next';
import React from "react";
import Head from 'next/head';
import Layout from "../components/Layout";
import Header from "../components/Header";
import {Fab, SpeedDial, SpeedDialAction, SpeedDialIcon, styled} from "@mui/material";
import {Photo, PhotoCamera, Add} from "@mui/icons-material";
import ReceiptDialog from "../components/ReceiptDialog";
import {Dialog, useDialog} from "../components/Dialog";
import SearchForm from "../components/forms/SearchForm";

const Home: NextPage = () => {

    const addDialogProps = useDialog();

    return (
    <Layout>
        <Head>
            <title>StoRec – účtenky jsou moje starost</title>
        </Head>
        <Header />
        <SearchForm />
        <ReceiptDialog dialogBasicProps={addDialogProps} />
        <StyledFab color="primary" onClick={addDialogProps.handleOpen}>
            <Add />
        </StyledFab>
    </Layout>
);
}

export default Home;

const StyledFab = styled(Fab)(({theme}) => ({
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
}));
