import React from 'react';
import { Spin } from 'antd';

interface WithLoadingProps {
    isLoading: boolean;
}

const withLoading = <P extends object>(Component: React.ComponentType<P>) =>
    class WithLoading extends React.Component<P & WithLoadingProps> {
        render() {
            const { isLoading, ...props } = this.props;
            return (
                <React.Fragment>
                    {
                        isLoading &&
                        <Spin>
                            <Component {...props as P} />
                        </Spin>
                    }
                    {
                        !isLoading &&
                        <Component {...props as P} />
                    }
                </React.Fragment>
            )
        }
    };

export default withLoading;