import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import UrlRecordService from '../services/urlRecordService';

interface MatchParams {
    shortcut: string;
}

interface ShortcutRedirectComponentProps extends RouteComponentProps<MatchParams> {
}

class ShortcutRedirectComponent extends React.Component<ShortcutRedirectComponentProps>{
    componentDidMount() {
        UrlRecordService.useShortCut(this.props.match.params.shortcut)
            .then(response => {
                window.location.href = response.data;
            })
            .catch(error => {
                this.props.history.push(`/`);
            });
    }

    render() {
        return (
            <h1>Redirecting...</h1>
        )
    }
}

export default withRouter<ShortcutRedirectComponentProps, any>(ShortcutRedirectComponent);