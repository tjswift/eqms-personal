import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { H1, Button } from "@blueprintjs/core"
import GridLayout from 'react-grid-layout'
import ReactTable from 'react-table'
import "react-table/react-table.css"

import Page from '../../components/layout/Page'
import Container from '../../components/layout/Container'
//import DataTable from '../../components/layout/DataTable'
import LoadingOverlay from '../../components/data/LoadingOverlay'
import LoadingOverlayInner from '../../components/data/LoadingOverlayInner'
import LoadingSpinner from '../../components/data/LoadingSpinner'

import { ApplicationState, ConnectedReduxProps } from '../../store'
import { Lesson } from '../../store/lessons/types'
import { fetchRequest } from '../../store/lessons/actions'
import { render } from 'enzyme';
import lessons from '../lessons';
import lessonsSaga from '../../store/lessons/sagas';
import tempSagaDatabase from "../../main"
import sagaData from '../../utils/sagadata'
import { Redirect } from 'react-router';

interface  tableProps {
  data: Lesson[],

}

interface tableState {
  data: Lesson[];
}



class lessonsTable extends React.Component<tableProps, tableState>{
  constructor(props: any){
    super(props);

    
    this.state = {
      data: this.props.data
    }
  }  
    
  render() {
      const data: Lesson[] = [{
        key: "LL-1",
        summary: "I didn't get the information I needed in time to produce a requested deliverable by the requsted due date.",
        experience: "While working on Project X, was asked to analyze a series of outcomes from process QQ, which required an input of this type of data (some type of data).  Even though I asked 15 times for that data from the person responsible for providing it, I didn't receive it in time. In talking to that person after the fact, it turns out I was refer to the data as \"QQ\" but in fact, that person didn't undersatnd it as \"QQ\" but rather thought I was talking about \"KK\" because of how I structure my request.  Turns out that I had never been told the difference between QQ and KK and thought they were the same.",
        created: 1548660112000,
        location: "Salem",
        creator: "Jane Doe",
        recurrence: "Weekly",
        mitigation: "Fixed Report",
        mitigationCost: "4 hours to redo report. I lost points because I was late.",
        affectedProcess: ["Environmental"],
        opportunityType: "Poorly defined process",
        impact: "This impacts schedule, communication, relationships, possibly cost through time.",
        impactPositive: false,
        inactionImpact: "Continued inefficient communication resulting in possibility of schedule slip and poor relationships. ",
        actDecision: "1. Assigned to XXX.  2.  Monitored by XXX.",
        impactedProcess: ["Project Management"],
        originatorSuggestion: "If I had proper training on the process of creating this report using the KK data, and that training clearly differntiated between QQ and KK, and I had a cheat sheet for preparing this analysis, it's possible I would not have confused the recipient of my request and I would have received the data I needed (KK) before it was too late. ",
        recommendation: "1.  Document proper communication methods/channels in procedure. 2.  Train all affected parties on new procedure. 3.  Monitor for correct communication methods.",
        actionsTaken: "1. Updated PQP XXX.  2.  Spent first ten minutes of weekly update meeting training/discussing new communication procedures.  3. Implemented monitoring.",
        differenceMade: true
      },
      {
        key: "LL-2",
        summary: "I got the information I needed in time to produce a requested deliverable before it was due.",
        experience: "While working on Project X, was asked to analyze a series of outcomes from process QQ, which required an input of this type of data (some type of data).  The person I asked it for was able to get me the information almost immediately. This made it clear that \"QQ\" and \"KK\" were not the same, alleviating my confusion.",
        created: 1548550112000,
        location: "San Francisco",
        creator: "John Doe",
        recurrence: "Monthly",
        mitigation: "None",
        mitigationCost: "-.",
        affectedProcess: ["Environmental"],
        opportunityType: "Cross-cultural improvement",
        impact: "This impacts schedule, communication, relationships, possibly cost through time.",
        impactPositive: true,
        inactionImpact: "If we don't apply this across all teams, we could see continued inefficient communication resulting in possibility of schedule slip and poor relationships. ",
        actDecision: "1. Assigned to XXX.  2.  Monitored by XXX.",
        impactedProcess: ["Project Management"],
        originatorSuggestion: "We should offer training on the process of creating this report using the KK data, and how to differntiate between QQ and KK. ",
        recommendation: "1.  Document proper communication methods/channels in procedure. 2.  Train all affected parties on new procedure. 3.  Monitor for correct communication methods.",
        actionsTaken: "1. Updated PQP XXX.  2.  Spent first ten minutes of weekly update meeting training/discussing new communication procedures.  3. Implemented monitoring.",
        differenceMade: true
      },
      {
        key: "LL-3",
        summary: "Accountability culture.",
        experience: "It is impossible to transfer overall accountability for large programmes of work outside of the lead agency/agencies. Recognising this and making it explicit will help programmes build an internal culture of taking accountability, with the appropriate structures and behaviors to enable that.",
        created: 1548660000000,
        location: "Modesto",
        creator: "Jane Doe",
        recurrence: "Daily",
        mitigation: "Training",
        mitigationCost: "About 1 day to prepare training, and another day to train all employees.",
        affectedProcess: ["All"],
        opportunityType: "Cultural improvement",
        impact: "Company as a whole.",
        impactPositive: true,
        inactionImpact: "Continued inefficient communication resulting in possibility of schedule slip and poor relationships. ",
        actDecision: "1. Assigned to XXX.  2.  Monitored by XXX.",
        impactedProcess: ["Project Management"],
        originatorSuggestion: "Promote a culture of accountability throughout the organization.",
        recommendation: "1.  Document proper cultural practices in procedure. 2.  Train all affected parties on new procedure. 3.  Monitor for correct communication methods.",
        actionsTaken: "1. Updated PQP XXX.  2.  Spent first ten minutes of weekly update meeting training/discussing new cultural practices.  3. Implemented monitoring.",
        differenceMade: true
      },
      {
        key: "LL-4",
        summary: "Accountability culture.",
        experience: "It is impossible to transfer overall accountability for large programmes of work outside of the lead agency/agencies. Recognising this and making it explicit will help programmes build an internal culture of taking accountability, with the appropriate structures and behaviors to enable that.",
        created: 1548660000000,
        location: "Modesto",
        creator: "Jane Doe",
        recurrence: "Daily",
        mitigation: "Training",
        mitigationCost: "About 1 day to prepare training, and another day to train all employees.",
        affectedProcess: ["All"],
        opportunityType: "Cultural improvement",
        impact: "Company as a whole.",
        impactPositive: true,
        inactionImpact: "Continued inefficient communication resulting in possibility of schedule slip and poor relationships. ",
        actDecision: "1. Assigned to XXX.  2.  Monitored by XXX.",
        impactedProcess: ["Project Management"],
        originatorSuggestion: "Promote a culture of accountability throughout the organization.",
        recommendation: "1.  Document proper cultural practices in procedure. 2.  Train all affected parties on new procedure. 3.  Monitor for correct communication methods.",
        actionsTaken: "1. Updated PQP XXX.  2.  Spent first ten minutes of weekly update meeting training/discussing new cultural practices.  3. Implemented monitoring.",
        differenceMade: true
      },
      {
        key: "LL-5",
        summary: "Accountability culture.",
        experience: "It is impossible to transfer overall accountability for large programmes of work outside of the lead agency/agencies. Recognising this and making it explicit will help programmes build an internal culture of taking accountability, with the appropriate structures and behaviors to enable that.",
        created: 1548660000000,
        location: "Portland",
        creator: "Jane Doe",
        recurrence: "Daily",
        mitigation: "Training",
        mitigationCost: "About 1 day to prepare training, and another day to train all employees.",
        affectedProcess: ["All"],
        opportunityType: "Cultural improvement",
        impact: "Company as a whole.",
        impactPositive: true,
        inactionImpact: "Continued inefficient communication resulting in possibility of schedule slip and poor relationships. ",
        actDecision: "1. Assigned to XXX.  2.  Monitored by XXX.",
        impactedProcess: ["Project Management"],
        originatorSuggestion: "Promote a culture of accountability throughout the organization.",
        recommendation: "1.  Document proper cultural practices in procedure. 2.  Train all affected parties on new procedure. 3.  Monitor for correct communication methods.",
        actionsTaken: "1. Updated PQP XXX.  2.  Spent first ten minutes of weekly update meeting training/discussing new cultural practices.  3. Implemented monitoring.",
        differenceMade: true
      }     
    ];

      const columns = [{
        Header: "Key",
        accessor: "key"
      },
      {
        Header: "Summary",
        accessor: "summary",
        sortable: false,
        filterable: false
      },
      {
        Header: "Created",
        accessor: "created"
      },
      {
        Header: "Location",
        accessor: "location"
      },
      {
        Header: "Affected Process",
        accessor: "affectedProcess"
      },
      {
        Header: "Mitigation",
        accessor: "mitigation"
      },
      {
        Header: '',
        Cell: (lesson: any) => (
          <div>
            <button onClick={() => {window.location.href = '/lessons/${lesson.key}';}}>
              View Record
            </button>
          </div>          
        )
      }                
    ] 

    console.log(columns);
      return(
        <ReactTable data={data} columns={columns}></ReactTable>        
      );
    }
  
}

// // Separate state props + dispatch props to their own interfaces.
// interface PropsFromState {
//   loading: boolean
//   data: Lesson[]
//   errors: string | undefined
// }

// // We can use `typeof` here to map our dispatch types to the props, like so.
// interface PropsFromDispatch {
//   fetchRequest: typeof fetchRequest
// }

// // Combine both state + dispatch props - as well as any props we want to pass - in a union type.
// type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps

// // const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'https://my.api.com'

// class LessonsIndexPage extends React.Component<AllProps> {
//   public componentDidMount() {
//     this.props.fetchRequest()
//   }

//   public render() {
//     const { loading } = this.props

//     return (
//       <Page>
//         <Container>
//           <GridLayout className="layout" cols={2} rowHeight={50} width={1125}>
//             <div key="heading" data-grid={{x: 0, y: 0, w: 1, h: 1, static: true}}>
//               <H1>Lessons Learned</H1>
//             </div>
//             <div key="create" data-grid={{x: 1, y: 0, w: 1, h: 1, static: true}} style={{textAlign:"right", verticalAlign:"bottom"}}>
//               <Button icon="add" text="Create New Lesson Learned"/>
//             </div>
//           </GridLayout>
//           <div key="data">
//             {loading && (
//               <LoadingOverlay>
//                 <LoadingOverlayInner>
//                   <LoadingSpinner />
//                 </LoadingOverlayInner>
//               </LoadingOverlay>
//             )}
//             {this.renderData()}
//           </div>
//         </Container>
//       </Page>
//     )
//   }

//   private renderData() {
//     const { loading, data } = this.props

//     return (
//       <DataTable columns={['Key', 'Summary', 'Created', 'Location', 'Affected Process', 'Mitigation']} widths={['10%', '30%', 'auto', 'auto', 'auto', 'auto']}>
//         {loading &&
//           data.length === 0 && (
//             <tr>
//               <td colSpan={3}>Loading...</td>
//             </tr>
//           )}
//         {data.map(lesson => {
//           return (<tr className="bp3-card bp3-interactive bp3-elevation-2" onClick={() => { window.location.href = `/lessons/${lesson.key}`; } } key={lesson.key}>
//             <td>{lesson.key}</td>
//             <td>{lesson.summary}</td>
//             <td>{new Date(lesson.created).toLocaleString()}</td>
//             <td>{lesson.location}</td>
//             <td>{lesson.affectedProcess}</td>
//             <td>{lesson.mitigation}</td>
//           </tr>);
//         })}
//       </DataTable>
//     )
//   }
// }

// // It's usually good practice to only include one context at a time in a connected component.
// // Although if necessary, you can always include multiple contexts. Just make sure to
// // separate them from each other to prevent prop conflicts.
// const mapStateToProps = ({ lessons }: ApplicationState) => ({
//   loading: lessons.loading,
//   errors: lessons.errors,
//   data: lessons.data
// })

// // mapDispatchToProps is especially useful for constraining our actions to the connected component.
// // You can access these via `this.props`.
// const mapDispatchToProps = (dispatch: Dispatch) => ({
//   fetchRequest: () => dispatch(fetchRequest())
// })

// // Now let's connect our component!
// // With redux v4's improved typings, we can finally omit generics here.
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(LessonsIndexPage)
export default lessonsTable;