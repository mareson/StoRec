import type { NextPage } from 'next';
import React, {useState} from "react";
import Head from 'next/head';
import Layout from "../components/Layout";
import Header from "../components/Header";
import {Fab, styled} from "@mui/material";
import {Add} from "@mui/icons-material";
import ReceiptDialog from "../components/ReceiptDialog";
import {useDialog} from "../components/Dialog";
import SearchForm from "../components/forms/SearchForm";
import ReceiptsList, {useReceiptsList, ReceiptsListContext} from "../components/ReceiptsList";
import {ListResponse, ReceiptResponse} from "../props/apiResponses";
import {getReceiptsRequest} from "../services/receiptRequest";
import {AxiosResponse} from "axios";
import { LIST_DEFAULT_SIZE } from '../props/params';

const Home: NextPage<{receipts: ReceiptResponse[]}> = ({receipts}) => {
    const receiptsList = useReceiptsList(receipts);
    const addDialogProps = useDialog();

    return (
        <ReceiptsListContext.Provider value={receiptsList}>
            <Layout>
                <Head>
                    <title>StoRec – účtenky jsou moje starost</title>
                </Head>
                <Header />
                <SearchForm />
                <ReceiptsList />
                <ReceiptDialog dialogBasicProps={addDialogProps} />
                <StyledFab color="primary" onClick={addDialogProps.handleOpen}>
                    <Add />
                </StyledFab>
            </Layout>
        </ReceiptsListContext.Provider>
);
}

const StyledFab = styled(Fab)(({theme}) => ({
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
}));

export async function getServerSideProps() {
    const receipts: AxiosResponse<ListResponse<ReceiptResponse>> = await getReceiptsRequest({});
    return {
        props: {
            receipts: receipts.data.data
        }
    }
}

export default Home;
