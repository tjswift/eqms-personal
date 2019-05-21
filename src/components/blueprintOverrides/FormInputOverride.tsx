import * as React from 'react';
import { InputGroup, TextArea, Intent, Text, Colors, Switch, Icon, Button } from '@blueprintjs/core';
import { MultiSelect, ItemRenderer, Select } from '@blueprintjs/select';

/**
 * blueprintjs's default onChange function only tracks the form's value, 
 * this wrapper function adds an id property to that so that we don't have to use individual state variables for each and every form
 * any specific business logic should be defined in the parent component and passed through props
 * each form handler function bundles the changed value and the form id into a tuple and passes it back to the parent through a prop
 * TODO: in order to make these cleaner and more generic, we should probably add something like an 'inputprops: {}' property to store any extra blueprintjs default properties
 **/


/**
 * properties for text-based inputs (inputgroup, textarea)
@property id                : id of the form
@property handleValuechange : function to handle a change in value
@property intent            : blueprintjs intent (color) of form
*/
interface TextInputProps {
    id: string
    handleValueChange: Function
    intent: Intent
}

/**
 *props for switch forms
 * @property id                     : id of the form
 * @property isChecked              : (value) is the form checked or unchecked
 * @property handleCheckChange      : handles a change in input
 * @property label                  : label of the switched value
 **/
interface SwitchProps {
    id: string
    isChecked: boolean
    handleCheckChange: Function
    label: string
}


/**
 * properties for select forms
 * @property id                     : id of the form
 * @property selectList             : list of options (strings) to render in Select's list
 * @property itemRenderer           : tells <Select> how to render the list of options
 * @property handleItemSelect       : function to handle a change in selected item. 
 * @property buttonText             : text that should be rendered on the button
*/
interface SelectProps {
    id: string
    selectList: string[]
    itemRenderer: ItemRenderer<string>
    handleItemSelect: Function
    buttonText: string
}

/**
 * props for MultiSelect Forms
 * @property id                 : id of the form
 * @property currentItems       : (value) stores all items currently selected
 * @property selectList         : list of options (strings) to render in MultiSelect's list
 * @property itemRenderer       : tells <MultiSelect> how to render the list of options
 * @property tagRenderer        : tells <MultiSelect> how to render each selected option (tag)
 * @property handleItemSelect   : handles a change in selected items
 * @property handleTagRemove    : handles request to remove a tag
**/
interface MultiSelectProps {
    id: string
    currentItems: string[]
    selectList: string[]
    itemRenderer: ItemRenderer<string>
    tagRenderer: any
    handleItemSelect: Function
    handleTagRemove: Function
}

/**
 * Props for required based label
 **/
interface labelProps {
    isRequired: boolean
    labelText: string
}


/**
 * adds id to <InputGroup>
 */
export class TextInput extends React.Component<TextInputProps>{

    constructor(props: TextInputProps) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
    }


    public render = () => {

        return (
            <InputGroup id={this.props.id} onChange={this.handleValueChange} intent={this.props.intent} onFocus={this.handleValueChange} />
        );
    }

    
    private handleValueChange = (event: React.ChangeEvent<any>) => {
        if (typeof this.props.handleValueChange === 'function') {

            let input: [string, string] = [event.target.value, this.props.id]
            
            this.props.handleValueChange(input);
        }
    }

}

/**
 * adds id to <TextArea>
**/
export class TextAreaInput extends React.Component<TextInputProps> {
    constructor(props: TextInputProps) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
    }

    public render = () => {

        return (
            <TextArea id={this.props.id} onChange={this.handleValueChange} intent={this.props.intent} onFocus={this.handleValueChange}/>
        );
    }

    private handleValueChange = (event: React.ChangeEvent<any>) => {
        if (typeof this.props.handleValueChange === 'function') {
            

            let input: [string, string] = [event.target.value, this.props.id]

            this.props.handleValueChange(input);
        }
    }
}

/**
 * adds id to <Switch>
 **/
export class SwitchInput extends React.Component<SwitchProps> {
    constructor(props: SwitchProps) {
        super(props);
        this.handleCheckChange = this.handleCheckChange.bind(this);
    }

    public render = () => {
        return (
            <Switch onChange={this.handleCheckChange} checked={this.props.isChecked} large={true} label={this.props.label} />
        );
    }


    private handleCheckChange = () => {
        if (typeof this.props.handleCheckChange === 'function') {
            let input: [boolean, string] = [!this.props.isChecked, this.props.id]

            this.props.handleCheckChange(input);
        }
    }
}


/**
 * adds id to <SelectInput>
 **/
export class SelectInput extends React.Component<SelectProps> {
    constructor(props: SelectProps) {
        super(props);
        this.handleItemSelect = this.handleItemSelect.bind(this);
    }

    public render = () => {
        return (
            <Select
                items={this.props.selectList}
                itemRenderer={this.props.itemRenderer}
                onItemSelect={this.handleItemSelect}
            >
                <Button text={this.props.buttonText} rightIcon="double-caret-vertical"/>
            </Select>
        );
    }

    private handleItemSelect = (item: string) => {
        if (typeof this.props.handleItemSelect === 'function') {
            let input: [string, string] = [item, this.props.id]
            console.log("override: " + input[0]);
            this.props.handleItemSelect(input);
        }
    }
}

/**
 * adds id to <MultiSelect>
 **/
export class MultiSelectInput extends React.Component<MultiSelectProps> {

    constructor(props: MultiSelectProps) {
        super(props);

        this.handleItemSelect = this.handleItemSelect.bind(this)
        this.handleTagRemove = this.handleTagRemove.bind(this)
    }



    public render = () => {
        return (
            <MultiSelect
                itemRenderer={this.props.itemRenderer}
                tagRenderer={this.props.tagRenderer}
                tagInputProps={{ onRemove: this.handleTagRemove }}
                items={this.props.selectList}
                onItemSelect={this.handleItemSelect}
                selectedItems={this.props.currentItems}

            />
        );
    }

    private handleItemSelect = (item: string) => {
        if (typeof this.props.handleItemSelect === 'function') {
            let input: [string, string] = [item, this.props.id]
            this.props.handleItemSelect(input);
        }
    }

    private handleTagRemove = (item: string) => {
        console.log("in override");
        if (typeof this.props.handleItemSelect === 'function') {
            let input: [string, string] = [item, this.props.id]
            console.log("input: " + input[0] + ", " + input[1]);
            this.props.handleTagRemove(input);
        }
    }
}



/**
 * a modified label for inputs, denotes a required input with a red *
 **/
export const InputLabel: React.SFC<labelProps> = ({ isRequired, labelText }) => (
    <Text> {labelText} {isRequired && <span style={requiredStyle}>*</span> } </Text>   
);

const requiredStyle: React.CSSProperties = {
    color: "red",
    fontWeight: "bold"
}