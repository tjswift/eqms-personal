import {Intent} from '@blueprintjs/core'
// This file holds our state type, as well as any other types related to this Redux store.

// Response object for GET /lessons
//see "Lessons Learned Metadata"
export interface Lesson extends ApiResponse {
    key: string
    summary: string
    experience: string
    created: number // Milliseconds since epoch
    location: string
    creator: string
    recurrence: string
    mitigation: string
    mitigationCost: string
    affectedProcess: string[]
    opportunityType: string
    impact: string
    impactPositive: boolean
    inactionImpact: string
    actDecision: string
    impactedProcess: string[]
    originatorSuggestion: string
    recommendation: string
    actionsTaken: string
    differenceMade: boolean
}

/**
 * used to easily, consistantly reference input id's in either as components or in the form dictionary.
**/
export const LessonInputLabels = {
    title: "lesson-title",
    experience: "lesson-description",
    impact: "impact-description",
    impactType: "impact-type",
    location: "situation-location",
    processes: "impacted-processes",
    suggestion: "solution-suggestion"
}

/**
 * Lists of process and location options for Location and Processes Effected forms
**/
export const processList: string[] = ["Process one", "Process two", "Process three", "none"];
export const locationList: string[] = ["Location one", "Location two", "Location three"];

/**
 * interface to store information about each form in the create lesson dialog
 * TODO: consider making errorMsg an array to better hold more than 1 error message
 **/
export interface InputInfo {
    value: string | boolean | string[]
    intent?: Intent
    errorMsg?: string
    isError: boolean
}


  // This type is basically shorthand for `{ [key: string]: any }`. Feel free to replace `any` with
  // the expected return type of your API response.
  export type ApiResponse = Record<string, any>
  
  // Define however naming conventions you'd like for your action types, but
  // personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
  // of Redux's `@@INIT` action.
  export enum LessonsActionTypes {
    FETCH_REQUEST = '@@lessons/FETCH_REQUEST',
    FETCH_SUCCESS = '@@lessons/FETCH_SUCCESS',
    FETCH_ERROR = '@@lessons/FETCH_ERROR',
    SELECT_HERO = '@@lessons/SELECT_HERO',
    SELECTED = '@@lessons/SELECTED',
    POST_LESSON = '@@lessons/POST_LESSON'
  }
  
  // Declare state types with `readonly` modifier to get compile time immutability.
  // https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
  export interface LessonsState {
    readonly loading: boolean
    readonly data: Lesson[]
    readonly errors?: string
  }