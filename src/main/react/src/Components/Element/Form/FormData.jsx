import React from "react";

const FormDataContext = React.createContext();

export function withFormData(Component) {
    return function FormDataComponent(props) {
        return (
            <FormDataContext.Consumer>
                {entityProps => {
                    const onChange = props.onChange || entityProps.onChange;
                    return (
                        <Component
                            {...props}
                            onChange={value => onChange(value, props.name)}
                        />
                    );
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
                {this.props.children}
            </FormDataContext.Provider>
        );
    }
}