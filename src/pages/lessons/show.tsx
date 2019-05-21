import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { RouteComponentProps } from 'react-router'
import { H1, H2, H4, H6, EditableText } from '@blueprintjs/core'
import { DateInput } from "@blueprintjs/datetime";
import GridLayout from 'react-grid-layout';

import Page from '../../components/layout/Page'
import Container from '../../components/layout/Container'

import { ApplicationState, ConnectedReduxProps } from '../../store'
import { Lesson } from '../../store/lessons/types'
import { fetchRequest } from '../../store/lessons/actions'
import LoadingOverlay from '../../components/data/LoadingOverlay'
import LoadingOverlayInner from '../../components/data/LoadingOverlayInner'
import LoadingSpinner from '../../components/data/LoadingSpinner'

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  loading: boolean
  data: Lesson[]
  errors: string | undefined
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  fetchRequest: typeof fetchRequest
}

interface RouteParams {
  key: string
}

interface State {
  selected?: Lesson
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState &
  PropsFromDispatch &
  RouteComponentProps<RouteParams> &
  ConnectedReduxProps

// const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'https://my.api.com'

class ShowLessonPage extends React.Component<AllProps, State> {
  constructor(props: AllProps) {
    super(props)

    this.state = {
      selected: undefined
    }
  }

  public componentDidMount() {
    const { data } = this.props

    if (!data || data.length === 0) {
      this.props.fetchRequest()
    }
  }

  public render() {
    const { data, loading, match } = this.props
    const selected = data.find(lesson => lesson.key === match.params.key)

    return (
      <Page>
        <Container>
          <div>
            {loading && (
              <LoadingOverlay>
                <LoadingOverlayInner>
                  <LoadingSpinner />
                </LoadingOverlayInner>
              </LoadingOverlay>
            )}
            {selected && (
              <GridLayout className="layout" cols={5} rowHeight={30} width={1200}>
                <div key="key" data-grid={{x: 0, y: 0, w: 1, h: 1, static: true}}>
                  <H1>{selected.key}</H1>
                </div>
                <div key="created" data-grid={{x: 1, y: 0, w: 1, h: 1, static: true}}>
                  <H4>Created:</H4>
                  <DateInput
                    formatDate={date => date.toLocaleString()}
                    parseDate={str => new Date(str)}
                    placeholder={"M/D/YYYY"}
                    value={new Date(selected.created)}
                    disabled={true}
                  />
                </div>
                <div key="location" data-grid={{x: 2, y: 0, w: 1, h: 1, static: true}}>
                  <H4>Site/Location:</H4>
                  <H6>{selected.location}</H6>
                </div>
                <div key="creator" data-grid={{x: 3, y: 0, w: 1, h: 1, static: true}}>
                  <H4>Creator:</H4>
                  <H6>{selected.creator}</H6>
                </div>
                <div key="recurrence" data-grid={{x: 4, y: 0, w: 1, h: 1, static: true}}>
                  <H4>Recurrence:</H4>
                  <H6>{selected.recurrence}</H6>
                </div>
                <div key="summary" data-grid={{x: 0, y: 2, w: 5, h: 1, static: true}}>
                  <H4>Summary:</H4>
                  <EditableText defaultValue={selected.summary} />
                </div>
                <div key="experience" data-grid={{x: 0, y: 4, w: 5, h: 1, static: true}}>
                  <H4>Experience:</H4>
                  <EditableText multiline={true} minLines={3} maxLines={12} defaultValue={selected.experience} />
                </div>
                <div key="impactHeader" data-grid={{x: 0, y: 7, w: 5, h: 1, static: true}}>
                  <H2>Impact</H2>
                </div>
                <div key="mitigation" data-grid={{x: 0, y: 9, w: 5, h: 1, static: true}}>
                  <H4>Mitigation:</H4>
                  <H6>{selected.mitigation}</H6>
                </div>
                <div key="mitigationCost" data-grid={{x: 0, y: 11, w: 5, h: 1, static: true}}>
                  <H4>Cost of Mitigation:</H4>
                  <H6>{selected.mitigationCost}</H6>
                </div>
                <div key="affectedProecss" data-grid={{x: 0, y: 13, w: 2.5, h: 1, static: true}}>
                  <H4>Affected Process:</H4>
                  <H6>{selected.affectedProcess}</H6>
                </div>
                <div key="opportunityType" data-grid={{x: 2.5, y: 13, w: 2.5, h: 1, static: true}}>
                  <H4>Potential Opportunity Type:</H4>
                  <H6>{selected.opportunityType}</H6>
                </div>
                <div key="impact" data-grid={{x: 0, y: 15, w: 2.5, h: 1, static: true}}>
                  <H4>Impact: [{selected.impactPositive ? "Positive" : "Negative"}]</H4>
                  <H6>{selected.impact}</H6>
                </div>
                <div key="inactionImpact" data-grid={{x: 2.5, y: 15, w: 2.5, h: 1, static: true}}>
                  <H4>Impact of Inaction:</H4>
                  <H6>{selected.inactionImpact}</H6>
                </div>
                <div key="actDecision" data-grid={{x: 0, y: 17, w: 5, h: 1, static: true}}>
                  <H4>Decision to Act:</H4>
                  <H6>{selected.actDecision}</H6>
                </div>
                <div key="resolutionHeader" data-grid={{x: 0, y: 19, w: 5, h: 1, static: true}}>
                  <H2>Resolution</H2>
                </div>
                <div key="impactedProcess" data-grid={{x: 0, y: 21, w: 5, h: 1, static: true}}>
                  <H4>Process Impacted:</H4>
                  <H6>{selected.impactedProcess}</H6>
                </div>
                <div key="originatorSuggestion" data-grid={{x: 0, y: 23, w: 5, h: 1, static: true}}>
                  <H4>Originator's Suggestion:</H4>
                  <H6>{selected.originatorSuggestion}</H6>
                </div>
                <div key="recommendation" data-grid={{x: 0, y: 26, w: 2.5, h: 1, static: true}}>
                  <H4>Recommendation:</H4>
                  <H6>{selected.recommendation}</H6>
                </div>
                <div key="actionsTaken" data-grid={{x: 2.5, y: 26, w: 2.5, h: 1, static: true}}>
                  <H4>Action(s) Taken:</H4>
                  <H6>{selected.actionsTaken}</H6>
                </div>
                <div key="differenceMade" data-grid={{x: 0, y: 28, w: 5, h: 1, static: true}}>
                  <H4>Did it make a difference?</H4>
                  <H6>{selected.differenceMade ? "Yes" : "No"}</H6>
                </div>
              </GridLayout>
            )}
          </div>
        </Container>
      </Page>
    )
  }
}

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ lessons }: ApplicationState) => ({
  loading: lessons.loading,
  errors: lessons.errors,
  data: lessons.data
})

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchRequest: () => dispatch(fetchRequest())
})

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowLessonPage)
