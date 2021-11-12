import type { NextPage } from 'next'
import {Container, Skeleton} from "@mui/material";

const Home: NextPage = () => {
  return (
    <Container>
        <Skeleton variant="rectangular" width={210} height={118} />
    </Container>
  );
}

export default Home
