import React from "react";

const FormDataContext = React.createContext();

export function withFormData(Component) {
    return function FormDataComponent(props) {
        return (
            <FormDataContext.Consumer>
                {entityProps => {
                    if (entityProps) {
                        const onChange = props.onChange || entityProps.onChange;
                        return (
                            <Component
                                {...props}
                                onChange={value => onChange(props.name, value)}
                            />
                        );
                    }
                    return <Component
                        {...props}
                    />

                }}
            </FormDataContext.Consumer>
        );
    };
}

export default class FormData extends React.PureComponent {
    render() {
        return (
            <FormDataContext.Provider value={{
                onChange: this.props.onChange
            }}>
                <form onSubmit={this.props.onSubmit && this.props.onSubmit}>
                    {this.props.children}
                </form>
            </FormDataContext.Provider>
        );
    }
}