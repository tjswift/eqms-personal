import * as React from 'react';
import { Button, Dialog, Alert } from '@blueprintjs/core';
import styled from 'react-emotion';
import { tempSagaDatabase } from '../../main' //temporarily used to generate a new id
import { Lesson, LessonsActionTypes, LessonInputLabels, InputInfo } from '../../store/lessons/types';
import { CreateLessonForm } from './CreateLessonForm';

/**
 * The CreateLessonComponent acts as the main component for CreateLesson Functionality
 * it is currently called from: pages/lessons/index
 * For error handling: I tried to put the criteria upfront (so required forms now start in the error state), 
    * it might be a good idea to think about reworking the ui a bit so that the form's helper text is always on and shows criteria that is checked off rather than errors
**/

/**
 * @property postLessonAction   : an Action passed from store/lessons that alerts a saga to post the new Lesson Learned
**/
interface CreateLessonProps {
    postLessonAction: (data: Lesson) => { type: LessonsActionTypes.POST_LESSON } 
}

/**
 * The state for CreateLessonComponent
 * @property dialogOpen             : should the dialog be open?
 * @property userInputDict          : a Map<input-id, input-info> containing information for each input in the form. 
 * @property errorDialogOpen        : should the error alert be open?
 * @property errorDialogMessage     : The message to display in the error alert.
 * @property errorCount             : used for string analysis when created errorDialogMessage. Should only be changed in allPropsValid() (unless being reset in constructor, handleDialogOpenClose, or handleErrorOpenClose)
 **/
interface CreateLessonState {
    dialogOpen: boolean,
    userInputDict: Map<string, InputInfo>,
    errorDialogOpen: boolean
    errorDialogMessage: string
    errorCount: number
}

/**
 * wrapper component for CreateLessonComponent
 * TODOS:
    * it might be a good idea to think about reworking how we display the error check so that all criteria are shown up front as criteria rather than errors, as the user completes the criteria it's checked off
 */
export class CreateLessonComponent extends React.Component<CreateLessonProps, CreateLessonState>  {
    state: CreateLessonState;


    constructor(props: CreateLessonProps) {
        super(props);
        this.state = {
            dialogOpen: false,
            userInputDict: new Map<string, InputInfo>(),
            errorDialogOpen: false,
            errorDialogMessage: "",
            errorCount: 0
        };
        this.handleDialogOpenClose = this.handleDialogOpenClose.bind(this);
        this.handleSubmitLesson = this.handleSubmitLesson.bind(this);

        this.handleTextInputChange = this.handleTextInputChange.bind(this);
        this.handleSwitchChange2 = this.handleSwitchChange2.bind(this);
        this.handleItemSelect = this.handleItemSelect.bind(this);
        this.handleMultiItemSelect = this.handleMultiItemSelect.bind(this);
        this.handleTagRemove = this.handleTagRemove.bind(this);
    }

    
    /**
     * Handles state changes regarding to the dialog opening and closing and resets userInputDict
     * @param prop boolean  : true if isDialogOpen should be opened 
  
     */
    private handleDialogOpenClose(prop: boolean) {
        console.log("changing dialog");

        this.setState(function (state, props) {

            let userDict = state.userInputDict;
            userDict.clear();
            //set initial inputs in userMap. This prevents errors in controlled and optional inputs (impactType, processes, suggestion, location), and sets required inputs as having an error (they are unfilled)
            //TODO: consider a cleaner way to do this
            userDict.set(LessonInputLabels.title, { //required
                value: "",
                isError: true,
                errorMsg: "Title cannot be empty",
                intent: "danger"
            });
            userDict.set(LessonInputLabels.experience, { //required
                value: "",
                isError: true,
                errorMsg: "Description cannot be empty",
                intent: "danger"
            });
            userDict.set(LessonInputLabels.impact, { //required
                value: "",
                isError: true,
                errorMsg: "Impact description cannot be empty",
                intent: "danger"
            });
            userDict.set(LessonInputLabels.impactType, { //required (but no error)
                value: true,
                isError: false
            });
            userDict.set(LessonInputLabels.processes, { //required
                value: [],
                isError: true,
                errorMsg: "don't forget the impacted processes"

            })
            userDict.set(LessonInputLabels.suggestion, { //optional
                value: "",
                intent: "none",
                isError: false
            })
            userDict.set(LessonInputLabels.location, { //required
                value: "Select a location",
                isError: true,
                errorMsg: "Don't forget the location"
            })


            return {
                dialogOpen: prop,
                userInputDict: userDict,
                errorDialogMessage: "",
                errorCount:0
            };
        });

    }

    /**
     * Generates an unused key for the new lesson based on lesson[] length
    **/
    private generateKey(): string {
        return "LL-" + (tempSagaDatabase.getSize() + 1);
    }

    /**
     * converts the input values into a Lesson object and dispatches it with the postLessonAction
     **/
    private handleSubmitLesson() {

        
        if (this.allPropsValid()) {
            let lessonData = {
                key: this.generateKey(),
                summary: this.state.userInputDict.get(LessonInputLabels.title)!.value as string,
                experience: this.state.userInputDict.get(LessonInputLabels.experience)!.value as string,
                created: (new Date).getTime(),
                location: this.state.userInputDict.get(LessonInputLabels.location)!.value as string,
                creator: "Jane Doe",
                recurrence: "",
                mitigation: "",
                mitigationCost: "",
                affectedProcess: this.state.userInputDict.get(LessonInputLabels.processes)!.value as string[],
                opportunityType: "",
                impact: this.state.userInputDict.get(LessonInputLabels.impact)!.value as string,
                impactPositive: this.state.userInputDict.get(LessonInputLabels.impactType)!.value as boolean,
                inactionImpact: "",
                actDecision: "",
                impactedProcess: [],
                originatorSuggestion: this.state.userInputDict.get(LessonInputLabels.suggestion)!.value as string,
                recommendation: "",
                actionsTaken: "",
                differenceMade: true
            }

            this.props.postLessonAction(lessonData);

            this.handleDialogOpenClose(false);

        }

        else {
            console.log("there was an error in the lesson forms");
            this.setState({ errorDialogOpen: true })
        }
    }

    /**
    * Ensures all forms are in userInputDict and their values are valid
    **/
    private allPropsValid = () => {

        let noErrors: boolean = true;


        for (let i in LessonInputLabels) { //double check that entries exist
            if (!this.state.userInputDict.has(LessonInputLabels[i])) {
                throw new Error("undefined userInputDict entry: " + i)
            }
            else {
                if (this.state.userInputDict.get(LessonInputLabels[i])!.isError) {
                    noErrors = false

                    this.setState(function (state, props) {
                        let errMsg = state.errorDialogMessage;
                        if (state.errorCount == 0) {
                            errMsg = "There was an error:\n";
                        }

                        //TODO: currently this is a bit dangerous because errorMsg might not be defined, consider making it mandatory and blank if no errors
                        errMsg += "\n" + state.userInputDict.get(LessonInputLabels[i])!.errorMsg;
                        let errNum = state.errorCount + 1

                        return {
                            errorDialogMessage: errMsg,
                            errorCount: errNum
                        }
                    });
                }
            }
        }
      
        return noErrors
    }

    /**
     * Sets the state for if the error alert should be open or closed
     * @param newState
     */
    private handleErrorOpenClose(newState: boolean) {
        this.setState({
            errorDialogOpen: newState,
            errorCount: 0,
            errorDialogMessage: ""
        });
    }

    /**
     * Handles value changes in text based input
     * @param value : value[0] is the input's value, value[1] is the input's id
     */
    private handleTextInputChange(value: [string, string]) {


        this.setState(function (state, props) {

            let userDict = state.userInputDict;

            if (value[1] === LessonInputLabels.title) {
                //TODO: consider reworking this so that value checks can be stacked (make erroMsg a list of messages)
                emptyCheck(value[0], "title", "Title cannot be empty", userDict); 
            }

            if (value[1] === LessonInputLabels.experience) {
                emptyCheck(value[0], "experience", "Description cannot be empty", userDict)
                
            }

            if (value[1] === LessonInputLabels.impact) {
                emptyCheck(value[0], "impact", "Impact Description cannot be empty", userDict)
            }

            if (value[1] === LessonInputLabels.suggestion) {

                //suggestions are optional, no validations
                userDict.set(LessonInputLabels.suggestion, {
                    value: value[0] as string,
                    intent: "success",
                    isError: false,
                });
            }

            return {
                userInputDict: userDict
            };
        });
        
    }

    /**
     * handles a value change for a <Switch>
     * @param value: [0] is value, [1] is id
     */
    private handleSwitchChange2(value: [boolean, string]) {
        this.setState(function (state, props) {
            let userDict = state.userInputDict;

            console.log("hrm: " + value[0]);

            if (value[1] === LessonInputLabels.impactType) {
                userDict.set(LessonInputLabels.impactType, {
                    value: value[0],
                    intent: "none",
                    isError: false,
                });
            }

            return {
                userInputDict: userDict
            };
        });
    }

    /**
     * handles the change in a <Select>
     * @param value: [0] is value [1] is id
     */
    private handleItemSelect(value: [string, string]) {
        this.setState(function (state, props) {
            let userDict = state.userInputDict;

            console.log("from component: " + value[0])

            if (value[1] === LessonInputLabels.location) {
                userDict.set(LessonInputLabels.location, {
                    value: value[0],
                    intent: "none",
                    isError: false
                })
            }

            return {
                userInputDict: userDict
            };
        });
    }

    /**
     * handles the change in a <MultiSelect>
     * @param value [0] is value, [1] is id
     */
    private handleMultiItemSelect(value: [string, string]) {
        this.setState(function (state, props) {
            let userDict = state.userInputDict;

            if (value[1] === LessonInputLabels.processes) {

                if (userDict.has(LessonInputLabels.processes)) {
                    let newList: string[] = userDict.get(LessonInputLabels.processes)!.value as string[];

                    //if value does not already exist, push new value
                    if (newList.indexOf(value[0]) == -1) {
                        newList.push(value[0]);
                    }


                    userDict.set(LessonInputLabels.processes, {
                        value: newList,
                        intent: "none",
                        isError: false
                    });
                }
                else {
                    userDict.set(LessonInputLabels.processes, {
                        value: [value[0]],
                        intent: "none",
                        isError: false
                    });
                }

                
            }

            return {
                userInputDict: userDict
            };
        });

        
    }

    /**
     * handles a tag being removed from an input
     * @param value: [0] is value, [1] is id
     */
    private handleTagRemove(value: [string, string]) {

        this.setState(function (state, props) {
            let userDict = state.userInputDict;

            if (value[1] === LessonInputLabels.processes) {

                if (userDict.has(LessonInputLabels.processes)) {
                    let newList: string[] = userDict.get(LessonInputLabels.processes)!.value as string[];
                    let removeIndex = newList.indexOf(value[0])
                    if (removeIndex != -1) {
                        newList.splice(removeIndex, 1);
                        console.log("testing: " + newList)
                    }

                    if (newList.length == 0) {

                    }

                    userDict.set(LessonInputLabels.processes, {
                        value: newList,
                        intent: "none",
                        isError: false
                    });

                }
            }

            return {
                userInputDict: userDict
            };
        });
        
    }



    render() {
        const { dialogOpen, userInputDict, errorDialogOpen, errorDialogMessage } = this.state;
        return (
            <React.Fragment>
                <Button icon="add" text="Create New Lesson Learned" onClick={() => { this.handleDialogOpenClose(true) } }></Button>
                <Dialog
                    canOutsideClickClose={false}
                    isOpen={dialogOpen}
                    lazy={true}
                    onClose={() => { this.handleDialogOpenClose(false); }}
                    title="Create a Lesson"
                    icon="form"
                >
                    <CreateLessonForm userInputDict={userInputDict} handleMultiItemSelect={this.handleMultiItemSelect} handleItemSelect={this.handleItemSelect} handleTagRemove={this.handleTagRemove} handleTextChange={this.handleTextInputChange} handleSwitchChange={this.handleSwitchChange2} />
                    <Button text="submit" onClick={() => this.handleSubmitLesson()} fill={false} />
                </Dialog>
                <Alert
                    isOpen={errorDialogOpen}
                    onClose={() => { this.handleErrorOpenClose(false); }}
                    onCancel={() => { this.handleErrorOpenClose(false); }}
                    onConfirm={() => { this.handleErrorOpenClose(false); }}
                    confirmButtonText="Ok"
                >
                    <ErrorText>{errorDialogMessage}</ErrorText>
                </Alert>
            </React.Fragment>
        );
    }
}

const ErrorText = styled('div')`
    white-space: pre;
    white-space: pre-line;
`

/**
 * validation check for if input is empty
 * todo: even if a class function, this isn't the most elegant and should probably be rethought
 * @param value         : the value of the input
 * @param id            : the input's id
 * @param errorMsg      : the input's error message
 * @param userDict      : dictionary of input information
 */
//banned from the class until I can properly figure out how 'this' works in javascript
let emptyCheck = function (value: string, id: string, errorMsg: string, userDict: Map<string, InputInfo>) {

    if((value.length == 0)) { //form is empty
        userDict.set(LessonInputLabels[id], {
            value: value,
            intent: "danger",
            errorMsg: errorMsg,
            isError: true,
        });

    }
    else { //no error
        userDict.set(LessonInputLabels[id], {
            value: value,
            intent: "success",
            isError: false
        });

    }

}
