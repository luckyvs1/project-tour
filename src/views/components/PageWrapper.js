import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';

const PageWrapper = (props) => {
    return (
        <Box paddingX={10} pb={1}>
            <Card>
                <CardContent>
                    {props.children}
                </CardContent>
            </Card>
        </Box>
    );
}

export default PageWrapper;