import { Lesson } from '../store/lessons/types'

/**
 * I made this class to temporarily act as a makeshift database so that both the createLesson and lesson index pages could pull from the same data source
**/
export default class sagaData {

    data: Lesson[];
    size: number;

    constructor() {

        this.data = [
            {
            key: "LL-1",
            summary: "I didn't get the information I needed in time to produce a requested deliverable by the requsted due date.",
            experience: "While working on Project X, was asked to analyze a series of outcomes from process QQ, which required an input of this type of data (some type of data).  Even though I asked 15 times for that data from the person responsible for providing it, I didn't receive it in time. In talking to that person after the fact, it turns out I was refer to the data as \"QQ\" but in fact, that person didn't undersatnd it as \"QQ\" but rather thought I was talking about \"KK\" because of how I structure my request.  Turns out that I had never been told the difference between QQ and KK and thought they were the same.",
            created: 1548660112000,
            location: "San Jose",
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
            }
        ];
        this.size = 3;
    };

    getData() : Lesson[] {
        return this.data;
    }

    addData(lesson: Lesson) {
        this.data.push(lesson);
        this.size++;
    }

    getSize(): number {
        return this.size;
    }
}
