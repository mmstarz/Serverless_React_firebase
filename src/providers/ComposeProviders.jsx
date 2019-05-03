import React, {Fragment} from 'react';
import UserProvider from './UserProvider';
import PostsProvider from './PostsProvider';

const ComposeProviders = () => {
    return (
        <Fragment>
            <UserProvider></UserProvider>
            <PostsProvider></PostsProvider>
        </Fragment>
    )
}

export default ComposeProviders;