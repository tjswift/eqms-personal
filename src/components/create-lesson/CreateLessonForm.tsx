import * as React from 'react';
import { Button, Dialog, Alert, FormGroup, Intent, Colors, MenuItem, Tag } from '@blueprintjs/core';
import { TextInput, TextAreaInput, InputLabel, SwitchInput, MultiSelectInput, SelectInput } from '../blueprintOverrides/FormInputOverride';
import styled from 'react-emotion';
import { LessonInputLabels, InputInfo, processList, locationList } from '../../store/lessons/types'
import { ItemRenderer } from '@blueprintjs/select';

/**
 * This component handles the forms used in CreateLessonComponent
 * in the future it might be split up into multiple tabs
 * Form components and value getters are defined here, but business logic and form validations are done in CreateLessonComponent with the functions passed through props
 * To add to or change a form:
    * see if you need to define a wrapper for the input type in /blueprintOverrides/FormInputOverrides. Adding these custom wrapper components will allow you to pass the id of an input in addition to the input's value
    * add the label id to LessonInputLabels in store/lessons/types
        * be sure to always reference the id using LessonInputLabels instead of hardcoding it's name 
    * add the component to the <TabWrapper> element, if it needs to handle a new type of value change add the handler function to FormProps. You may need to add a new getter function to grab the input's data from userInputDict.
    * set the element in /CreateLessonComponents handleDialogOpenClose method
    * define the handler's logic in CreateLessonComponent. Likely this will involve checking for error and then changing the userInputDict state
        * if the handler is dealing with a value change that's already defined, a check can be added to the existing handler. eg: CreateLessonComponent.handleTextInputChange will handle changes for the title, description, suggestion, etc forms.
    * if needed, don't forget to add the new type to store/lessons/types/InputInfo.value's type options. 
 * TODO: would it be more performative to make this and FormInputOverride an SFC since they don't manage state?
 * TODO: consider reworking this structure in a way that's simpler to add new inputs
 **/

/**
 * Props passed from CreateLessonComponent
 * @property userInputDict              : a Map to store information on each form
 * @property handleTextChange           : handles a change in a text-based form
 * @property handleSwitchChange         : handles a change in a switch form
 * @property handleMultiItemSelect      : handles a change in a multi-item select form
 * @property handleItemSelect           : handles a change in an item select form
 * @property handleTagRemove            : handles a tag being removed from a form
 **/
interface FormProps {
    userInputDict: Map<string, InputInfo>,
    handleTextChange: Function,
    handleSwitchChange: Function
    handleMultiItemSelect: Function
    handleItemSelect: Function
    handleTagRemove: Function
}

interface FormState {

}

export class CreateLessonForm extends React.Component<FormProps, FormState>  {
    state: FormState;

    constructor(props: FormProps) {
        super(props);
        this.state = {

        };
        this.getFormIntent = this.getFormIntent.bind(this);
        this.getErrorMsg = this.getErrorMsg.bind(this);
        this.getSwitchValue = this.getSwitchValue.bind(this);
        this.getImpactLabel = this.getImpactLabel.bind(this);
        this.getSelectButtonText = this.getSelectButtonText.bind(this);
        this.getValueArray = this.getValueArray.bind(this);

        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSwitchChange = this.handleSwitchChange.bind(this);
        this.handleItemSelect = this.handleItemSelect.bind(this);
        this.handleMultiItemSelect = this.handleMultiItemSelect.bind(this);
        this.handleTagRemove = this.handleTagRemove.bind(this);

        this.renderItem = this.renderItem.bind(this);

    }

    private handleTextChange(value: [string, string]) {
        this.props.handleTextChange(value);
    }

    private handleSwitchChange(value: [boolean, string]) {
        this.props.handleSwitchChange(value);
    }

    private handleItemSelect(value: [string, string]) {
        this.props.handleItemSelect(value);
    }

    private handleMultiItemSelect(value: [string, string]) {
        this.props.handleMultiItemSelect(value);
    }

    private handleTagRemove(value: [string, string]) {
        this.props.handleTagRemove(value);
    }

    private getFormIntent(id: string) {

        if (typeof this.props.userInputDict.get(id) === 'undefined') {
            return "none" as Intent
        }
        else {
            return this.props.userInputDict.get(id)!.intent as Intent;
        }

    }

    private getErrorMsg(id: string) {
        if (typeof this.props.userInputDict.get(id) === 'undefined') {
            throw new Error("undefined hash: " + id);
        }
        else {
            return this.props.userInputDict.get(id)!.errorMsg;
        }
    }

    private getSwitchValue(id: string) {
        if (typeof this.props.userInputDict.get(id) === 'undefined') {
            throw new Error("undefined hash: " + id);
        }
        else {
            return this.props.userInputDict.get(id)!.value as boolean
        }
    }

    private getImpactLabel () {
        if (typeof this.props.userInputDict.get(LessonInputLabels.impactType) === 'undefined') {
            throw new Error("undefined hash: " + LessonInputLabels.impactType);
        }
        else {
            return ((this.props.userInputDict.get(LessonInputLabels.impactType)!.value) ? "positive" : "negative");
        }
    }

    private getSelectButtonText(id: string) {
        if (typeof this.props.userInputDict.get(id) === 'undefined') {
            throw new Error("undefined hash: " + id);
        }
        else {
            return this.props.userInputDict.get(id)!.value as string
        }
    }

    private getValueArray(id: string) {
        
        if (typeof this.props.userInputDict.get(id) === 'undefined') {
            throw new Error("undefined hash: " + id);
        }
        else {
            return this.props.userInputDict.get(id)!.value as string[]
        }
    }

    private renderItem: ItemRenderer<string> = (item, { modifiers, handleClick }) => {
        if (!modifiers.matchesPredicate) {
            return null;
        }
        return (
            <MenuItem
                active={modifiers.active}
                onClick={handleClick}
                text={item}
                shouldDismissPopover={false}
            />
        );
    };

    private renderTag: React.ReactNode  = (item: String) => item as React.ReactNode;
    

    render() {

        return (
            <React.Fragment>
                <TabWrapper>
                    <h2>Define</h2>
                    <FormGroup
                        helperText="A brief, one-line, descriptive statement summarizing the lesson learned. This field is not expected to be a complete sentence."
                        label={<InputLabel labelText="Lesson Title" isRequired={true} />}
                        labelFor={LessonInputLabels.title}
                        labelInfo={this.getErrorMsg(LessonInputLabels.title)}
                    >
                        <TextInput id={LessonInputLabels.title} handleValueChange={this.handleTextChange} intent={this.getFormIntent(LessonInputLabels.title)} />
                    </FormGroup>

                    <FormGroup
                        helperText="A (desirably) lengthy description of the Lesson Learned, the experiences and observations related to it, and any other pertinent information needed to describe what happened."
                        label={<InputLabel labelText="Lesson Description" isRequired={true} />}
                        labelFor={LessonInputLabels.experience}
                        labelInfo={this.getErrorMsg(LessonInputLabels.experience)}
                    >
                        <TextAreaInput id={LessonInputLabels.experience} handleValueChange={this.handleTextChange} intent={this.getFormIntent(LessonInputLabels.experience)} />
                    </FormGroup>

                    <FormGroup
                        helperText="A description of the immediate impact of the situation that lead to the creation of the Lesson Learned."
                        label={<InputLabel labelText="Situation Impact" isRequired={true} />}
                        labelFor={LessonInputLabels.impact}
                        labelInfo={this.getErrorMsg(LessonInputLabels.impact)}
                    >
                        <TextAreaInput id={LessonInputLabels.impact} handleValueChange={this.handleTextChange} intent={this.getFormIntent(LessonInputLabels.impact)} />
                    </FormGroup>

                    <FormGroup
                        helperText="Was the impact positive or negative"
                        label={<InputLabel labelText="Impact Type" isRequired={true} />}
                        labelFor={LessonInputLabels.impactType}
                        labelInfo={this.getErrorMsg(LessonInputLabels.impactType)}
                    >
                        <SwitchInput id={LessonInputLabels.impactType} isChecked={(this.getSwitchValue(LessonInputLabels.impactType) as boolean)} handleCheckChange={this.handleSwitchChange} label={this.getImpactLabel()} />
                    </FormGroup>

                    <FormGroup
                        helperText="Suggested lesson learned"
                        label={<InputLabel labelText="Suggestions" isRequired={false} />}
                        labelFor={LessonInputLabels.suggestion}
                        labelInfo={this.getErrorMsg(LessonInputLabels.suggestion)}
                    >
                        <TextAreaInput id={LessonInputLabels.suggestion} handleValueChange={this.handleTextChange} intent={this.getFormIntent(LessonInputLabels.suggestion)} />
                    </FormGroup>

                    <FormGroup
                        labelFor={LessonInputLabels.processes}
                        label={<InputLabel labelText="Processes Effected" isRequired={true} />}
                        labelInfo={this.getErrorMsg(LessonInputLabels.processes)}
                    >
                        <MultiSelectInput
                            id={LessonInputLabels.processes}
                            currentItems={this.getValueArray(LessonInputLabels.processes)}
                            itemRenderer={this.renderItem} selectList={processList}
                            tagRenderer={this.renderTag}
                            handleItemSelect={this.handleMultiItemSelect} handleTagRemove={this.handleTagRemove} />
                    </FormGroup>

                    <FormGroup
                        labelFor={LessonInputLabels.location}
                        label={<InputLabel labelText="Where did the event occur" isRequired={true} />}
                        labelInfo={this.getErrorMsg(LessonInputLabels.location)}
                    >
                        <SelectInput
                            id={LessonInputLabels.location}
                            buttonText={this.getSelectButtonText(LessonInputLabels.location)}
                            handleItemSelect={this.handleItemSelect}
                            itemRenderer={this.renderItem} selectList={locationList}
                            />
                    </FormGroup>
                </TabWrapper>
            </React.Fragment>
        );
        
    }

}



const TabWrapper = styled('div')`
  margin: 0 auto;
  padding: 0% 10%;
  max-height:500px;
  overflow:auto;
`;

